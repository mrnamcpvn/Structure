using AutoMapper;
using SmartTool_API.DTOs;
using SmartTool_API.Models;

namespace SmartTool_API.Helpers.AutoMapper
{
    public class DtoToEfMappingProfile : Profile
    {
        public DtoToEfMappingProfile(){
            CreateMap<UsersDTO, Users>();
            CreateMap<ModelDTO, Model>();
        }
    }
}