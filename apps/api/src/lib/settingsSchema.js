import { z } from "zod";

export const createSettingsSchema = z.object({
  restaurant_id : z.string().uuid("Invalid restaurant ID"),
  name : z.string().min(1, "name is required"),
  address: z.string().min(1, "address is required"),
  email: z.string().email("invalid email"),
  phone: z.string().min(1, "phone number is required"),
  tax_rate:  z.number().positive("tax rate must be > 0"),
  service_charge: z.number().positive("service charge must be > 0"),
  description:  z.string().min(1, "description is required"),
  social_links:  z.string().min(1, "social links is required"),
  business_hour:  z.string().min(1, "business hours is required"),
  logo_url: z.string().min(1, "logo url is required"),
  logo_icon_url:  z.string().min(1, "logo icon is required"),
  logo_favicon:  z.string().min(1, "favicon is required"),
  primary_color:  z.string().min(1, "primary color is required"),
  secondary_color:  z.string().min(1, "secondary color is required"),

})

export const updateSettingsSchema = createSettingsSchema
.partial()
.refine((obj)=>Object.keys(obj).length > 0, {
  message: "At least one field must be provided"
})