using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Samplify.Waitlist;
using Volo.Abp.Domain.Repositories;
using Volo.Abp.Emailing;
using Volo.Abp;

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
  private readonly IRepository<WaitlistJobTitle, Guid> _jobTitleRepository;

  public WaitlistAppService(
    IEmailSender emailSender,
    IConfiguration configuration,
    IRepository<WaitlistEntry, Guid> waitlistRepository,
    IRepository<WaitlistJobTitle, Guid> jobTitleRepository)
  {
    _emailSender = emailSender;
    _configuration = configuration;
    _waitlistRepository = waitlistRepository;
    _jobTitleRepository = jobTitleRepository;
  }

  public virtual async Task<List<WaitlistJobTitleDto>> GetJobTitlesAsync()
  {
    var list = await _jobTitleRepository.GetListAsync(x => x.IsActive);
    var ordered = list.OrderBy(x => x.DisplayOrder).ToList();
    var isEn = CultureInfo.CurrentUICulture.TwoLetterISOLanguageName.Equals("en", StringComparison.OrdinalIgnoreCase);
    return ordered
      .Select(x => new WaitlistJobTitleDto
      {
        Code = x.Code,
        Name = isEn ? x.NameEn : x.NameTr,
      })
      .ToList();
  }

  public virtual async Task SubmitAsync(SubmitWaitlistInput input)
  {
    var code = input.JobTitleCode.Trim();
    var title = await _jobTitleRepository.FirstOrDefaultAsync(x => x.Code == code && x.IsActive);
    if (title == null)
    {
      throw new UserFriendlyException(
        CultureInfo.CurrentUICulture.TwoLetterISOLanguageName.Equals("en", StringComparison.OrdinalIgnoreCase)
          ? "Please select a valid job title."
          : "Lütfen geçerli bir görev seçin.");
    }

    var entry = new WaitlistEntry(
      GuidGenerator.Create(),
      input.FullName,
      input.Email,
      input.Company
    );
    await _waitlistRepository.InsertAsync(entry);

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
      .AppendLine($"Görev / Title: {title.NameTr} — {title.NameEn}")
      .AppendLine($"E-posta: {input.Email}")
      .AppendLine($"Telefon: {input.Phone?.Trim() ?? "—"}")
      .AppendLine()
      .Append("(Bu ileti samplify.tr iletişim formundan gönderilmiştir.)")
      .ToString();

    Logger.LogInformation(
      "Waitlist submit to {Recipient} from {Email} phone {Phone} job {JobCode}",
      to,
      input.Email,
      input.Phone ?? "—",
      title.Code);

    await _emailSender.SendAsync(to, subject, body);

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
