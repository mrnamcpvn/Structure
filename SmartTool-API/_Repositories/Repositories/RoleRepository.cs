using Microsoft.Extensions.Configuration;
using SmartTool_API._Repositories.Interfaces;
using SmartTool_API.Data;
using SmartTool_API.Models;

namespace SmartTool_API._Repositories.Repositories
{
    public class RoleRepository : MainRepository<Roles>, IRoleRepository
    {
        private readonly DataContext _context;
        public RoleRepository(DataContext context, IConfiguration configuration) : 
                            base(context, configuration)
        {
            _context = context;
        }
    }
}