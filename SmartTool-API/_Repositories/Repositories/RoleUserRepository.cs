using Microsoft.Extensions.Configuration;
using SmartTool_API._Repositories.Repositories;
using SmartTool_API._Repositories.Interfaces;
using SmartTool_API.Data;
using SmartTool_API.Models;

namespace SmartTool_API._Repositories.Repositories
{
    public class RoleUserRepository : MainRepository<RoleUser>, IRoleUserRepository
    {
        private readonly DataContext _context; 
        public RoleUserRepository(DataContext context,SHCDataContext SHCcontext,
                            IConfiguration configuration) : 
                            base(context,SHCcontext,configuration)
        {
            _context = context;
        }
    }
}