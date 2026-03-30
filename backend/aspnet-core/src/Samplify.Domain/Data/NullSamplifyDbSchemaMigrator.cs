using System.Threading.Tasks;
using Volo.Abp.DependencyInjection;

namespace Samplify.Data;

/* This is used if database provider does't define
 * ISamplifyDbSchemaMigrator implementation.
 */
public class NullSamplifyDbSchemaMigrator : ISamplifyDbSchemaMigrator, ITransientDependency
{
    public Task MigrateAsync()
    {
        return Task.CompletedTask;
    }
}
