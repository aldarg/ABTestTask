using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ABTestTask.Contracts
{
    public class RollingRetentionDataDto
    {
        public DateTime Day { get; set; }
        public double RollingRetention { get; set; }
    }
}
