import { formatNaira } from "../utils/format"

export const menu = {
  config : [
    {
      key: 'branch',
      label: 'Branch',
      type: 'select',
      options: [
        { value: '', label: 'All Branches' },
        { value: 'branchA', label: 'Branch A' },
        { value: 'branchB', label: 'Branch B' },
        { value: 'branchC', label: 'Branch C' },
      ],
    },
    {
      key: 'category',
      label: 'Category',
      type: 'select',
      options: [
        { value: '', label: 'All Categories' },
        { value: 'main', label: 'Main' },
        { value: 'breakfast', label: 'Breakfast' },
        { value: 'dinner', label: 'Dinner' },
      ],
    },
  ],

  descriptionColumns :[
    { key: 'category', header: 'Category', minWidth: '200px' },
    { key: 'description', header: 'Description', minWidth: '700px' },
  ],

  descriptionData :[
    {
      id: 1,
      category: 'Main',
      description: 'Lorem ipsum dolor sit amet consectetur. Sed proin sed eget risus morbi risus rhoncus sollicitudin.',
    },
    {
      id: 2,
      category: 'Rice',
      description: 'Lorem ipsum dolor sit amet consectetur. Sed proin sed eget risus morbi risus rhoncus sollicitudin.',
    },
    {
      id: 3,
      category: 'Drink',
      description: 'Lorem ipsum dolor sit amet consectetur. Sed proin sed eget risus morbi risus rhoncus sollicitudin.',
    },
    {
      id: 4,
      category: 'Spagetti',
      description: 'Lorem ipsum dolor sit amet consectetur. Sed proin sed eget risus morbi risus rhoncus sollicitudin.',
    },
    
  ],

  itemsColumn : [
    { key: 'name', header: 'Name', minWidth: '150px' },
    { key: 'category', header: 'Category', minWidth: '150px' },
    { key: 'description', header: 'Description', minWidth: '300px' },
    { key: 'amount', header: 'Amount', minWidth: '150px' },
    { key: 'branch', header: 'Branch', minWidth: '150px' },
  ],

  itemsData: [
    {
      id: 1,
      name: 'Spagetti Stir Fry',
      category: 'Main',
      description: 'Spagetti Stir Fry',
      amount: formatNaira(2000),
      branch: 'Branch A',
    },
    {
      id: 2,
      name: 'Spagetti Stir Fry',
      category: 'Main',
      description: 'Spagetti Stir Fry',
      amount: formatNaira(5000),
      branch: 'Branch A',
    },

  ],

  segment: [
    { key: 'items', label: 'Items' },
    { key: 'categories', label: 'Categories' },
  ]

}