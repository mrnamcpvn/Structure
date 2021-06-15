using System.Threading.Tasks;
using SmartTool_API.DTOs;
using SmartTool_API.Helpers;
using SmartTooling_API.Helpers;

namespace SmartTool_API._Services.Interfaces
{
    public interface IModelOperationService
    {
         Task<PagedList<Model_OperationDTO>> searchModelOperation(PaginationParams paginationParams, ModelOperationParam modelParam);
         Task<bool> Add (Model_OperationDTO model);
         Task<bool> Update(Model_OperationDTO model);
         Task<bool> Delete(Model_OperationDTO operation);
         Task<Model_OperationDTO> GetModel_OperationDTO( ModelOperationEditParam modelOperationEditParam);
         Task<object> GetAllProcessType();
         Task<bool> CheckExistKaizenAndRTF(Model_OperationDTO operation);
    }
}