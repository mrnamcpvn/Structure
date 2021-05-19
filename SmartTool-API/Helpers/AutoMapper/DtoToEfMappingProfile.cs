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
      CreateMap<UserDTO, Users>();
      CreateMap<RoleUserDTO, RoleUser>();
      CreateMap<StageDTO, Stage>();
      CreateMap<ModelOperationDTO, ModelOperation>();
      CreateMap<Measurement_RFTDTO, Measurement_RFT>();
      CreateMap<DefectReasonDTO, DefectReason>();
      CreateMap<KaizenDTO, Kaizen>();
      CreateMap<ModelEfficiencyDTO, Efficiency>();
      CreateMap<VW_RFTReportDetailDTO, VW_RFTReportDetail>();
      CreateMap<VW_RFT_AVGDTO, VW_RFT_AVG>();
      CreateMap<KaizenBenefitsApplicationFormDTO, KaizenBenefitsApplicationForm>();
    }
  }
}