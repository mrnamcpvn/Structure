using System.Threading.Tasks;
using SmartTooling_API.DTO;
using SmartTooling_API.Helpers;

namespace SmartTooling_API._Services.Interfaces
{
    public interface IModelService : IMainService<ModelDTO>
    {
         Task<PagedList<ModelDTO>> SearchModel(PaginationParams param, ModelParam modelParam);

         Task<object> GetModelType();

         Task<ModelDTO> GetByFactoryAndModelNo(string facID, string modelNo);


    }
}