export default function SectionTitle({
  badge,
  title,
  description,
}) {
  return (
    <div className="mx-auto mb-14 max-w-3xl text-center">
      
      {/* BADGE */}
      <div className="mb-4 inline-flex rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-sm font-medium text-blue-700">
        {badge}
      </div>

      {/* TITLE */}
      <h2 className="font-heading text-4xl font-bold leading-tight text-slate-900 lg:text-5xl">
        {title}
      </h2>

      {/* DESCRIPTION */}
      <p className="mt-5 text-lg leading-8 text-gray-600">
        {description}
      </p>
    </div>
  );
}