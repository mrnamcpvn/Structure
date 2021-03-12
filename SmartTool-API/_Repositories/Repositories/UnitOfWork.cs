using System.Threading.Tasks;
using SmartTool_API._Repositories.Interfaces;
using SmartTool_API.Data;

namespace SmartTool_API._Repositories.Repositories
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly DataContext _context;

        public UnitOfWork(DataContext context)
        {
            _context = context;
        }

        public void Dispose()
        {
            _context.Dispose();
        }

        public void SaveChange()
        {
            _context.SaveChanges();
        }

        public async Task SaveChangeAsync()
        {
            await _context.SaveChangesAsync();
        }
    }
}