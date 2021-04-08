using System.Threading.Tasks;
using SmartTool_API.Models;
using SmartTool_API.DTO;

namespace SmartTool_API._Repositories.Interfaces
{
    public interface IMeasurement_RFTRepository : IMainRepository<Measurement_RFT>
    {
        Task<bool> CheckExistsRTF(ModelOperationDTO operation);
    }
}