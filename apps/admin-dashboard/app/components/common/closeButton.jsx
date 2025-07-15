import * as outline  from '@heroicons/react/24/outline'

export default function CloseButton({title, onCancelClick}){
  return(
    <div className='flex flex-1 items-center justify-between p-5 border-b border-border-text mb-5 bg-white'>
      <h4 className='text-base font-medium'>{title}</h4>
      <outline.XMarkIcon className='w-4 h-4 cursor-pointer' onClick={onCancelClick}/>
    </div>
  )
}