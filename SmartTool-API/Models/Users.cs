using System;
using System.ComponentModel.DataAnnotations;

namespace SmartTool_API.Models
{
    public class Users
    {
        [Key]
        public string Account {get;set;}
        public string Password {get;set;}
        public string Name {get;set;}
        public string Email {get;set;}
        public bool Is_Active {get;set;}
        public string Update_By {get;set;}
        public DateTime Update_Time {get;set;}
    }
}