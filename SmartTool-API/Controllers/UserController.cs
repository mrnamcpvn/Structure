using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SmartTool_API._Repositories.Interfaces;
using SmartTool_API._Services.Interfaces;
using SmartTool_API.DTOs;
using SmartTool_API.Helpers;

namespace SmartTool_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    // [Authorize]
    public class UserController : ControllerBase
    {
        private readonly IUploadFIleService _upfileService;
        private readonly IUserService _userService;
        private readonly IUserRepository _userrepository;


        public UserController(IUploadFIleService upfileService, IUserService userService, IUserRepository userrepository)
        {
            _upfileService = upfileService;
            _userService = userService;
            _userrepository = userrepository;
        }

        [HttpPut("changepassword")]
        public async Task<IActionResult> ChangePassword(UserForLoginDto user)
        {
            var result =  await _userService.ChangePassword(user);
            return Ok(result);
        }


        [HttpPost("adduser")]
        public async Task<IActionResult> AddUser([FromForm] UsersDTO user)
        {
            if (user.File != null)
                user.Image = await _upfileService.UploadFile(user.File, user.account.Trim() + "_", "\\uploaded\\images\\user");
            var updateBy = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            var result = await _userService.AddUser(user, updateBy);
            if (result)
            {
                return NoContent();
            }

            throw new Exception("Fail Add User");
        }
        [HttpGet]
        public async Task<IActionResult> GetListUserPaging(string account, string isActive, int pageNumber = 1, int pageSize = 10)
        {
            var result = await _userService.GetListUserPaging(account, isActive, pageNumber, pageSize);
            Response.AddPagination(result.CurrentPage, result.PageSize, result.TotalCount, result.TotalPages);
            return Ok(result);
        }

        [HttpPut("update")]
        public async Task<IActionResult> UpdateUser([FromForm] UsersDTO user)
        {
            if (user.File != null)
            {
                var image = await _userrepository.FindAll(x => x.account == user.account)
                                                             .Select(x => x.Image)
                                                             .FirstOrDefaultAsync();
                if (!string.IsNullOrEmpty(image))
                    _upfileService.DeleteFileUpload(image, "\\uploaded\\images\\user");
                user.Image = await _upfileService.UploadFile(user.File, user.account.Trim() + "_", "\\uploaded\\images\\user");
            }
            var updateBy = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            var result = await _userService.UpdateUser(user, updateBy);
            if (result)
            {
                return NoContent();
            }

            throw new Exception("Fail Add User");
        }

        [HttpGet("roleuser/{account}")]
        public async Task<IActionResult> GetRoleByUser(string account)
        {
            var result = await _userService.GetRoleByUser(account);
            return Ok(result);
        }

        [HttpPut("roleuser/{account}")]
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

        [HttpDelete("{account}")]
        public async Task<IActionResult> DeleteUser(string account){
            var image = await _userrepository.FindAll(x => x.account == account)
                                             .Select(x => x.Image)
                                             .FirstOrDefaultAsync();
            if (!string.IsNullOrEmpty(image))
                _upfileService.DeleteFileUpload(image, "\\uploaded\\images\\user");
            // var result = await _userService.DeleteUser(account);
            return Ok(await _userService.DeleteUser(account));
        }
    }
}