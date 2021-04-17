using System.Collections.Generic;
using System.Threading.Tasks;
using SmartTooling_API.DTO;
using SmartTooling_API.Helpers;

namespace SmartTooling_API._Services.Interfaces
{
    public interface IModelEfficiencyService
    {
        Task<bool> UpdateOrInsert(List<ModelEfficiencyDTO> modelEfficiencyDTO, string factory, string username);

        Task<object> GetAllUpperID();

        Task<object> GetModelName(string upperId, string factory);

        Task<List<ModelEfficiencyDTO>> ModelEfficiencyEdit(ModelEfficiencyEditParam modelParam);

        Task<bool> CheckExist(ModelEfficiencyEditParam modelParam);


    }
}