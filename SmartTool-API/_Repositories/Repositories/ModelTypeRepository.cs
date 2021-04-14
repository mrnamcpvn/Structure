using Microsoft.Extensions.Configuration;
using SmartTooling_API._Repositories.Interfaces;
using SmartTooling_API.Data;
using SmartTooling_API.Models;

namespace SmartTooling_API._Repositories.Repositories
{
    public class ModelTypeRepository : MainRepository<Model_Type>, IModelTypeRepository
    {
        private readonly DataContext _context;
        public ModelTypeRepository(DataContext context,IConfiguration configuration) : 
                            base(context,configuration)
        {
            _context = context;
        }
    }
}