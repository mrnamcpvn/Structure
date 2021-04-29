using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SmartTool_API.Models
{
    public class VW_RFTAVG
    {
        [Required]
        [StringLength(50)]
        public string factory_id { get; set; }
        [Required]
        [StringLength(8)]
        public string model_no { get; set; }
        [Column(TypeName = "numeric(5, 2)")]
        public double? CR2 { get; set; }
        [Column(TypeName = "numeric(5, 2)")]
        public double? SMS { get; set; }
        [Column(TypeName = "numeric(5, 2)")]
        public double? CS1 { get; set; }
        [Column(TypeName = "numeric(5, 2)")]
        public double? CS2 { get; set; }
        [Column(TypeName = "numeric(5, 2)")]
        public double? CS3 { get; set; }
        [Column(TypeName = "numeric(5, 2)")]
        public double? PROD1 { get; set; }
        [Column(TypeName = "numeric(5, 2)")]
        public double? PROD2 { get; set; }
        [Column(TypeName = "numeric(5, 2)")]
        public double? MP1 { get; set; }
        [Column(TypeName = "numeric(5, 2)")]
        public double? MP2 { get; set; }
        [Column(TypeName = "numeric(5, 2)")]
        public double? MP3 { get; set; }
    }
}