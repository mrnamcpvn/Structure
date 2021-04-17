using Microsoft.Extensions.Configuration;
using SmartTooling_API._Repositories.Interfaces;
using SmartTooling_API.Data;
using SmartTooling_API.Models;

namespace SmartTooling_API._Repositories.Repositories
{
    public class FactoryRepository : MainRepository<Factory>, IFactoryRepository
    {
        private readonly DataContext _context;
        public FactoryRepository(DataContext context,IConfiguration configuration) : 
                            base(context,configuration)
        {
            _context = context;
        }
    }
}