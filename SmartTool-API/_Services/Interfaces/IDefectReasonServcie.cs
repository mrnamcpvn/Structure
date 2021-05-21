using System.Threading.Tasks;
using SmartTool_API.DTO;
using SmartTool_API.Helpers;
using SmartTooling_API.Helpers;

namespace SmartTool_API._Services.Interfaces
{
    public interface IDefectReasonService : IMainService<DefectReasonDTO>
    {
        Task<bool> CheckDefectReasonExists(string defectreasonID);
        
        Task<PagedList<DefectReasonDTO>> SearchDefectReason(PaginationParams paginationParams, DefectReasonParam defectReasonParam);
    }
}