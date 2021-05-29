using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SmartTool_API.Models
{
    public partial class VW_ModelKaizen
    {
        [Required]
        [StringLength(50)]
        public string factory_id { get; set; }
        [Required]
        [StringLength(8)]
        public string model_no { get; set; }
        [Required]
        [StringLength(200)]
        public string model_name { get; set; }
        [Required]
        [StringLength(5)]
        public string model_type_id { get; set; }
        [Required]
        [StringLength(100)]
        public string model_type_name { get; set; }
        [StringLength(50)]
        public string model_family { get; set; }
        [Required]
        [StringLength(4)]
        public string dev_season { get; set; }
        [Required]
        [StringLength(4)]
        public string prod_season { get; set; }
        [Column(TypeName = "numeric(18, 0)")]
        public decimal? volume { get; set; }
        [Column(TypeName = "numeric(18, 2)")]
        public decimal? volume_percent { get; set; }
        [StringLength(4000)]
        public string remarks { get; set; }
        public int serial_no { get; set; }
        [Required]
        [StringLength(200)]
        public string kaizen_description { get; set; }
        public bool kaizen_type_eliminate { get; set; }
        public bool kaizen_type_reduce { get; set; }
        public bool kaizen_type_combine { get; set; }
        public bool kaizen_type_smart_tool { get; set; }
        [Required]
        [StringLength(8)]
        public string stage_id { get; set; }
        [Required]
        [StringLength(100)]
        public string stage_name { get; set; }
        [Column(TypeName = "date")]
        public DateTime start_date { get; set; }
        [Required]
        [StringLength(20)]
        public string process_type_id { get; set; }
        [Required]
        [StringLength(100)]
        public string process_type_name_en { get; set; }
        [Column(TypeName = "numeric(18, 0)")]
        public decimal process_tct_sec { get; set; }
        [Column(TypeName = "numeric(18, 0)")]
        public decimal ct_before_sec { get; set; }
        [Column(TypeName = "numeric(18, 0)")]
        public decimal ct_after_sec { get; set; }
        public int? Improv { get; set; }
        [Column(TypeName = "numeric(18, 2)")]
        public decimal? rft_before_percent { get; set; }
        [Column(TypeName = "numeric(18, 2)")]
        public decimal? rft_after_percent { get; set; }
        [Column(TypeName = "numeric(18, 2)")]
        public decimal line_roll_out_percent { get; set; }
        [Required]
        [StringLength(50)]
        public string operation_id { get; set; }
        [Required]
        [StringLength(200)]
        public string operation_name_en { get; set; }
        public bool critical_quality { get; set; }
        public bool critical_efficiency { get; set; }
        [Required]
        [StringLength(4000)]
        public string before_remarks { get; set; }
        [Required]
        [StringLength(4000)]
        public string after_remarks { get; set; }
    }
}
