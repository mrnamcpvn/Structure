using System.Collections.Generic;
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
            CreateMap<StageDTO, Stage> ();
            CreateMap<ModelOperationDTO, Model_Operation>();
            CreateMap<Measurement_RFTDTO, Measurement_RFT> ();
            CreateMap<DefectReasonDTO, Defect_Reason> ();
            CreateMap<KaizenDTO,Kaizen>();
            CreateMap<ModelEfficiencyDTO,Efficiency>();
            CreateMap<VW_RFTReportDetailDTO, VW_RFTReportDetail>();
            CreateMap<VW_RFT_AVGDTO, VW_RFT_AVG>();
            CreateMap<Kaizen_Benefits_Application_FormDTO, Kaizen_Benefits_Application_Form>();
        }
    }
}