using System.Collections.Generic;

namespace ABTestTask.Contracts
{
    public class CalculatedDataDto
    {
        public double RollingRetention { get; set; }
        public int SampleSize { get; set; }
        public Dictionary<int, int> Distribution { get; set; }
    }
}
