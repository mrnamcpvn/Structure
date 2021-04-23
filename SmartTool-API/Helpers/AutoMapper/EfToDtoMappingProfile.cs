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
            CreateMap<Users, UserDTO>();
            CreateMap<Measurement_RFT, Measurement_RFTDTO>();
            CreateMap<Stage, StageDTO>();
            CreateMap<Defect_Reason, DefectReasonDTO> ();
            CreateMap<Model_Operation, ModelOperationDTO>();
            CreateMap<Kaizen,KaizenDTO>();
            CreateMap<Efficiency, ModelEfficiencyDTO>();
            CreateMap<VW_ModelKaizen,VW_ModelKaizen_Dto>();
        }
    }
}