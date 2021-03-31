
using System;
using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SmartTool_API._Services.Interfaces;
using SmartTool_API.DTO;
using SmartTool_API.Helpers;

namespace SmartTool_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    // [Authorize]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;

        public UserController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpGet]
        public async Task<IActionResult> GetListUserPaging(string account, string isActive, int pageNumber = 1, int pageSize = 10)
        {
            var result = await _userService.GetListUserPaging(account, isActive, pageNumber, pageSize);
            Response.AddPagination(result.CurrentPage, result.PageSize, result.TotalCount, result.TotalPages);
            return Ok(result);
        }

        [HttpPost("add")]
        public async Task<IActionResult> AddUser(UserDTO user)
        {
            var updateBy = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            var result = await _userService.AddUser(user, updateBy);
            if (result)
            {
                return NoContent();
            }

            throw new Exception("Fail Add User");
        }

        [HttpPost("update")]
        public async Task<IActionResult> UpdateUser(UserDTO user)
        {
            var updateBy = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            var result = await _userService.UpdateUser(user, updateBy);
            if (result)
            {
                return Ok(result);
            }

            throw new Exception("Fail Add User");
        }

        [HttpGet("roleuser/{account}")]
        public async Task<IActionResult> GetRoleByUser(string account)
        {
            var result = await _userService.GetRoleByUser(account);
            return Ok(result);
        }

        [HttpPost("roleuser/{account}")]
        public async Task<IActionResult> UpdateRoleByUser(string account, List<RoleByUserDTO> roles)
        {
            if (!(await _userService.CheckExistUser(account)))
            {
                return NotFound();
            }
            var updateBy = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            var result = await _userService.UpdateRoleByUser(account, roles, updateBy);
            if (result)
            {
                return NoContent();
            }

            throw new Exception("Fail Add User");
        }

        [HttpPost("changepassword")]
        public async Task<IActionResult> ChangePassword(UserForLoginDTO user)
        {
            var result =  await _userService.ChangePassword(user);
            return Ok(result);
        }
    }
}