using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using SmartTool_API._Repositories.Interfaces;
using SmartTool_API._Services.Interfaces;
using SmartTool_API.DTO;

namespace SmartTool_API._Services.Services
{
    public class AuthService : IAuthService
    {
        private readonly IUserRepository _userRepository;
        private readonly IRoleRepository _roleRepository;
        private readonly IRoleUserRepository _roleUserRepository;

        public AuthService(IUserRepository userRepository, IRoleRepository roleRepository, IRoleUserRepository roleUserRepository)
        {
            _userRepository = userRepository;
            _roleRepository = roleRepository;
            _roleUserRepository = roleUserRepository;
        }

        public async Task<UserForLoggedDTO> GetUser(string username, string password)
        {
            var user = _userRepository.FindSingle(x => x.account.Trim() == username.Trim() && x.is_active == true);

            // kiểm tra xem username đó có ko
            if (user == null)
            {
                return null;
            }
            if (user.password != password)
            {
                return null;
            }
            var roleUser = _roleUserRepository.FindAll(x => x.user_account == user.account);
            var role = _roleRepository.FindAll();
            var roleName = await roleUser.Join(role, x => x.role_unique, y => y.role_unique, (x, y)
            => new RoleDTO { Name = y.role_unique, Position = y.role_sequence }).ToListAsync();

            var result = new UserForLoggedDTO
            {
                Id = user.account,
                Email = user.email,
                Username = user.account,
                Name = user.name,
                Role = roleName.OrderBy(x => x.Position).Select(x => x.Name).ToList()
            };

            return result;
        }
    }
}