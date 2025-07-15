export default function ItemDetails(){
  return(
    <div className='w-screen lg:w-1/2 fixed right-0 h-screen bg-white overflow-y-auto'>

      <CloseButton  
        title='item Deatils'
        onCancelClick={()=>setSideScreenOpen(false)}
      />

      <h4>Items Full Details</h4>

    </div>
  )
}