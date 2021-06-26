using System;
using Microsoft.AspNetCore.Http;

namespace SmartTool_API.DTOs
{
    public class UsersDTO
    {
        public string account { get; set; }
        public string password { get; set; }
        public string name { get; set; }
        public string email { get; set; }
        public bool is_active { get; set; }
        public string update_by { get; set; }
        public DateTime? update_time { get; set; }
        public string Image { get; set; }
        public IFormFile File { get; set; }
        public UsersDTO()
        {
            this.update_time = DateTime.Now;
        }
    }
}