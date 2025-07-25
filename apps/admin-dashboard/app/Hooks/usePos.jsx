import { transformPos } from "../lib/transformer";
import { useCrud } from "./useResource";


export function usePos() {
  return useCrud({
    resourceKey: 'pos',
    baseUrl: '/api/pos',
    transform: transformPos,
  })
}