using System.Threading.Tasks;
using SmartTool_API.DTO;
using SmartTool_API.Helpers;

namespace SmartTool_API._Services.Interfaces
{
    public interface IModelOperationService : IMainService<ModelOperationDTO>
    {
        Task<PagedList<ModelDTO>> SearchModel(PaginationParams param, ModelParam modelParam);
        Task<ModelOperationDTO> GetModelOperation(ModelOperationEditParam modelOperationEditParam);
    }
}