using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.Extensions.Hosting;

namespace Samplify.Public;

/// <summary>
/// Kimlik doğrulaması gerektirmeyen örnek uç nokta — ABP ApplicationService kalıbı.
/// </summary>
[AllowAnonymous]
public class SamplifyPublicAppService : SamplifyAppService, ISamplifyPublicAppService
{
  private readonly IHostEnvironment _hostEnvironment;

  public SamplifyPublicAppService(IHostEnvironment hostEnvironment)
  {
    _hostEnvironment = hostEnvironment;
  }

  public Task<SamplifyPublicInfoDto> GetInfoAsync()
  {
    var dto = new SamplifyPublicInfoDto
    {
      Environment = _hostEnvironment.EnvironmentName,
      ApiAssemblyVersion = typeof(SamplifyPublicAppService).Assembly.GetName().Version?.ToString(),
    };
    return Task.FromResult(dto);
  }
}
