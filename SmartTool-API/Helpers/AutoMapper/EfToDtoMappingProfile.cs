using AutoMapper;
using SmartTool_API.Models;
using SmartTool_API.DTO;

namespace SmartTool_API.Helpers.AutoMapper
{
  public class EfToDtoMappingProfile : Profile
  {
    public EfToDtoMappingProfile()
    {
      CreateMap<Model, ModelDTO>();
            CreateMap<Users, UserDTO>();
            CreateMap<Measurement_RFT, Measurement_RFTDTO>();
            CreateMap<Stage, StageDTO>();
            CreateMap<Defect_Reason, DefectReasonDTO> ();
            CreateMap<Model_Operation, ModelOperationDTO>();
            CreateMap<Kaizen,KaizenDTO>();
            CreateMap<Efficiency, ModelEfficiencyDTO>();
             CreateMap<Kaizen_Benefits_Application_Form, Kaizen_Benefits_Application_FormDTO>();
    }
  }
}