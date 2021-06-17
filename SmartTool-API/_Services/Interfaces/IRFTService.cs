using System.Threading.Tasks;
using SmartTool_API.DTOs;
using SmartTool_API.Helpers;

namespace SmartTool_API._Services.Interfaces
{
    public interface IRFTService
    {
         Task<bool> Add(Measurement_RFTDTO model);
         Task<bool> Updata(Measurement_RFTDTO model);
         Task<PagedList<Measurement_RFTDTO>> Search(PaginationParams paginationParams, string modelNo, string stageId);
         Task<object> GetAllModel();
         Task<object> GetAllStage();
         Task<object> GetAllProcessType(string modelNo, string StageId);
         Task<object> GetProcessNOperation(string modelNO, string stageId, string operation);
         Task<object> GetAllDefectReason();
         Task<object>  GetOperationNam(string modelNo, string stage, string processType);
    }
}