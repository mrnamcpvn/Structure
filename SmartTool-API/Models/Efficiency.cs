using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SmartTool_API.Models
{
    public partial class Efficiency
    {
[Key]
[StringLength(50)]
public string factory_id { get; set; }
[Key]
[StringLength(10)]
public string upper_id { get; set; }
[Key]
[StringLength(4)]
public string season { get; set; }
[Key]
public int month { get; set; }
[Column(TypeName = "decimal(18, 2)")]
public decimal? efficiency_target { get; set; }
[Column(TypeName = "decimal(18, 2)")]
public decimal? efficiency_actual { get; set; }
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
