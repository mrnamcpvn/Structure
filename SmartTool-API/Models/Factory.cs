using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SmartTool_API.Models
{
    [Table("Factory")]
    public class Factory
    {
        [Key]
        public string factory_id {get;set;}
        public string factory_name {get;set;}
        public string customer_name {get;set;}
        public string location {get;set;}
    }
}