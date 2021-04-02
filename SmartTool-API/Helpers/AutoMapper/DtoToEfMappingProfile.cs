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
            CreateMap<ModelOperationDTO, Model_Operation>();
            CreateMap<KaizenDTO,Kaizen>();
            CreateMap<Kaizen_Benefits_Application_FormDTO, Kaizen_Benefits_Application_Form>();
            CreateMap<ModelEfficiencyDTO,Efficiency>();
            CreateMap<UserDTO, Users>();
            CreateMap<RoleUserDTO, RoleUser>();
            CreateMap<StageDTO, Stage> ();
            CreateMap<VW_ModelKaizen_Dto, VW_ModelKaizen>();
            CreateMap<VW_RFT_AVGDTO, VW_RFT_AVG> ();
            CreateMap<VW_RFTReportDetailDTO, VW_RFTReportDetail> ();
            CreateMap<Measurement_RFTDTO, Measurement_RFT> ();
            CreateMap<DefectReasonDTO, Defect_Reason> ();
        }
    }
}