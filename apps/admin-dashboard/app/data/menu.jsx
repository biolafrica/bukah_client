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
  },

  itemFormFields(categoryOptions, branchOptions){
     return[
      { name: 'itemName', label: 'Item Name', placeholder:"Enter item name", type: 'text', required: true },
      { name: 'description', label: 'Description', placeholder:"Describe the item", type: 'textarea', required: true, rows:3 },
      { name: 'price', label: 'Price(&#8358;)', placeholder:"0.00", type: 'number', required: true,},
      { name: 'category', label: 'Category', type: 'select',
        options: [
          { value: '', label: 'Choose category' },
          ...categoryOptions.map(category => ({
            value: category.value,
            label: category.label
          }))
          
        ],
      required: true  
      },

      { name: 'branch', label: 'Branch', type: 'select',
        options: [
          { value: '', label: 'Choose branch' },
          ...branchOptions.map(branch => ({
            value: branch.value,
            label: branch.label
          }))
          
        ],
      required: true  
      },

      { name: 'cookingTime', label: 'Cooking Time(minutes)', placeholder:"How long does it take to prepare?", type: 'text', required: false},
      { name: 'ingredient', label: '  Ingredient', placeholder:"What are the ingredient used?", type: 'text', required: false},
    ];

  },

}
