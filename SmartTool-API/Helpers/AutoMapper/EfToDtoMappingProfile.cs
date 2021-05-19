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
      CreateMap<VW_ModelKaizen, VW_ModelKaizen_Dto>();
      CreateMap<Users, UserDTO>();
      CreateMap<Measurement_RFT, Measurement_RFTDTO>();
      CreateMap<Stage, StageDTO>();
      CreateMap<DefectReason, DefectReasonDTO>();
      CreateMap<ModelOperation, ModelOperationDTO>();
      CreateMap<Kaizen, KaizenDTO>();
      CreateMap<Efficiency, ModelEfficiencyDTO>();
      CreateMap<VW_RFTReportDetail, VW_RFTReportDetailDTO>();
      CreateMap<VW_RFT_AVG, VW_RFT_AVGDTO>();
      CreateMap<KaizenBenefitsApplicationForm, KaizenBenefitsApplicationFormDTO>();
    }
  }
}