using AutoMapper;

using SmartTool_API.Models;
using SmartTool_API.DTO;

namespace SmartTool_API.Helpers.AutoMapper
{
  public class DtoToEfMappingProfile : Profile
  {
    public DtoToEfMappingProfile()
    {
      CreateMap<ModelDTO, Model>();
            CreateMap<UserDTO, Users>();
            CreateMap<RoleUserDTO, RoleUser>();
            CreateMap<StageDTO, Stage> ();
            CreateMap<ModelOperationDTO, Model_Operation>();
            CreateMap<Measurement_RFTDTO, Measurement_RFT> ();
            CreateMap<DefectReasonDTO, Defect_Reason> ();
            CreateMap<KaizenDTO,Kaizen>();
            CreateMap<ModelEfficiencyDTO,Efficiency>();
            CreateMap<Kaizen_Benefits_Application_FormDTO, Kaizen_Benefits_Application_Form>();
        }
  }
}