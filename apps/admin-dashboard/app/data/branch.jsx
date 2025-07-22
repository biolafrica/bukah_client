export const branch = {
  columns :[
    { key: 'name',header: 'Name', minWidth: '150px' },
    { key: 'phone',header: 'Phone', minWidth: '150px' },
    { key: 'address',header: 'Address', minWidth: '300px' },
    { key:'created_at', header:'Date Added', minWidth: '150px',
      render: row => new Date(row.created_at).toLocaleDateString('en-GB')
    },
    { key:'is_active', header: 'Status', minWidth: '100px',
      render: row => {
        const cls   = row.is_active
          ? 'bg-green-100 text-green-800'
          : 'bg-red-100 text-red-800'
        const label = row.is_active ? 'Active' : 'Inactive'
        return (
          <span
            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${cls}`}
          >
            {label}
          </span>
        )
      }
    },
  ],

  AddBranches(){
    return[
      { name: 'branchName', label: 'Branch Name', placeholder:"Enter branch name", type: 'text', required: true },

      { name: 'address', label: 'Address', placeholder:"Enter branch address", type: 'text', required: true },

      { name: 'phone', label: 'Phone', placeholder:"Enter assigned phone", type: 'text', required: true },

      { name: 'supervisor', label: 'Supervisor', type: 'select',
        options: [
          { value: '', label: 'Choose staff ' },
          { value: '1',  label: 'Taye' },
          { value: '2', label: 'Olalade' },
        ],
        required:false  
      },

      { name: 'offerPickup', label: 'Offer Pickup?', type: 'select',
        options: [
          { value: '', label: 'Choose ' },
          { value: 'true',  label: 'Yes' },
          { value: 'false', label: 'No' },
        ],
        required:false  
      },

      { name: 'pickUpCharges', label: 'Pick Up Charges', placeholder:"Enter charges fee", type: 'number', required: false},

      { name: 'offerEatIn', label: 'Offer Eat In?', type: 'select',
        options: [
          { value: '', label: 'Choose' },
          { value: 'true',  label: 'Yes' },
          { value: 'false', label: 'No' },
        ],
        required:false  
      },

      { name: 'eatInCharges', label: 'Eat In Charges', placeholder:"Enter charges fee", type: 'number', required: false},

      { name: 'isActive', label: 'Active?', type: 'select',
        options: [
          { value: '', label: 'Choose branch state'},
          { value: 'true',  label: 'Active' },
          { value: 'false', label: 'Inactive' },
        ],
        required:true  
      },

    ]
  }
}