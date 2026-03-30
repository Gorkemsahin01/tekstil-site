using Samplify.Samples;
using Xunit;

namespace Samplify.EntityFrameworkCore.Domains;

[Collection(SamplifyTestConsts.CollectionDefinitionName)]
public class EfCoreSampleDomainTests : SampleDomainTests<SamplifyEntityFrameworkCoreTestModule>
{

}
