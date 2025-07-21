import { repos } from "../lib/repos";

export async function updateSettings(settingId, data){
  return repos.settings.update(settingId, data)
}