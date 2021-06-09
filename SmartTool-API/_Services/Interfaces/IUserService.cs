using System.Collections.Generic;
using System.Threading.Tasks;
using SmartTool_API.DTOs;
using SmartTool_API.Helpers;

namespace SmartTool_API._Services.Interfaces
{
    public interface IUserService
    {
        Task<PagedList<UsersDTO>> GetListUserPaging(string account, string isActive, int pageNumber = 10, int pageSize = 10);
        Task<bool> AddUser(UsersDTO user, string updateBy);
        Task<bool> UpdateUser(UsersDTO user, string updateBy);
        Task<List<RoleByUserDTO>> GetRoleByUser(string account);
        Task<bool> UpdateRoleByUser(string account, List<RoleByUserDTO> roles, string updateBy);
        Task<bool> CheckExistUser(string account);
        Task<OperationResult> ChangePassword(UserForLoginDto user);
    }
}