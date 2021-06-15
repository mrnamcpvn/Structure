using System.Threading.Tasks;
using SmartTool_API.DTOs;

namespace SmartTool_API._Repositories.Interfaces
{
    public interface IMeasurement_RFTRepository
    {
         Task<bool> CheckExistsRTF(Model_OperationDTO operation);
    }
}