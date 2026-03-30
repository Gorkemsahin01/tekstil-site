using System.Threading.Tasks;

namespace Samplify.Data;

public interface ISamplifyDbSchemaMigrator
{
    Task MigrateAsync();
}
