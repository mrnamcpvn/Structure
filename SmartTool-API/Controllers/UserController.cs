using System;
using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using SmartTool_API._Services.Interfaces;
using SmartTool_API.DTO;
using SmartTool_API.Helpers;
using SmartTool_API.Models.Hubs;

namespace SmartTool_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;
        private readonly IHubContext<BroadcastHub, IHubClient> _hubContext;

        public UserController(IUserService userService, IHubContext<BroadcastHub, IHubClient> hubContext)
        {
            _userService = userService;
            _hubContext = hubContext;
        }

        [HttpGet]
        public async Task<IActionResult> GetListUserPaging(string account, string isActive, int pageNumber = 1, int pageSize = 10)
        {
            var result = await _userService.GetListUserPaging(account, isActive, pageNumber, pageSize);
            Response.AddPagination(result.CurrentPage, result.PageSize, result.TotalCount, result.TotalPages);
            return Ok(result);
        }

        [HttpPost]
        public async Task<IActionResult> AddUser(UserDTO user)
        {
            var result = await _userService.AddUser(user);
            await _hubContext.Clients.All.BroadcastMessage();
            return Ok(result);
        }

        [HttpPost("update")]
        public async Task<IActionResult> UpdateUser(UserDTO user)
        {
            var result = await _userService.UpdateUser(user);
            await _hubContext.Clients.All.BroadcastMessage();
            return Ok(result);
        }

        [HttpGet("roleuser/{account}")]
        public async Task<IActionResult> GetRoleByUser(string account)
        {
            var result = await _userService.GetRoleByUser(account);
            return Ok(result);
        }

        [HttpPost("changepassword")]
        public async Task<IActionResult> ChangePassword(UserForLoginDto user)
        {
            var result = await _userService.ChangePassword(user);
            return Ok(result);
        }

        [HttpPost("roleuser/{account}")]
        public async Task<IActionResult> UpdateRoleByUser(string account, List<RoleByUserDTO> roles, [FromQuery] string update_by)
        {
            if (!(await _userService.CheckExistUser(account)))
            {
                return NotFound();
            }

            var result = await _userService.UpdateRoleByUser(account, roles, update_by);
            await _hubContext.Clients.All.BroadcastMessage();
            return Ok(result);
        }
    }
}