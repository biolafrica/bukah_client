import { menu } from "../data/menu"
import { useBranchOptions } from "./useBranchOptions"
import { useCategoryOptions } from "./useCategoryOptions"
import { useSingleItemsOptions } from "./useSingleItemsOptions"

export function useMenuOptions() {
  const branchQ   = useBranchOptions()
  const categoryQ = useCategoryOptions()
  const itemQ = useSingleItemsOptions()

  const addSingleItemFormFields = menu.itemFormFields(categoryQ.data || [], branchQ.data ||[] )

  return {
    branchOptions:   branchQ.data ?? [],
    categoryOptions: categoryQ.data ?? [],
    singleItemOptions: itemQ.data ?? [],
    addSingleItemFormFields,
    loading:  branchQ.isLoading || categoryQ.isLoading,
    error:    branchQ.error   || categoryQ.error,
  }
   
}




