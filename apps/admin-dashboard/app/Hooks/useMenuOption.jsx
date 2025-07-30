import { useBranchOptions } from "./useBranchOptions"
import { useCategoryOptions } from "./useCategoryOptions"
import { useSingleItemsOptions } from "./useSingleItemsOptions"

export function useMenuOptions() {
  const branchQ   = useBranchOptions()
  const categoryQ = useCategoryOptions()
  const itemQ = useSingleItemsOptions()

  return {
    branchOptions:   branchQ.data ?? [],
    categoryOptions: categoryQ.data ?? [],
    singleItemOptions: itemQ.data ?? [],
    loading:  branchQ.isLoading || categoryQ.isLoading,
    error:    branchQ.error   || categoryQ.error,
  }
}




