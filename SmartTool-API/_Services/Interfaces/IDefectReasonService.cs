using System.Threading.Tasks;
using SmartTool_API.DTO;
using SmartTool_API.Helpers;

namespace SmartTool_API._Services.Interfaces
{
    public interface IDefectReasonService : IMainService<DefectReasonDTO>
    {
        Task<bool> CheckDefectReasonExists(string defectReasonID);
        Task<PagedList<DefectReasonDTO>> SearchDefectReason (PaginationParam paginationParam, DefectReasonParam defectReasonParam);
    }
}