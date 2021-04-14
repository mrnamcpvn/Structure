using System.Threading.Tasks;
using SmartTooling_API.DTO;

namespace SmartTooling_API._Services.Interfaces
{
     public interface IAuthService
    {
         Task<UserForLoggedDTO> GetUser(string username,string password);
    }
}