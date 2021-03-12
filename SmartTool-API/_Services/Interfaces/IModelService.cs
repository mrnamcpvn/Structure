using System.Threading.Tasks;
using SmartTool_API.DTO;
using SmartTool_API.Helpers;

namespace SmartTool_API._Services.Interfaces
{
    public interface IModelService : IMainService<ModelDTO>
    {
        Task<PagedList<ModelDTO>> SearchModel(PaginationParams param, ModelParam modelParam);
        Task<ModelDTO> GetByFactoryAndModelNo(string facID, string modelNo);
    }
}