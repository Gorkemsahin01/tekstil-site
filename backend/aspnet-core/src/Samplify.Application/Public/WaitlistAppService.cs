using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Volo.Abp.Emailing;

namespace Samplify.Public;

/// <summary>
/// İletişim / bekleme listesi formu — gönderimler yapılandırılmış alıcı e-postasına iletilir (varsayılan: info@samplify.tr).
/// </summary>
[AllowAnonymous]
public class WaitlistAppService : SamplifyAppService, IWaitlistAppService
{
  private readonly IEmailSender _emailSender;
  private readonly IConfiguration _configuration;

  public WaitlistAppService(IEmailSender emailSender, IConfiguration configuration)
  {
    _emailSender = emailSender;
    _configuration = configuration;
  }

  public virtual async Task SubmitAsync(SubmitWaitlistInput input)
  {
    var to = _configuration["Waitlist:RecipientEmail"]?.Trim();
    if (string.IsNullOrEmpty(to))
    {
      to = "info@samplify.tr";
    }

    var subject = $"[Samplify.tr] Bekleme listesi — {input.FullName}";
    var body = new StringBuilder()
      .AppendLine("Yeni bekleme listesi başvurusu")
      .AppendLine()
      .AppendLine($"Ad Soyad: {input.FullName}")
      .AppendLine($"Firma: {input.Company ?? "—"}")
      .AppendLine($"E-posta: {input.Email}")
      .AppendLine()
      .Append("(Bu ileti samplify.tr iletişim formundan gönderilmiştir.)")
      .ToString();

    Logger.LogInformation("Waitlist submit to {Recipient} from {Email}", to, input.Email);

    await _emailSender.SendAsync(to, subject, body);
  }
}
