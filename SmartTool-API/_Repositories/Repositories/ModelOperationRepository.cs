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
    public class ModelOperationRepository : MainRepository<Model_Operation>, IModelOperationRepository
    {
        private readonly DataContext _context;
        public ModelOperationRepository(DataContext context, IConfiguration configuration) : base(context, configuration)
        {
            _context = context;
        }

        public async Task<Model_Operation> GetByModelOperation(ModelOperationEditParam modelOperationEditParam)
        {
            var modelOperation = await _context.Model_Operation.Where(x => x.factory_id == modelOperationEditParam.factory_id
                && x.model_no == modelOperationEditParam.model_no && x.stage_id == modelOperationEditParam.stage_id && x.operation_id == modelOperationEditParam.operation_id)
                .FirstOrDefaultAsync();

            return modelOperation;
        }
    }
}