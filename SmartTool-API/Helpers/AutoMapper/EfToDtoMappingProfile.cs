using AutoMapper;
using SmartTool_API.DTO;
using SmartTool_API.Models;

namespace SmartTool_API.Helpers.AutoMapper
{
    public class EfToDtoMappingProfile : Profile
    {
        public EfToDtoMappingProfile()
        {
            CreateMap<Model, ModelDTO>();
            CreateMap<Model_Operation, ModelOperationDTO>();
        }
    }
}