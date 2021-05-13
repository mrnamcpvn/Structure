using System.Threading.Tasks;

namespace SmartTool_API.Models.Hubs
{
    public interface IHubClient
    {
        Task BroadcastMessage();
    }
}