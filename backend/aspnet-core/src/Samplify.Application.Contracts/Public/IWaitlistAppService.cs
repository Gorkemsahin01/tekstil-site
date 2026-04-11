using System.Collections.Generic;
using System.Threading.Tasks;
using Volo.Abp.Application.Services;

namespace Samplify.Public;

public interface IWaitlistAppService : IApplicationService
{
  Task<List<WaitlistJobTitleDto>> GetJobTitlesAsync();

  Task SubmitAsync(SubmitWaitlistInput input);
}
