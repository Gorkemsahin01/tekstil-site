using Volo.Abp.Modularity;

namespace Samplify;

/* Inherit from this class for your domain layer tests. */
public abstract class SamplifyDomainTestBase<TStartupModule> : SamplifyTestBase<TStartupModule>
    where TStartupModule : IAbpModule
{

}
