import { repos } from "../lib/repos";

export function getBillingHistories(){

  const range = [0,11]
  const joins = {
    plan: "plans(type)", 
  }

  return repos.plans.findAll({range, joins})
}

export function getBillingById(billingId){
  const joins = {
    plan: "plans(type)", 
  }
  return repos.product.findById(billingId, joins)
}
 