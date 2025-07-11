
export default function EmptyState({
  icon: Icon,
  title,
  description,
  actionLabel,
  onAction,
}) {
  return (
    <div className="flex flex-col items-center justify-center p-10 text-center text-gray-500">

      {Icon && <Icon className="w-12 h-12 mb-4 text-gray-300" aria-hidden="true" />}

      <h3 className="text-lg font-medium text-gray-700">{title}</h3>

      <p className="mt-2">{description}</p>

      {actionLabel && onAction && (
        <button
          type="button"
          onClick={onAction}
          className="mt-6 inline-flex items-center px-4 py-2 bg-primary text-on-primary rounded-md hover:bg-primary-container transition-colors"
        >
          {actionLabel}
        </button>
      )}

    </div>
  )
}