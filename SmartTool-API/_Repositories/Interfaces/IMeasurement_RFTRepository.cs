using System.Threading.Tasks;
using SmartTool_API.DTO;
using SmartTool_API.Models;

namespace SmartTool_API._Repositories.Interfaces
{
    public interface IMeasurement_RFTRepository : IMainRepository<Measurement_RFT, string>
    {
         Task<bool> CheckExistsRTF(ModelOperationDTO operation);
    }
}