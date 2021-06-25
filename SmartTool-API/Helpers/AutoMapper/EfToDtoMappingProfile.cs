using AutoMapper;
using SmartTool_API.DTOs;
using SmartTool_API.Models;

namespace SmartTool_API.Helpers.AutoMapper
{
    public class EfToDtoMappingProfile : Profile
    {
        public EfToDtoMappingProfile(){
            CreateMap<Users, UsersDTO>();
            CreateMap<Model, ModelDTO>();
            CreateMap<Defect_Reason, Defect_ReasonDTO> ();
            CreateMap<RoleUser, RoleUserDTO>();
            CreateMap<Measurement_RFT, Measurement_RFTDTO>();
            CreateMap<Stage, StageDTO>();
            CreateMap<Defect_Reason, Defect_ReasonDTO> ();
            CreateMap<Model_Operation, Model_OperationDTO>();
            CreateMap<Kaizen,KaizenDTO>();
            CreateMap<Efficiency, EfficiencyDTO>();
            CreateMap<VW_ModelKaizen, VW_ModelKaizen_Dto>();
            CreateMap<VW_RFT_AVG, VW_RFT_AVGDTO>();
            CreateMap<VW_RFTReportDetail, VW_RFTReportDetailDTO>();
            CreateMap<Kaizen_Benefits_Application_Form, Kaizen_Benefits_Application_FormDTO>();
        }
    }
}