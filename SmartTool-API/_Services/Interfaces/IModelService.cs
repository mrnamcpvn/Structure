using System.Threading.Tasks;
using SmartTool_API.DTOs;
using SmartTool_API.Helpers;

namespace SmartTool_API._Services.Interfaces
{
    public interface IModelService : IMainService<ModelDTO>
    {
         Task<PageListUtility<ModelDTO>> SearchModel(PaginationParams paginationParams, ModelParam modelParam);

         Task<object> GetModelType();
         Task<ModelDTO> GetByFactoryAndModelNo(string factID, string modelNO);
    }
}