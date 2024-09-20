using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using DatingApp.API.DTOs;
using DatingApp.API.Interface;
using DatingApp.API.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;

namespace DatingApp.API.Controllers
{
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly IAuthRepository _authRepository;
        private readonly IConfiguration _configuration;
        private readonly IMapper _mapper;
        public AuthController(IAuthRepository authRepository,
            IConfiguration configuration, IMapper mapper)
        {
            _mapper = mapper;
            _configuration = configuration;
            _authRepository = authRepository;
        }


        [HttpPost("register")]
        public async Task<ActionResult> Register([FromBody] UserForRegisterDto userForRegisterDto)
        {
            userForRegisterDto.Username = userForRegisterDto.Username.ToLower();

            if (await _authRepository.UserExist(userForRegisterDto.Username))
                ModelState.AddModelError("Username", "Username is already taken");


            // validate request
            if (!ModelState.IsValid)
                return BadRequest(ModelState);


            var UserToCreate = _mapper.Map<User>(userForRegisterDto);

            var createuser = await _authRepository.Register(UserToCreate, userForRegisterDto.Password);

            var userToReturn = _mapper.Map<UserForDetailsDTO>(createuser);
            return CreatedAtRoute("GetUser", new { Controller = "Users", id = createuser.Id }, userToReturn);
        }


        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] UserForLoginDto userForLoginDto)
        {

            var userFromRepo = await _authRepository.Login(userForLoginDto.Username, userForLoginDto.Password);

            if (userFromRepo == null)
                return Unauthorized();

            // generate token

            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_configuration["Jwt:SecretKey"]);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                    new Claim(ClaimTypes.NameIdentifier, userFromRepo.Id.ToString()),
                    new Claim(ClaimTypes.Name, userForLoginDto.Username)
                }),
                Expires = DateTime.Now.AddDays(1),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha512Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            var tokenString = tokenHandler.WriteToken(token);

            var user = _mapper.Map<UserForListDTO>(userFromRepo);

            return Ok(new { tokenString, user });
        }
    }
}