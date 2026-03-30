using Volo.Abp.Modularity;

namespace Samplify;

public abstract class SamplifyApplicationTestBase<TStartupModule> : SamplifyTestBase<TStartupModule>
    where TStartupModule : IAbpModule
{

}
