using Samplify.Samples;
using Xunit;

namespace Samplify.EntityFrameworkCore.Applications;

[Collection(SamplifyTestConsts.CollectionDefinitionName)]
public class EfCoreSampleAppServiceTests : SampleAppServiceTests<SamplifyEntityFrameworkCoreTestModule>
{

}
