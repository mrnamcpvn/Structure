using System.Threading.Tasks;
using SmartTool_API.DTO;
using SmartTool_API.Helpers;

namespace SmartTool_API._Services.Interfaces
{
    public interface IModelOperationService
    {
        Task<PagedList<ModelOperationDTO>> SearchModelOperation(PaginationParam param, ModelOperationParam modelParam);
        Task<bool> Add(ModelOperationDTO model);
        Task<bool> Update(ModelOperationDTO model);
        Task<bool> Delete(ModelOperationDTO operation);
        Task<ModelOperationDTO> GetModelOperation(ModelOperationEditParam modelOperationEditParam);
        Task<object> GetAllProcessType();
        Task<bool> CheckExistKaizenAndRTF(ModelOperationDTO operation);
    }
}