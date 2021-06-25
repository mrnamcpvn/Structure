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
            CreateMap<Defect_ReasonDTO, Defect_Reason> ();
            CreateMap<RoleUserDTO, RoleUser>();
            CreateMap<StageDTO, Stage> ();
            CreateMap<Model_OperationDTO, Model_Operation>();
            CreateMap<Measurement_RFTDTO, Measurement_RFT> ();
            CreateMap<Defect_ReasonDTO, Defect_Reason> ();
            CreateMap<KaizenDTO,Kaizen>();
            CreateMap<EfficiencyDTO,Efficiency>();
            CreateMap<VW_RFTReportDetailDTO,VW_RFTReportDetail>();
            CreateMap<VW_RFT_AVGDTO,VW_RFT_AVG>();
            CreateMap<Kaizen_Benefits_Application_FormDTO, Kaizen_Benefits_Application_Form>();
        }
    }
}