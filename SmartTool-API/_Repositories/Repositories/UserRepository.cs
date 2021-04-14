using Microsoft.Extensions.Configuration;
using SmartTooling_API._Repositories.Interfaces;
using SmartTooling_API.Data;
using SmartTooling_API.Models;

namespace SmartTooling_API._Repositories.Repositories
{
    public class UserRepository : MainRepository<Users>, IUserRepository
    {
        private readonly DataContext _context;

        public UserRepository(DataContext context,IConfiguration configuration) : 
                            base(context,configuration)
        {
            _context = context;
        }
    }
}