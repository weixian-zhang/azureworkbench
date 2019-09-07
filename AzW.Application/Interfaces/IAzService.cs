using AzW.Secret;

namespace AzW.Application
{
    public interface IAzService
    {
        IAzService Auth(AzSecret secret);

        public IARMService ArmService { get; set; }

        public IComputeService ComputeService { get; set; }

        public IDeployService DeployService { get; set; }
    }
}