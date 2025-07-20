import { z } from "zod";

export const createSocialLinks = z.object({
  twitter: z.string().url().optional(),
  facebook: z.string().url().optional(),
  instagram: z.string().url().optional(),
  tiktok: z.string().url().optional()
})
.partial();


export const createBusinessHour = z.object({
  day: z.enum(["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"]),
  from: z.string().regex(/^[0-2]\d:[0-5]\d$/, "Invalid start time, expected HH.MM"),
  to: z.string().regex(/^[0-2]\d:[0-5]\d$/, "Invalid end time, expected HH.MM"),
  enabled: z.boolean(), 
})

export const createCustomerNotifications = z.object({
  order_confirmation : z.boolean().optional(),
  order_completed : z.boolean().optional(),
  payment_refund : z.boolean().optional(),
  order_cancelled : z.boolean().optional(),
  pickup_confirmation : z.boolean().optional(),
  customer_registration : z.boolean().optional(),
  reservation_confirmation : z.boolean().optional()

}).partial()

export const createStaffNotifications = z.object({
  account_creation : z.boolean().optional(),
  password_reset_request: z.boolean().optional(),
  password_change: z.boolean().optional()

}).partial()


export const createSettingsSchema = z.object({
  restaurant_id : z.string().uuid("Invalid restaurant ID"),
  name : z.string().min(1, "name is required"),
  address: z.string().min(1, "address is required"),
  email: z.string().email("invalid email"),
  phone: z
  .string()
  .length(11, "Phone must be exactly 11 digits")
  .regex(/^\d+$/, "Phone can only contain digits"),
  tax_rate:  z.number().optional(),
  service_charge: z.number().optional(),
  social_links: createSocialLinks.optional(),
  business_hours: z.array(createBusinessHour).optional(),
  logo_url: z.string().url("Invalid logo_url").optional(),
  logo_icon_url: z.string().url("Invalid logo_icon_url").optional(),
  favicon_url: z.string().url("Invalid favicon_url").optional(),
  primary_color: z.string().regex(/^#([0-9A-Fa-f]{6})$/, "Invalid HEX color").optional(),
  secondary_color: z.string().regex(/^#([0-9A-Fa-f]{6})$/, "Invalid HEX color").optional(),
  prefix:  z.string().optional(),
  tagline:  z.string().optional(),
  customer_notifications:createCustomerNotifications.optional(),
  staff_notifications: createStaffNotifications.optional()

})

export const updateSettingsSchema = createSettingsSchema
.partial()
.refine((obj)=>Object.keys(obj).length > 0, {
  message: "At least one field must be provided"
})