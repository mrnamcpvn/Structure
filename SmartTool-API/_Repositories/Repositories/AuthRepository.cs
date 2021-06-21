using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using SmartTool_API._Repositories.Interfaces;
using SmartTool_API.Data;

namespace SmartTooling_API._Repositories.Repositories
{
    public class AuthRepository : IAuthRepository
    {
        private readonly DataContext _context;
        public AuthRepository(DataContext context)
        {
            _context = context;
        }

        
    }
}