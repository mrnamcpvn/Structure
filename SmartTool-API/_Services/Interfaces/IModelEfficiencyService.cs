using System.Collections.Generic;
using System.Threading.Tasks;
using SmartTool_API.DTOs;
using SmartTool_API.Helpers;

namespace SmartTool_API._Services.Interfaces
{
    public interface IModelEfficiencyService
    {
         Task<bool> UpdateOrInsert(List<ModelEfficiencyDTO> modelEfficiencyDTOs, string factory, string username);
         Task<object> GetAllUpperID();

        Task<object> GetModelName(string upperId, string factory);

        Task<List<ModelEfficiencyDTO>> ModelEfficiencyEdit(ModelEfficiencyEditParam modelParam);

        Task<bool> CheckExist(ModelEfficiencyEditParam modelParam);

    }
}