using System.Threading.Tasks;
using SmartTool_API.DTOs;
using SmartTool_API.Models;

namespace SmartTool_API._Repositories.Interfaces
{
    public interface IMeasurement_RFTRepository :IMainRepository<Measurement_RFT>
    {
         Task<bool> CheckExistsRTF(Model_OperationDTO operation);
    }
}