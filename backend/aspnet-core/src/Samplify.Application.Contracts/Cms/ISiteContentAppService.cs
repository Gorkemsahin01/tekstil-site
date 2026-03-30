using System.Threading.Tasks;
using Volo.Abp.Application.Services;

namespace Samplify.Cms;

public interface ISiteContentAppService : IApplicationService
{
  Task<SiteContentDto> GetAsync();

  Task<SiteContentDto> UpdateAsync(UpdateSiteContentInput input);
}
