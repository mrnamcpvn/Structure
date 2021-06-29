using System.Threading.Tasks;
using SmartTool_API.DTOs;
using SmartTool_API.Helpers;

namespace SmartTool_API._Services.Interfaces
{
    public interface IDefectReasonService : IMainService<Defect_ReasonDTO> 
    {
         Task<bool> CheckDefectReasonExists(string defectreasonID);

         Task<PagedList<Defect_ReasonDTO>> SearchDefectReason(PaginationParams paginationParams, DefectReasonParam defectReasonParam);
         Task<OperationResult> ImportExcel(string pathFile, string user);
    }
}