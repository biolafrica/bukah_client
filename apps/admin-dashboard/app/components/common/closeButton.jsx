import * as outline  from '@heroicons/react/24/outline'

export default function CloseButton({title, onCancelClick,id}){
  return(
    <div className='flex flex-1 items-center justify-between p-5 border-b border-border-text mb-5 bg-white sticky top-0 '>
      <h4 className='text-base font-medium '>
        {title}
        {id && (<span className='text-sec-text'>{id}</span>)}
      </h4>
      
      <outline.XMarkIcon className='w-4 h-4 cursor-pointer' onClick={onCancelClick}/>
      
    </div>
  )
}