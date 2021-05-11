using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace ABTestTask.Models
{
    public class UserActivity
    {
        [Column("id")]
        public int ID { get; set; }
        [Column("user_id")]
        public int UserId { get; set; }
        [Column("date_registration")]
        public DateTime DateReg { get; set; }
        [Column("date_last_activity")]
        public DateTime DateLastAct { get; set; }
        [Column("lifetime")]
        public int Lifetime { get; private set; }
    }
}
