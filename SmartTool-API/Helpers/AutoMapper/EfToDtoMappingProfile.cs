using AutoMapper;
using SmartTool_API.DTOs;
using SmartTool_API.Models;

namespace SmartTool_API.Helpers.AutoMapper
{
    public class EfToDtoMappingProfile : Profile
    {
        public EfToDtoMappingProfile(){
            CreateMap<Users, UsersDTO>();
            CreateMap<Modell, ModelDTO>();
            CreateMap<Defect_Reason, Defect_ReasonDTO> ();
            CreateMap<RoleUser, RoleUserDTO>();
        }
    }
}