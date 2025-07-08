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

export const addTableFields = [
  { name: 'tableName', label: 'Table Name/Number', type: 'text', required: true },
  { name: 'capacity', label: 'Capacity', type: 'text', required: true },
  { name: 'section', label: 'Section', type: 'text', required: true },
  { name: 'serviceCharge', label: 'Service Charge', type: 'number', required: true },
]

export const gatewayFields = [
  { name: 'publicKey', label: 'Public Key', type: 'text', required: true },
  { name: 'secretKey', label: 'Secret Key', type: 'text', required: true },
  { name: 'callbackURL', label: 'Callback URL', type: 'text', required: true },
  { name: 'gatewayName', label: 'Gateway Name', type: 'number', required: true },
 
]

export const bankFields = [
  { name: 'bankName', label: 'Bank Name', type: 'text', required: true },
  { name: 'accountName', label: 'Account Name', type: 'text', required: true },
  { name: 'accountNumber', label: 'Account Number', type: 'text', required: true },
 
]

export const taxFields = [
  { name: 'tax', label: 'Tax(Add tax % if applicable)', type: 'nuber', required: false },
 
]

export const addTerminalFields = [
  { name: 'name', label: 'Name', type: 'text', required: true },
  { name: 'posTerminal', label: 'POS Terminal', type: 'text', required: true },
  { name: 'branch', label: 'Branch', type: 'text', required: true },
]

export const addPOSFields = [
  { name: 'referenceID', label: 'Reference ID', type: 'text', required: true },
  { name: 'posProvider', label: 'POS Provider', type: 'text', required: true },
  { name: 'bankName', label: 'Bank Name', type: 'text', required: true },
  { name: 'accountName', label: 'Account Name', type: 'text', required: true },
  { name: 'accountNumber', label: 'Account Number', type: 'text', required: true },
]