using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ABTestTask.Models
{
    public class UserActivity
    {
        [Key]
        [Column("id")]
        public int ID { get; set; }
        [Required]
        [Column("user_id")]
        public int UserId { get; set; }
        [Required]
        [Column("date_registration")]
        public DateTime DateReg { get; set; }
        [Required]
        [Column("date_last_activity")]
        public DateTime DateLastAct { get; set; }
        [Required]
        [Column("lifetime")]
        public int Lifetime { get; private set; }
    }
}
