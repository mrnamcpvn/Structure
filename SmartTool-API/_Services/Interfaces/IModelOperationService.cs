using System.Threading.Tasks;
using SmartTooling_API.DTO;
using SmartTooling_API.Helpers;

namespace SmartTooling_API._Services.Interfaces
{
    public interface IModelOperationService
    {
        Task<PagedList<ModelOperationDTO>> SearchModelOperation(PaginationParams param, ModelOperationParam modelParam);

        Task<bool> Add(ModelOperationDTO model);

        Task<bool> Update(ModelOperationDTO model);

        Task<bool> Delete(ModelOperationDTO operation);

        Task<ModelOperationDTO> GetModelOperation(ModelOperationEditParam modelOperationEditParam);

        Task<object> GetAllProcessType();
          Task<PagedList<ModelOperationDTO>> GetAllModelOperation(PaginationParams param);

        Task<bool> CheckExistKaizenAndRTF(ModelOperationDTO operation);

    }
}