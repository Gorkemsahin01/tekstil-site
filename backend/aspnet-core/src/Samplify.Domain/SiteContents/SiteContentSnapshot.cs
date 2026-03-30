using System;
using Volo.Abp.Domain.Entities.Auditing;

namespace Samplify.SiteContents;

/// <summary>
/// Tek satırlık site metinleri (JSON blob). React <c>SiteContent</c> ile aynı şema.
/// </summary>
public class SiteContentSnapshot : AuditedAggregateRoot<Guid>
{
  public const string SingletonIdString = "00000000-0000-0000-0000-000000000001";

  public static readonly Guid SingletonId = Guid.Parse(SingletonIdString);

  public virtual string ContentJson { get; protected set; } = "{}";

  protected SiteContentSnapshot()
  {
  }

  public SiteContentSnapshot(Guid id, string contentJson) : base(id)
  {
    ContentJson = contentJson;
  }

  public void SetContentJson(string json)
  {
    ContentJson = json;
  }
}
