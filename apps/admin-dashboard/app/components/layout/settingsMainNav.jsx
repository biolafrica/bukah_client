import * as outline  from "@heroicons/react/24/outline"
import Link from "next/link"


export function SettingsSectionNav({ title, items }) {
  return (
    <div className="border border-border-text rounded-md p-5 bg-white">
      <h3 className="font-semibold text-base border-b border-border-text pb-3 mb-5">{title}</h3>
      <div className="flex flex-col gap-3">
        {items.map(item => (
          <Link
            key={item.key}
            href={item.href}
            className="border border-border-text rounded-md p-5 flex items-center justify-between hover:bg-laybg-text transition-colors"
          >
            <div className="text-sm">
              <h4>{item.label}</h4>
              {item.description && (
                <h4 className="text-sec-text mt-1">{item.description}</h4>
              )}
            </div>
            <outline.ChevronRightIcon className="w-5 h-5" aria-hidden="true" />
          </Link>
        ))}
      </div>
    </div>
  )
}

 

     

      
       