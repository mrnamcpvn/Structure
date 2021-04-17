using System.Threading.Tasks;
using SmartTooling_API.Models;
using SmartTooling_API.DTO;

namespace SmartTooling_API._Repositories.Interfaces
{
    public interface IMeasurement_RFTRepository : IMainRepository<Measurement_RFT>
    {
            Task<bool> CheckExistsRTF(ModelOperationDTO operation);
    }
}