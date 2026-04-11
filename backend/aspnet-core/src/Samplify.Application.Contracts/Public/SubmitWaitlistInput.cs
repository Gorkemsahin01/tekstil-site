using System.ComponentModel.DataAnnotations;

namespace Samplify.Public;

public class SubmitWaitlistInput
{
  [Required]
  [StringLength(200)]
  public string FullName { get; set; } = string.Empty;

  [StringLength(300)]
  public string? Company { get; set; }

  [Required]
  [EmailAddress]
  [StringLength(256)]
  public string Email { get; set; } = string.Empty;

  /// <summary>Bekleme listesi — cep / iş telefonu (uluslararası formatta da olabilir).</summary>
  [StringLength(50)]
  public string? Phone { get; set; }

  /// <summary>Lookup tablosundaki görev kodu (ör. merchandiser).</summary>
  [Required]
  [StringLength(64)]
  public string JobTitleCode { get; set; } = string.Empty;
}
