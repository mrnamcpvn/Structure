using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using SmartTool_API._Repositories.Interfaces;
using SmartTool_API.Data;
using SmartTool_API.Helpers;
using SmartTool_API.Models;

namespace SmartTool_API._Repositories.Repositories
{
    public class ModelOperationRepository : MainRepository<Model_Operation, int>, IModelOperationRepository
    {
        private readonly DataContext _context;
        public ModelOperationRepository(DataContext context, IConfiguration configuration) : base(context, configuration)
        {
            _context = context;
        }

        public async Task<Model_Operation> GetByModelOperation(ModelOperationEditParam modelParam)
        {
            var modelOperation = await _context.Model_Operations.Where(x => x.factory_id == modelParam.factory_id
            && x.model_no == modelParam.model_no && x.stage_id == modelParam.stage_id && x.operation_id == modelParam.operation_id)
            .FirstOrDefaultAsync();
            return modelOperation;
        }
    }
}