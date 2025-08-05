"use client"

export default function ConfirmBanner({
  open,
  title,
  message,
  onCancel,
  onConfirm,
  confirmText = 'Confirm',
  cancelText  = 'Cancel',
  variant     = 'default',
}) {

  if (!open) return null

  let confirmClasses = 'btn btn-filled'
  switch (variant) {
    case 'danger':
      confirmClasses += ' bg-red-600 text-white hover:bg-red-700'
      break
    case 'warning':
      confirmClasses += ' bg-yellow-500 text-white hover:bg-yellow-600'
      break
    default:
      confirmClasses += ' bg-green-600 text-white hover:bg-green-700'
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-gray-300 bg-opacity-50 p-4"
      onClick={onCancel}
    >
      <div
        className="bg-white rounded-2xl shadow-lg max-w-lg w-full p-6 "
        onClick={e => e.stopPropagation()}
      >
        <h4 className="text-lg font-semibold mb-4 border-b border-border-text pb-2">{title}</h4>
        <p className="text-base text-sec-text mb-6">{message}</p>
        <div className="flex justify-end gap-3">
          <button
            type="button"
            className="btn btn-outlined text-gray-700 border-gray-300 hover:bg-gray-100"
            onClick={onCancel}
          >
            {cancelText}
          </button>
          <button
            type="button"
            className={confirmClasses}
            onClick={onConfirm}
          >
            {confirmText}
          </button>
        </div>
      </div>

    </div>
  )
}