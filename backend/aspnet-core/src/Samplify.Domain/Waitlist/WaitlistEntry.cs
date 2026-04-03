using System;
using Volo.Abp.Domain.Entities.Auditing;

namespace Samplify.Waitlist;

/// <summary>
/// Bekleme listesi başvurusu — iletişim formundan gelen kayıtları saklar.
/// </summary>
public class WaitlistEntry : CreationAuditedEntity<Guid>
{
    public virtual string FullName { get; set; } = string.Empty;

    public virtual string? Company { get; set; }

    public virtual string Email { get; set; } = string.Empty;

    protected WaitlistEntry()
    {
    }

    public WaitlistEntry(Guid id, string fullName, string email, string? company = null)
        : base(id)
    {
        FullName = fullName;
        Email = email;
        Company = company;
    }
}
