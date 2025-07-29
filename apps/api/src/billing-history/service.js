import { repos } from "../lib/repos";

export function getBillingHistories(){
  const range = [0,11]
  const joins = {
    plan: "plans(type,target)", 
  }
  return repos.billing.findAll({range, joins})
}

export function getBillingById(billingId){
  const joins = {
    plan: "plans(type,target)", 
  }
  return repos.billing.findById(billingId, joins)
}
 