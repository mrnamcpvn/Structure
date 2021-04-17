using System.Threading.Tasks;
using SmartTooling_API.DTO;
using SmartTooling_API.Helpers;

namespace SmartTooling_API._Services.Interfaces
{
    public interface IDefectReasonService : IMainService<DefectReasonDTO>
    {
        Task<bool> CheckDefectReasonExists(string defectreasonID);
        
        Task<PagedList<DefectReasonDTO>> SearchDefectReason(PaginationParams paginationParams, DefectReasonParam defectReasonParam);
    }
}