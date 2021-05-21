using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SmartTool_API.Models
{
    public partial class Kaizen
    {
[Key]
[StringLength(50)]
public string factory_id { get; set; }
[Key]
[StringLength(8)]
public string model_no { get; set; }
[Key]
public int serial_no { get; set; }
[Required]
[StringLength(200)]
public string kaizen_description { get; set; }
[Required]
[StringLength(8)]
public string stage_id { get; set; }
[Required]
[StringLength(50)]
public string operation_id { get; set; }
[Column(TypeName = "date")]
public DateTime start_date { get; set; }
public bool kaizen_type_eliminate { get; set; }
public bool kaizen_type_reduce { get; set; }
public bool kaizen_type_combine { get; set; }
public bool kaizen_type_smart_tool { get; set; }
[Column(TypeName = "numeric(18, 0)")]
public decimal process_tct_sec { get; set; }
[Column(TypeName = "numeric(18, 0)")]
public decimal ct_before_sec { get; set; }
[Column(TypeName = "numeric(18, 0)")]
public decimal ct_after_sec { get; set; }
[Column(TypeName = "numeric(18, 2)")]
public decimal? rft_before_percent { get; set; }
[Column(TypeName = "numeric(18, 2)")]
public decimal? rft_after_percent { get; set; }
[Column(TypeName = "numeric(18, 2)")]
public decimal line_roll_out_percent { get; set; }
[Required]
[StringLength(200)]
public string before_media { get; set; }
[Required]
[StringLength(200)]
public string after_media { get; set; }
[Required]
[StringLength(4000)]
public string before_remarks { get; set; }
[Required]
[StringLength(4000)]
public string after_remarks { get; set; }
[Required]
[StringLength(50)]
public string kaizen_from { get; set; }
public int clicks_times { get; set; }
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
