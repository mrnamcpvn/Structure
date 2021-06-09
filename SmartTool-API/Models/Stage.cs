using System.ComponentModel.DataAnnotations;

namespace SmartTool_API.Models
{
    public class Stage
    {
        [Key]
        [StringLength(50)]
        public string factory_id { get; set; }
        [Key]
        [StringLength(8)]
        public string stage_id { get; set; }
        [Required]
        [StringLength(100)]
        public string stage_name { get; set; }
        public int sequence { get; set; }
        public bool is_active { get; set; }
    }
}