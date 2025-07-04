export const formatNaira =(amount)=>{
  if(isNaN(amount)){
    return "Invalid Amount"
  }

  return new Intl.NumberFormat('en-NG', {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 2,
  }).format(amount);

}

export function formatNumber(value) {
  if (value == null || isNaN(value)) return 'Inavlid Number'
  return new Intl.NumberFormat('en-US', {
    maximumFractionDigits: 20  // preserve decimals if present
  }).format(value)
}