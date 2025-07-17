import z from "zod";


export const getOrderItemsQuerySchema = z.object({
  orderId: z.string().uuid()
});