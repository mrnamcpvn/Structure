using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SmartTool_API.Models
{
    public partial class Factory
    {
[Key]
[StringLength(50)]
public string factory_id { get; set; }
[Required]
[StringLength(50)]
public string factory_name { get; set; }
[Required]
[StringLength(50)]
public string customer_name { get; set; }
[Required]
[StringLength(50)]
public string location { get; set; }
    }
}
