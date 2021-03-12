using System;
using System.Threading.Tasks;

namespace SmartTool_API._Repositories.Interfaces
{
    public interface IUnitOfWork : IDisposable
    {
        void SaveChange();

        Task SaveChangeAsync();
    }
}