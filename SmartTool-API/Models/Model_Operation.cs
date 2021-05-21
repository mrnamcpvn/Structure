using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SmartTool_API.Models
{
    public partial class Model_Operation
    {
        [Key]
        [StringLength(50)]
        public string factory_id { get; set; }
        [Key]
        [StringLength(8)]
        public string model_no { get; set; }
        [Key]
        [StringLength(8)]
        public string stage_id { get; set; }
        [Key]
        [StringLength(50)]
        public string operation_id { get; set; }
        [Required]
        [StringLength(20)]
        public string process_type_id { get; set; }
        [Required]
        [StringLength(200)]
        public string operation_name_local { get; set; }
        [Required]
        [StringLength(200)]
        public string operation_name_en { get; set; }
        [Required]
        [StringLength(200)]
        public string operation_name_zh { get; set; }
        [StringLength(50)]
        public string sop_no { get; set; }
        public bool critical_quality { get; set; }
        public bool critical_efficiency { get; set; }
        public int sequence { get; set; }
        [Required]
        [StringLength(50)]
        public string create_by { get; set; }
        [Column(TypeName = "datetime")]
        public DateTime create_time { get; set; }
        [Required]
        [StringLength(50)]
        public string update_by { get; set; }
        [Column(TypeName = "datetime")]
        public DateTime update_time { get; set; }
    }
}
