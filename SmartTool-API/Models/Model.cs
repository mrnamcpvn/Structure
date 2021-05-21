using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SmartTool_API.Models
{
    public partial class Model
    {
[Key]
[StringLength(50)]
public string factory_id { get; set; }
[Key]
[StringLength(8)]
public string model_no { get; set; }
[Required]
[StringLength(200)]
public string model_name { get; set; }
[Required]
[StringLength(5)]
public string model_type_id { get; set; }
[StringLength(50)]
public string model_family { get; set; }
[Required]
[StringLength(10)]
public string upper_id { get; set; }
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
[Required]
[StringLength(200)]
public string model_picture { get; set; }
public bool is_active { get; set; }
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
