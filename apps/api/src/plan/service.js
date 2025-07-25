import { repos } from "../lib/repos";

export function getPlan(){
  const joins = {
    plan: "plans(type,amount,target)", 
  }
  return repos.plans.findAll({joins})
}

export function changePlan(planId, data){
  return repos.plans.update(planId, data)
}