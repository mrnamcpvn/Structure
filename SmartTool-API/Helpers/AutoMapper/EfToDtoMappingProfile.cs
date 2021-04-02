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
            CreateMap<Kaizen,KaizenDTO>();
            CreateMap<Kaizen_Benefits_Application_Form, Kaizen_Benefits_Application_FormDTO>();
            CreateMap<Efficiency, ModelEfficiencyDTO>();
            CreateMap<Users, UserDTO>();
            CreateMap<RoleUser, RoleUserDTO>();
            CreateMap<Stage, StageDTO>();
            CreateMap<VW_ModelKaizen, VW_ModelKaizen_Dto>();
            CreateMap<VW_RFT_AVG, VW_RFT_AVGDTO>();
            CreateMap<VW_RFTReportDetail, VW_RFTReportDetailDTO>();
            CreateMap<Measurement_RFT, Measurement_RFTDTO> ();
            CreateMap<Defect_Reason, DefectReasonDTO> ();
        }
    }
}