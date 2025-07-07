export const sections = [
    {
      key: 'customers',
      title: 'Customers',
      items: [
        {
          key: 'orderConfirmation',
          label: 'Order Confirmation',
          description: 'Sent immediately after a customer places an order. Includes order summary, order number, and estimated delivery or pickup time',
          initial: true,                   
          onToggle: (key, state) => { /* send to API */ },
          onPreview: (key) => { /* show preview */ },
        },
        {
          key: 'orderCompleted',
          label: 'Order Completed',
          description: 'Sent when the order has been successfully fulfilled—either picked up or delivered. It may include a thank-you message and request for feedback or review.',
          initial: true,                        // from backend
          onToggle: (key, state) => { /* send to API */ },
          onPreview: (key) => { /* show preview */ },
        },
        {
          key: 'paymentRefund',
          label: 'Payment Refund',
          description: 'Notifies the customer that a full or partial refund has been issued, including the amount, original payment method, and expected time to reflect in their account.',
          initial: true,                        // from backend
          onToggle: (key, state) => { /* send to API */ },
          onPreview: (key) => { /* show preview */ },
        },
        {
          key: 'orderCancelled',
          label: 'Order Cancelled',
          description: 'Informs the customer that their order was cancelled, either by them or the restaurant. It includes the reason and any applicable refund information.',
          initial: true,                        // from backend
          onToggle: (key, state) => { /* send to API */ },
          onPreview: (key) => { /* show preview */ },
        },
        {
          key: 'pickupConfirmation',
          label: 'Pickup Confirmation',
          description: 'Alerts the customer that their order is ready at the pickup location. Often includes pickup instructions, order number, and restaurant contact details.',
          initial: true,                        // from backend
          onToggle: (key, state) => { /* send to API */ },
          onPreview: (key) => { /* show preview */ },
        },
        {
          key: 'customerRegistration',
          label: 'Customer Registration',
          description: 'Sent when a customer signs up or creates an account. It welcomes them to the platform and may include login details, loyalty program info, or a discount code.',
          initial: false,                        // from backend
          onToggle: (key, state) => { /* send to API */ },
          onPreview: (key) => { /* show preview */ },
        },
        {
          key: 'reservationConfirmation',
          label: 'Reservation Confirmation',
          description: 'Confirms a reservation has been booked. Includes date, time, number of guests, and cancellation/modification options.',
          initial: true,                        // from backend
          onToggle: (key, state) => { /* send to API */ },
          onPreview: (key) => { /* show preview */ },
        },
      ],
    },
    
    {
      key: 'staff',
      title: 'Staff',
      items: [
        {
          key: 'accountCreation',
          label: 'Account Creation',
          description: 'Sent when a staff member is added to the system. Includes login URL, username/email, temporary password, and role (e.g., cashier, kitchen staff, manager). Also encourages them to change their password after first login.',
          initial: false,
          onToggle: (key, state) => { /* send to API */ },
          onPreview: (key) => { /* show preview */ },
        },
        {
          key: 'passwordReset',
          label: 'Password Reset',
          description: 'Sent when a staff member clicks “Forgot Password.” Contains a secure, time-limited link to reset their password.',
          initial: false,
          onToggle: (key, state) => { /* send to API */ },
          onPreview: (key) => { /* show preview */ },
        },
        {
          key: 'passwordChange',
          label: 'Password Change',
          description: 'Sent immediately after a staff member updates their password. Confirms the change and provides security tips. Includes contact info in case the change was unauthorized.',
          initial: true,
          onToggle: (key, state) => { /* send to API */ },
          onPreview: (key) => { /* show preview */ },
        },
       
      ],
    },
  ]
