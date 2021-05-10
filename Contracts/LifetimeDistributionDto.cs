using System.Collections.Generic;

namespace ABTestTask.Contracts
{
    public class LifetimeDistributionDto
    {
        public int SampleSize { get; set; }
        public Dictionary<int, int> Distribution { get; set; }
    }
}
