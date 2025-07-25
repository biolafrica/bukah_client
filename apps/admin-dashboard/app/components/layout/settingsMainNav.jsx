import * as outline  from "@heroicons/react/24/outline"
import Link from "next/link"
import Switch from "../uiComponents/switch"
import Policies from "../../data/policies"


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

export function NotificationItem({
  label,
  description,
  initial,
  onToggle,
  onPreview,
}) {
  return (
    <div className="text-sm flex items-center justify-between border border-border-text p-3 rounded-md">
      <div className="flex gap-4 max-w-3/4">
        <div className="min-w-[32px]">
          <Switch initial={initial} onChange={onToggle} />
        </div>
        <div>
          <h4>{label}</h4>
          {description && (
            <h4 className="text-sec-text mt-2 hidden lg:block">{description}</h4>
          )}
        </div>
      </div>
      <button
        type="button"
        className="btn btn-filled flex items-center gap-2"
        onClick={onPreview}
      >
        <outline.EyeIcon className="h-5 w-5" aria-hidden="true" />
        <span>Preview</span>
      </button>
    </div>
  )
}

export function NotificationSection({ title, items }) {
  return (
    <div className="border border-border-text p-3 rounded-md my-5">
      <h4 className="text-base font-medium">{title}</h4>
      <div className="flex flex-col gap-4 mt-5">
        {items.map(item => (
          <NotificationItem
            key={item.key}
            label={item.label}
            description={item.description}
            initial={item.initial}
            onToggle={value => item.onToggle(item.key, value)}
            onPreview={() => item.onPreview(item.key)}
          />
        ))}
      </div>
    </div>
  )
}

export function NotificationSettings({ sections }) {
  return (
    <div className="border border-border-text rounded-md p-5 bg-white">
      <h3 className="font-semibold text-base border-b border-border-text pb-3 mb-5">
        Notification
      </h3>
      <h4 className="text-sec-text">
        View the notifications that will be sent out to customer and staff
      </h4>
      {sections.map(section => (
        <NotificationSection
          key={section.key}
          title={section.title}
          items={section.items}
        />
      ))}
    </div>
  )
}

export function PolicyBody(){
  return(
    <div className="border border-border-text rounded-md p-5 bg-white">
      <h3 className="font-semibold text-base border-b border-border-text pb-3 mb-5">Policies</h3>
      <Policies/>
    </div>
  )
}

 

     

      
       