import CloseButton from "../../common/closeButton";

export default function ItemDetails({onClose}){
  return(
    <div className='w-screen lg:w-1/2 fixed right-0 h-screen bg-white overflow-y-auto'>

      <CloseButton  
        title='item Details'
        onCancelClick={onClose}
      />

      <h2>items Details</h2>

    </div>
  )
}