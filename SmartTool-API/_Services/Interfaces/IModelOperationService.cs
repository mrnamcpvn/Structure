using System.Threading.Tasks;
using SmartTool_API.DTO;
using SmartTool_API.Helpers;

namespace SmartTool_API._Services.Interfaces
{
    public interface IModelOperationService
    {
        Task<PagedList<ModelOperationDTO>> SearchModelOperation(PaginationParam param, ModelOperationParam modelParam);
        Task<OperationResult> Add(ModelOperationDTO model);
        Task<OperationResult> Update(ModelOperationDTO model);
        Task<OperationResult> Delete(ModelOperationDTO operation);
        Task<ModelOperationDTO> GetModelOperation(ModelOperationEditParam modelOperationEditParam);
        Task<object> GetAllProcessType();
        Task<bool> CheckExistKaizenAndRTF(ModelOperationDTO operation);
    }
}