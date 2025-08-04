'use client'

import CloseButton from '../../common/closeButton'
import ClientAddItemInner from './clientAddItemInner'

export default function AddItems({onClose, data}){
  
  return(

    <div className='w-screen lg:w-1/2 fixed right-0 h-screen bg-white overflow-y-auto'>

      <CloseButton 
        title={data ? 'Edit Items' : 'Add Items'}
        onCancelClick={onClose}
      />
      
      <ClientAddItemInner data={data}/>

    </div>
  
  )
}