using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Volo.Abp.Data;
using Volo.Abp.DependencyInjection;
using Volo.Abp.Domain.Repositories;
using Volo.Abp.Guids;
using Volo.Abp.Uow;

namespace Samplify.Waitlist;

public class WaitlistJobTitleDataSeedContributor : IDataSeedContributor, ITransientDependency
{
  private readonly IRepository<WaitlistJobTitle, Guid> _repository;
  private readonly IGuidGenerator _guidGenerator;

  public WaitlistJobTitleDataSeedContributor(
    IRepository<WaitlistJobTitle, Guid> repository,
    IGuidGenerator guidGenerator)
  {
    _repository = repository;
    _guidGenerator = guidGenerator;
  }

  [UnitOfWork]
  public virtual async Task SeedAsync(DataSeedContext context)
  {
    if (await _repository.GetCountAsync() > 0)
    {
      return;
    }

    var order = 0;
    foreach (var row in BuildRows())
    {
      order++;
      var entity = new WaitlistJobTitle(
        _guidGenerator.Create(),
        row.Code,
        row.NameTr,
        row.NameEn,
        order);
      await _repository.InsertAsync(entity, autoSave: true);
    }
  }

  private static IEnumerable<(string Code, string NameTr, string NameEn)> BuildRows()
  {
    yield return ("merchandiser", "Müşteri Temsilcisi", "Merchandiser");
    yield return ("pattern-maker", "Modelist", "Pattern Maker");
    yield return ("sample-room-manager", "Modelhane Yöneticisi", "Sample Room Manager");
    yield return ("production-manager", "Üretim Müdürü", "Production Manager");
    yield return ("sample-machinist", "Model Makineci", "Sample Machinist");
    yield return ("quality-manager", "Kalite Kontrol Yöneticisi", "Quality Manager (QC)");
    yield return ("planning-manager", "Planlama Yöneticisi", "Planning Manager");
    yield return ("company-owner", "Firma Sahibi", "Company Owner");
    yield return ("factory-manager", "Fabrika Yöneticisi", "Factory Manager");
  }
}
