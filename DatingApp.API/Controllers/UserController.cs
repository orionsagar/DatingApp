using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using DatingApp.API.Data;
using DatingApp.API.DTOs;
using DatingApp.API.Helpers;
using DatingApp.API.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace DatingApp.API.Controllers
{
    [ServiceFilter(typeof(UserLogActivity))]
    [Authorize]
    [Route("api/[controller]")]
    public class UserController : Controller
    {
        // Create a field to store the mapper object
        private readonly IMapper _mapper;
        private readonly IDatingRepository _repo;
        public UserController(IDatingRepository repository, IMapper mapper)
        {
            _repo = repository;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<IActionResult> GetUsers(UserParams userParams)
        {

            var currentUserID = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);

            var userFromDto = await _repo.GetUser(currentUserID);

            userParams.UserId = currentUserID;

            if (string.IsNullOrEmpty(userParams.Gender))
            {
                userParams.Gender = userFromDto.Gender == "male" ? "female" : "male";
            }

            var users = await _repo.GetUsers(userParams);
            var model = _mapper.Map<IEnumerable<UserForListDTO>>(users);
            Response.AddPagination(users.CurrentPage, users.PageSize, users.TotalPages, users.TotalCount);
            return Ok(model);
        }

        [HttpGet("{id}", Name = "GetUser")]
        public async Task<IActionResult> GetUser(int id)
        {
            var user = await _repo.GetUser(id);
            var model = _mapper.Map<UserForDetailsDTO>(user);
            return Ok(model);
        }


        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateUser(int id, [FromBody] UserForUpdateDTO userForUpdateDTO)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var currentUserID = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);

            var userFromDto = await _repo.GetUser(id);

            if (userFromDto == null)
                return NotFound($"Could not found user with an ID of {id}");

            if (currentUserID != userFromDto.Id)
                return Unauthorized();

            _mapper.Map(userForUpdateDTO, userFromDto);

            if (await _repo.SaveAll())
                return NoContent();

            throw new System.Exception($"Updating user {id} failed on save");
        }

        [HttpPost("{id}/like/{recipientId}")]
        public async Task<IActionResult> LikeUser(int id, int recipientId)
        {
            if (id != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();

            var like = await _repo.GetLike(id, recipientId);

            if (like != null)
                return BadRequest("You already like this user");

            if (await _repo.GetUser(recipientId) == null)
                return NotFound();

            like = new Like
            {
                LikerId = id,
                LikeeId = recipientId
            };

            _repo.Add<Like>(like);

            if(await _repo.SaveAll())
                return Ok(new {});

            return BadRequest("Failed to add user");
        }
    }
}