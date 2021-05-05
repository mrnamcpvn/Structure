using System.Threading.Tasks;
using SmartTool_API.DTO;
using SmartTool_API.Helpers;

namespace SmartTool_API._Services.Interfaces
{
    public interface IModelService : IMainService<ModelDTO>
    {
        Task<PagedList<ModelDTO>> SearchModel(PaginationParam param, ModelParam modelParam);

        Task<object> GetModelType();

        Task<ModelDTO> GetByFactoryAndModelNo(string facID, string modelNo);

        Task<OperationResult> Add(ModelDTO model);

        Task<OperationResult> Update(ModelDTO model);

    }
}