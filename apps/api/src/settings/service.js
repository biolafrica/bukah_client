import { repos } from "../lib/repos";

export async function updateSettings(settingId, data){

  console.log("my data",data)
  console.log(settingId)
  return repos.settings.update(settingId, data)
}