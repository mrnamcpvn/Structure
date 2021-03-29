using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SmartTool_API.Models
{
    [Table("Model_Type")]
    public class Model_Type
    {
        [Key]
        [Column(Order = 0)]
        public string factory_id { get; set; }

        [Key]
        [Column(Order = 1)]
        public string model_type_id { get; set; }
        public string model_type_name { get; set; }

        public bool is_active { get; set; }
    }
}