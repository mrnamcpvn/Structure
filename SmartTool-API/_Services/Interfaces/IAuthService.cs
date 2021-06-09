using System.Threading.Tasks;
using SmartTool_API.DTOs;

namespace SmartTool_API._Services.Interfaces
{
    public interface IAuthService
    {
         Task<UserForLoggedDTO> GetUser(string username,string password);
    }
}