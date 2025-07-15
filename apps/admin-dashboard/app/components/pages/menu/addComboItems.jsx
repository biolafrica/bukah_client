import CloseButton from "../../common/closeButton";
import ComboItemForm from "./comboItemsForm";

export default function AddComboItems(){
  return(
    <div className='w-screen lg:w-1/2 fixed right-0 h-screen bg-white overflow-y-auto'>

      <CloseButton  
        title='Add Items'
        onCancelClick={()=>setSideScreenOpen(false)}
      />
      
      <ComboItemForm/>

    </div>
  )
}