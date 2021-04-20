using System.Threading.Tasks;
using SmartTooling_API.DTO;
using SmartTooling_API.Helpers;
using SmartTooling_API.Helpers.Utilities;

namespace SmartTooling_API._Services.Interfaces
{
    public interface IModelService : IMainService<ModelDTO>
    {
        Task<PageListUtility<ModelDTO>> SearchModel(PaginationParams param, ModelParam modelParam);

        Task<object> GetModelType();

        Task<ModelDTO> GetByFactoryAndModelNo(string facID, string modelNo);


    }
}