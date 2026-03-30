using Xunit;

namespace Samplify.EntityFrameworkCore;

[CollectionDefinition(SamplifyTestConsts.CollectionDefinitionName)]
public class SamplifyEntityFrameworkCoreCollection : ICollectionFixture<SamplifyEntityFrameworkCoreFixture>
{

}
