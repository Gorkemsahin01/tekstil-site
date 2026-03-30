using System.Threading.Tasks;
using Volo.Abp.Application.Services;

namespace Samplify.Public;

public interface ISamplifyPublicAppService : IApplicationService
{
  Task<SamplifyPublicInfoDto> GetInfoAsync();
}
