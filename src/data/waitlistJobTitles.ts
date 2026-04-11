/** Backend `WaitlistJobTitle` seed ile aynı kodlar — API kapalıyken fallback. */
export type WaitlistJobTitleRow = {
  code: string;
  nameTr: string;
  nameEn: string;
};

export const WAITLIST_JOB_TITLE_ROWS: WaitlistJobTitleRow[] = [
  { code: 'merchandiser', nameTr: 'Müşteri Temsilcisi', nameEn: 'Merchandiser' },
  { code: 'pattern-maker', nameTr: 'Modelist', nameEn: 'Pattern Maker' },
  { code: 'sample-room-manager', nameTr: 'Modelhane Yöneticisi', nameEn: 'Sample Room Manager' },
  { code: 'production-manager', nameTr: 'Üretim Müdürü', nameEn: 'Production Manager' },
  { code: 'sample-machinist', nameTr: 'Model Makineci', nameEn: 'Sample Machinist' },
  {
    code: 'quality-manager',
    nameTr: 'Kalite Kontrol Yöneticisi',
    nameEn: 'Quality Manager (QC)',
  },
  { code: 'planning-manager', nameTr: 'Planlama Yöneticisi', nameEn: 'Planning Manager' },
  { code: 'company-owner', nameTr: 'Firma Sahibi', nameEn: 'Company Owner' },
  { code: 'factory-manager', nameTr: 'Fabrika Yöneticisi', nameEn: 'Factory Manager' },
];

export type WaitlistJobTitleOption = { code: string; name: string };

export function waitlistJobTitleOptionsForLocale(locale: 'tr' | 'en'): WaitlistJobTitleOption[] {
  return WAITLIST_JOB_TITLE_ROWS.map((r) => ({
    code: r.code,
    name: locale === 'en' ? r.nameEn : r.nameTr,
  }));
}

export function waitlistJobTitleLabelForMail(
  code: string,
  locale: 'tr' | 'en'
): string {
  const row = WAITLIST_JOB_TITLE_ROWS.find((r) => r.code === code);
  if (!row) return code;
  if (locale === 'en') {
    return `${row.nameEn} (${row.nameTr})`;
  }
  return `${row.nameTr} (${row.nameEn})`;
}
