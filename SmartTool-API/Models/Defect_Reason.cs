using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SmartTool_API.Models
{
    public partial class Defect_Reason
    {
[Key]
[StringLength(50)]
public string factory_id { get; set; }
[Key]
[StringLength(50)]
public string defect_reason_id { get; set; }
[Required]
[StringLength(200)]
public string defect_reason_name { get; set; }
public int sequence { get; set; }
public bool is_active { get; set; }
[Required]
[StringLength(50)]
public string update_by { get; set; }
[Column(TypeName = "datetime")]
public DateTime update_time { get; set; }
    }
}
