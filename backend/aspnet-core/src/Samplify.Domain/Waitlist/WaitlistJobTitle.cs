using System;
using Volo.Abp.Domain.Entities;

namespace Samplify.Waitlist;

/// <summary>
/// Bekleme listesi formunda seçilen görev / unvan — lookup tablosu.
/// </summary>
public class WaitlistJobTitle : Entity<Guid>
{
  public virtual string Code { get; set; } = default!;

  public virtual string NameTr { get; set; } = "";

  public virtual string NameEn { get; set; } = "";

  public virtual int DisplayOrder { get; set; }

  public virtual bool IsActive { get; set; } = true;

  protected WaitlistJobTitle()
  {
  }

  public WaitlistJobTitle(
    Guid id,
    string code,
    string nameTr,
    string nameEn,
    int displayOrder,
    bool isActive = true) : base(id)
  {
    Code = code;
    NameTr = nameTr;
    NameEn = nameEn;
    DisplayOrder = displayOrder;
    IsActive = isActive;
  }
}
