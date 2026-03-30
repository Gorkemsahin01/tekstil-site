type Props = {
  label: string;
  value: string;
  onChange: (v: string) => void;
  multiline?: boolean;
  hint?: string;
};

export default function AdminField({ label, value, onChange, multiline, hint }: Props) {
  const inputClass =
    'w-full rounded-xl border border-gray-200 bg-gray-50/80 px-4 py-3 text-[15px] text-gray-900 shadow-sm transition placeholder:text-gray-400 focus:border-brand-300 focus:bg-white focus:outline-none focus:ring-4 focus:ring-brand-500/10';

  return (
    <label className="group block">
      <span className="mb-2 block text-sm font-medium text-gray-800">{label}</span>
      {multiline ? (
        <textarea
          className={`${inputClass} min-h-[120px] resize-y leading-relaxed`}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          rows={4}
        />
      ) : (
        <input
          type="text"
          className={inputClass}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      )}
      {hint && <p className="mt-1.5 text-xs text-gray-500">{hint}</p>}
    </label>
  );
}
