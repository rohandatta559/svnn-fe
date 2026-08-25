export default function SpecTable({ specs }) {
  if (!specs || specs.length === 0) return null;

  return (
    <div className="mt-8">
      <h2 className="font-display text-xl text-choco">Packing Specifications</h2>
      <div className="mt-3 overflow-hidden overflow-x-auto rounded-xl border border-choco/10">
        <table className="w-full min-w-[420px] text-left text-sm">
          <thead>
            <tr className="border-b border-choco/10">
              <th className="px-4 py-3 font-semibold text-brand-red">SKU</th>
              <th className="px-4 py-3 font-semibold text-brand-red">Net Wt</th>
              <th className="px-4 py-3 font-semibold text-brand-red">Units</th>
              <th className="px-4 py-3 font-semibold text-brand-red">Packs / Carton</th>
            </tr>
          </thead>
          <tbody>
            {specs.map((s, i) => (
              <tr key={s.sku + i} className={i !== specs.length - 1 ? "border-b border-choco/10" : ""}>
                <td className="px-4 py-3 text-choco">{s.sku}</td>
                <td className="px-4 py-3 text-choco/80">{s.netWeight}</td>
                <td className="px-4 py-3 text-choco/80">{s.units}</td>
                <td className="px-4 py-3 text-choco/80">{s.packsPerCarton}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
