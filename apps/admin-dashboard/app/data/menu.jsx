import { formatNaira } from "../utils/format"

export const menu = {
  sortOptions : [
    { key: "name", label: "Name" },
  ],

  categoriesColumns :[
    { key: 'name', header: 'Name', minWidth: '200px' },
    { key: 'description', header: 'Description', minWidth: '700px' },
  ],

  itemsColumn : [
    { key: 'name', header: 'Name', minWidth: '150px' },
    { key: 'category', header: 'Category', minWidth: '150px', render: row => row.category?.name ?? '-' },
    { key: 'description', header: 'Description', minWidth: '300px' },
    { key: 'price', header: 'Price', minWidth: '150px',  render: row => formatNaira(row.price) },
    { key: 'branch', header: 'Branch', minWidth: '150px', render: row => row.branch?.name ?? '-' },
  ],

  segment: [
    { key: 'items', label: 'Items' },
    { key: 'categories', label: 'Categories' },
  ],

  config(branchOptions,categoryOptions){
    return [
      { key:'branch',   label:'Branch',   type:'select', options: branchOptions },
      { key:'category', label:'Category', type:'select', options: categoryOptions },
    ]
  }

}
