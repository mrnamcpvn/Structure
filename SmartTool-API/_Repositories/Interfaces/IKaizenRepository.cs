using System.Threading.Tasks;
using SmartTool_API.Models;
using SmartTool_API.DTO;

namespace SmartTool_API._Repositories.Interfaces
{
    public interface IKaizenRepository : IMainRepository<Kaizen>
    {
        Task<bool> CheckExistsKaizen(ModelOperationDTO operation);

        Task<bool> CheckKaizenDescriptionExist(KaizenDTO model);
    }
}