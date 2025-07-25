import { transformTerminal } from "../lib/transformer";
import { useCrud } from "./useResource";

export function useTerminals() {
  return useCrud({
    resourceKey: 'terminals',
    baseUrl: '/api/terminals',
    transform: transformTerminal,
  })
}