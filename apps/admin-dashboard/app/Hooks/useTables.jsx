import { transformTable } from '../lib/transformer'
import { useCrud } from './useResource'



export function useTables() {
  return useCrud({
    resourceKey: 'tables',
    baseUrl: '/api/tables',
    transform: transformTable,
  })
}
