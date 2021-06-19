using System.Data.Entity;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using SmartTool_API._Repositories.Interfaces;
using SmartTool_API.Data;
using SmartTool_API.DTOs;
using SmartTool_API.Models;

namespace SmartTool_API._Repositories.Repositories
{
    public class KaizenRepository : MainRepository<Kaizen>, IKaizenRepository
    {
        private readonly DataContext _context;
        public KaizenRepository(DataContext context, IConfiguration configuration) : base(context, configuration)
        {
            _context = context;
        }

        public async Task<bool> CheckExistsKaizen(Model_OperationDTO operation)
        {
            if(await _context.Kaizen.AnyAsync(x =>x.factory_id == operation.factory_id &&
                                                  x.model_no == operation.model_no && 
                                                  x.stage_id == operation.stage_id &&
                                                  x.operation_id == operation.operation_id))
            {
                return true;
            }else 
            {
                return false;
            }
        }

        public async Task<bool> CheckKaizenDescriptionExist(KaizenDTO model)
        {
            if(await _context.Kaizen.AnyAsync(x => x.factory_id == model.factory_id &&
                                                   x.model_no == model.model_no &&
                                                   x.serial_no != model.serial_no &&
                                                   x.kaizen_description == model.kaizen_description))
            {
                return true;
            }
            else
            {
                return false;
            }
        }
    }
}