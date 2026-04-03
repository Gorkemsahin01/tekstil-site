using System;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Samplify.Waitlist;
using Volo.Abp.Domain.Repositories;
using Volo.Abp.Emailing;

namespace Samplify.Public;

/// <summary>
/// İletişim / bekleme listesi formu — gönderimler veritabanına kaydedilir ve yapılandırılmış alıcı e-postasına iletilir.
/// </summary>
[AllowAnonymous]
public class WaitlistAppService : SamplifyAppService, IWaitlistAppService
{
  private readonly IEmailSender _emailSender;
  private readonly IConfiguration _configuration;
  private readonly IRepository<WaitlistEntry, Guid> _waitlistRepository;

  public WaitlistAppService(
    IEmailSender emailSender,
    IConfiguration configuration,
    IRepository<WaitlistEntry, Guid> waitlistRepository)
  {
    _emailSender = emailSender;
    _configuration = configuration;
    _waitlistRepository = waitlistRepository;
  }

  public virtual async Task SubmitAsync(SubmitWaitlistInput input)
  {
    // Veritabanına kaydet
    var entry = new WaitlistEntry(
      GuidGenerator.Create(),
      input.FullName,
      input.Email,
      input.Company
    );
    await _waitlistRepository.InsertAsync(entry);

    // Email gönder
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

    // Bildirim maili (info@samplify.tr'ye)
    await _emailSender.SendAsync(to, subject, body);

    // Başvurana onay maili
    var confirmSubject = "Samplify.tr — Bekleme listesine kaydınız alındı";
    var confirmBody = new StringBuilder()
      .AppendLine($"Merhaba {input.FullName},")
      .AppendLine()
      .AppendLine("Bekleme listesine kaydınız başarıyla alınmıştır.")
      .AppendLine("En kısa sürede sizinle iletişime geçeceğiz.")
      .AppendLine()
      .AppendLine("Teşekkür ederiz,")
      .Append("Samplify.tr Ekibi")
      .ToString();

    await _emailSender.SendAsync(input.Email, confirmSubject, confirmBody);
  }
}
