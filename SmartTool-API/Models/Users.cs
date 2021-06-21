using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SmartTool_API.Models
{
    public partial class Users
    {
[Key]
[StringLength(50)]
public string account { get; set; }
[Required]
[StringLength(50)]
public string password { get; set; }
[Required]
[StringLength(50)]
public string name { get; set; }
[Required]
[StringLength(50)]
public string email { get; set; }
public bool is_active { get; set; }
[Required]
[StringLength(50)]
public string update_by { get; set; }
[Column(TypeName = "datetime")]
public DateTime update_time { get; set; }
    }
}
