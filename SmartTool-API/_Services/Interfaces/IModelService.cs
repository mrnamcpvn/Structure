using System.Threading.Tasks;
using SmartTool_API.DTO;
using SmartTool_API.Helpers;

namespace SmartTool_API._Services.Interfaces
{
    public interface IModelService : IMainService<ModelDTO>
    {
        Task<PagedList<ModelDTO>> SearchModel(PaginationParams param, ModelParam modelParam);

        Task<object> GetModelType();
        Task<object> GetAllModel();

        Task<ModelDTO> GetByFactoryAndModelNo(string faceId, string modelNo);


    }
}