using System.Threading.Tasks;
using Volo.Abp.Application.Services;

namespace Samplify.Public;

public interface IWaitlistAppService : IApplicationService
{
  Task SubmitAsync(SubmitWaitlistInput input);
}
