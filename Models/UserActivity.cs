﻿using System;

namespace ABTestTask.Models
{
    public class UserActivity
    {
        public int ID { get; set; }
        public int UseId { get; set; }
        public DateTime DateReg { get; set; }
        public DateTime DateLastAct { get; set; }
    }
}