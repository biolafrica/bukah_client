export const storeFields = [
  { name: 'businessName', label: 'Business Name', type: 'text', required: true },
  { name: 'address', label: 'Address', type: 'text', required: true },
  { name: 'emailAddress', label: 'Email Address', type: 'email', required: true },
  { name: 'phoneNumber', label: 'Phone Number', type: 'text', required: true },
  { name: 'twitterLink', label: 'Twitter Link', type: 'text', required: false },
  { name: 'facebookLink', label: 'Facebook Link', type: 'text', required: false },
  { name: 'instagramLink', label: 'Instagram Link', type: 'text', required: false },
  { name: 'tiktokLink', label: 'Tiktok Link', type: 'text', required: false },
  { name: 'prefix', label: 'Prefix(Two letters before your OrderID)', type: 'text', required: true },
]

export const initial = [
  { day: 'Monday',    enabled: true,  from: '09:00', to: '17:00' },
  { day: 'Tuesday',   enabled: true,  from: '09:00', to: '17:00' },
  { day: 'Wednesday',   enabled: true,  from: '09:00', to: '17:00' },
  { day: 'Thursday',   enabled: true,  from: '09:00', to: '17:00' },
  { day: 'Friday',   enabled: true,  from: '09:00', to: '17:00' },
  { day: 'Satday',   enabled: true,  from: '09:00', to: '17:00' },
  { day: 'Sunday',   enabled: false,  from: '09:00', to: '17:00' },
 
]