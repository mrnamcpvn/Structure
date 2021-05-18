using AutoMapper;
using SmartTool_API.DTO;
using SmartTool_API.Models;

namespace SmartTool_API.Helpers.AutoMapper
{
  public class DtoToEfMappingProfile : Profile
  {
    public DtoToEfMappingProfile()
    {
        CreateMap<ModelDTO, Model>();
        CreateMap<ModelOperationDTO, ModelOperation>();
    }
  }
}