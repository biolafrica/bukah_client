import * as outline from '@heroicons/react/24/outline'

export default function SettingListCard({data, icon = outline.PresentationChartBarIcon, onDelete, onEdit}){
  let Icons = icon;
  return(
    <div className='grid grid-cols-1 gap-2 md:grid-cols-2 '>

      {data.map((item)=>(
        <div className='border border-border-text rounded-md p-5 ' key={item.id}>

          <div className='flex justify-between flex-1 mb-3'>
            <div className='flex flex-col gap-1 text-sm'>
              <h4>{item.name}</h4>
              <h4 className='text-sec-text'>{item.head}</h4>
              <h4 className='text-sec-text'>{item.subHead}</h4>
            </div>

            <div>
              <outline.PresentationChartBarIcon className='w-5 h-5'/>
            </div>
          </div>

          <div className='flex flex-1 items-center gap-2'>
            <button onClick={() => onEdit(row)} className='btn btn-outlined'>
              <outline.PencilIcon className='w-5 h-5'/>
              Edit
            </button>
            <button onClick={() => onDelete(row)} className='btn btn-outlined text-red-600'>
              <outline.TrashIcon className='w-5 h-5'/>
              Delete
            </button>
          </div>

        </div>
        
      ))}

     

    </div>
  )
  
}