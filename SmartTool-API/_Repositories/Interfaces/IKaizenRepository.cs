using System.Threading.Tasks;
using SmartTooling_API.Models;
using SmartTooling_API.DTO;

namespace SmartTooling_API._Repositories.Interfaces
{
    public interface IKaizenRepository : IMainRepository<Kaizen>
    {
        Task<bool> CheckExistsKaizen(ModelOperationDTO operation);

        Task<bool> CheckKaizenDescriptionExist(KaizenDTO model);
    }
}