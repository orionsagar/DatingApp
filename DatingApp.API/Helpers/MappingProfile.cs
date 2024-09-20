using System.Linq;
using AutoMapper;
using DatingApp.API.DTOs;
using DatingApp.API.Models;

namespace DatingApp.API.Helpers
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            // Add as many of these lines as you need to map your objects
            CreateMap<User, UserForListDTO>()
            .ForMember(dest => dest.PhotoUrl, opt =>
            {
                opt.MapFrom(src => src.Photos.FirstOrDefault(p => p.IsMain).Url);
            })
            .ForMember(dest => dest.Age, opt =>
            {
                opt.MapFrom(d => d.DateOfBirth.CalculateAge());
            });


            CreateMap<User, UserForDetailsDTO>()
            .ForMember(dest => dest.PhotoUrl, opt =>
           {
               opt.MapFrom(src => src.Photos.FirstOrDefault(p => p.IsMain).Url);
           })
            .ForMember(dest => dest.Age, opt =>
            {
                opt.MapFrom(d => d.DateOfBirth.CalculateAge());
            });


            CreateMap<Photo, PhotosForDTO>();
            CreateMap<UserForUpdateDTO, User>();
            CreateMap<PhotoForCreationDto, Photo>();
            CreateMap<Photo, PhotoForReturnDto>();
            CreateMap<UserForRegisterDto, User>();
            CreateMap<MessageForCreationDTO, Message>().ReverseMap();
            CreateMap<Message, MessageToReturnDTO>()
                    .ForMember(m => m.SenderPhotoUrl, opt =>
                    opt.MapFrom(u => u.Sender.Photos.FirstOrDefault(p => p.IsMain).Url))
                    .ForMember(m => m.RecipientPhotoUrl, opt =>
                    opt.MapFrom(u => u.Recipient.Photos.FirstOrDefault(p => p.IsMain).Url));
        }
    }
}