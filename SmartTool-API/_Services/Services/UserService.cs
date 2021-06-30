using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;
using SmartTool_API._Repositories.Interfaces;
using SmartTool_API._Services.Interfaces;
using SmartTool_API.DTOs;
using SmartTool_API.Helpers;
using SmartTool_API.Models;

namespace SmartTool_API._Services.Services
{
    public class UserService : IUserService
    {
        private readonly IUserRepository _userRepository;
        private readonly IMapper _mapper;
        private readonly MapperConfiguration _configMapper;
        private readonly IRoleRepository _roleRepository;
        private readonly IRoleUserRepository _roleUserRepository;
        private OperationResult operationResult;

        public UserService( IUserRepository userRepository,
                            IMapper mapper,
                            MapperConfiguration configMapper,
                            IRoleRepository roleRepository,
                            IRoleUserRepository roleUserRepository)
        {
            _userRepository = userRepository;
            _mapper = mapper;
            _configMapper = configMapper;
            _roleRepository = roleRepository;
            _roleUserRepository = roleUserRepository;
        }

        public async Task<bool> AddUser(UsersDTO user, string updateBy)
        {
            user.update_by = updateBy;
            user.update_time = DateTime.Now;
            var data = _mapper.Map<Users>(user);
            _userRepository.Add(data);

            return await _userRepository.SaveAll();
        }

        public async Task<OperationResult> ChangePassword(UserForLoginDto user)
        {
             var currentUser = _userRepository.FindSingle(x => x.account == user.Account);
            if (currentUser.password != user.OldPassword)
            {
               return operationResult = new OperationResult { Caption = "Fail", Message = "Current Pasword not match", Success = false };
            }
            else
            {
                currentUser.password = user.Password;
                currentUser.update_time = DateTime.Now;
                _userRepository.Update(currentUser);
                await _userRepository.SaveAll();
                return operationResult = new OperationResult { Caption = "Success", Message = "Update Password Success", Success = true };
            }
        }

        public async Task<bool> CheckExistUser(string account)
        {
            var data = _userRepository.FindAll(x => x.account == account);
            if (await data.AnyAsync())
            {
                return true;
            }
            else
            {
                return false;
            }
        }

        public async Task<OperationResult> DeleteUser(string userName)
        {
            var user = _userRepository.FindAll(x => x.account == userName).FirstOrDefault();

            if(user != null){
                var roleByUserHad = await _roleUserRepository.FindAll(x => x.user_account == userName).ToListAsync();
                _roleUserRepository.RemoveMultiple(roleByUserHad);
                await _roleUserRepository.SaveAll();
                _userRepository.Remove(user);
                await _userRepository.SaveAll();
                return operationResult = new OperationResult { Caption = "Success", Message = "Delete User Success", Success = true };
            }
            else
            {
                return operationResult = new OperationResult { Caption = "Success", Message = "Delete User Fail", Success = false };
            }
        }

        public async Task<PageListUtility<UsersDTO>> GetListUserPaging(string account, string isActive, int pageNumber = 10, int pageSize = 10)
        {
            var data = _userRepository.FindAll();
            if (!string.IsNullOrEmpty(account))
            {
                data = data.Where(x => x.account.Contains(account));
            }
            if (!string.IsNullOrEmpty(isActive))
            {
                var active = isActive == "1" ? true : false;
                data = data.Where(x => x.is_active == active);
            }

            var result = data.ProjectTo<UsersDTO>(_configMapper).OrderByDescending(x =>x.update_time);
            return await PageListUtility<UsersDTO>.PageListAsync(result, pageNumber, pageSize);
        }

        public async Task<List<RoleByUserDTO>> GetRoleByUser(string account)
        {
            var roleByUser = await _roleUserRepository.FindAll(x => x.user_account == account).Select(x => x.role_unique).ToListAsync();
            var role = await _roleRepository.FindAll().OrderBy(x => x.role_sequence).Select(x => new RoleByUserDTO
            {
                role_name = x.role_name,
                role_unique = x.role_unique,
                status = roleByUser.Contains(x.role_unique) == true ? true : false
            }).ToListAsync();
            return role;
        }

        public async Task<bool> UpdateRoleByUser(string account, List<RoleByUserDTO> roles, string updateBy)
        {
            var timeNow = DateTime.Now;
            var roleByUserHad = await _roleUserRepository.FindAll(x => x.user_account == account).ToListAsync();
            _roleUserRepository.RemoveMultiple(roleByUserHad);
            var roleByUserNew = roles.Select(x => new RoleUserDTO
                                            {
                                                create_by = updateBy,
                                                create_time = timeNow,
                                                role_unique = x.role_unique,
                                                user_account = account
                                            }).ToList();
            var roleByUserNewMap = _mapper.Map<List<RoleUser>>(roleByUserNew);
            _roleUserRepository.AddMultiple(roleByUserNewMap);
            return await _roleUserRepository.SaveAll();
        }

        public async Task<bool> UpdateUser(UsersDTO user, string updateBy)
        {
            user.update_by = updateBy;
            user.update_time = DateTime.Now;
            var data = _mapper.Map<Users>(user);
            _userRepository.Update(data);
            return await _userRepository.SaveAll();
        }
    }
}