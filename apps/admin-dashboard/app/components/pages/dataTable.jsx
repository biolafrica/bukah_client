import * as solid from '@heroicons/react/24/solid'
import TableFooter from './tableFooter'

export default function DataTable({ columns, data, onEdit, onDelete }) {
  return (
    <div className="w-full h-fit overflow-auto bg-white rounded-lg border border-border-text">

      <table className="min-w-full text-sm">

        <thead className="border-b border-border-text bg-white">
          <tr>
            {columns.map((col, idx) => (
              <th
                key={col.key}
                className={`px-4 py-3 text-left font-light text-sec-text truncate ${
                  idx === 0 ? 'sticky left-0 z-50 bg-white' : ''
                } ${col.minWidth ? `min-w-[${col.minWidth}]` : 'min-w-[150px]'}`}
              >
                {col.header}
              </th>
            ))}
            <th className="min-w-[80px] px-4 py-3 text-left font-light text-sec-text">
              Actions
            </th>
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-200">
          {data.map((row, rowIndex) => (
            <tr key={row.id || rowIndex} className="hover:bg-gray-50 transition-colors">
              {columns.map((col, idx) => (
                <td
                  key={col.key}
                  className={`px-4 py-3 truncate ${
                    idx === 0
                      ? 'sticky left-0 z-40 bg-white shadow-r-sm'
                      : 'text-gray-900'
                  }`}
                  style={col.minWidth ? { minWidth: col.minWidth } : {}}
                >
                  {col.render ? col.render(row) : row[col.key]}
                </td>
              ))}
              <td className="px-4 py-3 flex items-center gap-2">
                <button type="button" onClick={() => onEdit(row)} aria-label="Edit">
                  <solid.PencilIcon className="w-5 h-5 text-green-600" aria-hidden="true" />
                </button>
                <button type="button" onClick={() => onDelete(row)} aria-label="Delete">
                  <solid.TrashIcon className="w-5 h-5 text-red-600" aria-hidden="true" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <TableFooter/>
    </div>
  )
}