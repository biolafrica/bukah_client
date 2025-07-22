import { repos } from "../lib/repos";
import {supabase} from "../../../../packages/utils/database/supabaseClient"
import { sendEmail } from "../../app/services/mailService";

export async function getAllStaffWithBranches({
  searchTerm =null, 
  branch = null, 
  role =null, 
  isActive = null,  
  range = [0,9],
  name = null
}={}){
  const filters = {}
  const orderBy = {}

  if (branch) filters.branch_id = branch
  if (isActive !== null) filters.is_active = isActive
  if (role) filters.role = role
  if(name)orderBy.first_name = name

  const joins = { branch: 'branches(name, id)' }

  const search = searchTerm ? ['first_name', "last_name", searchTerm] : []
  
  return repos.user.findAll({filters,joins,search,range,orderBy})
}


export async function getStaffById(userId){
  const joins = { branch: 'branches(name, id)' }

  return repos.user.findById(userId, joins)
}

export async function addStaff({ first_name, last_name, email, role, branch_id, phone_number, restaurant_id, is_active
}){

  const staff_code = await generateUniqueStaffCode(restaurant_id)
  console.log(staff_code)

  let authUser = null
  if (['supervisor','manager'].includes(role.toLowerCase())) {
    const { data, error } = await supabase.auth.admin.inviteUserByEmail(email, {
      data: {
        first_name,
        last_name,
        role
      }
    })
    if (error) throw new Error(`Auth signup failed: ${error.message}`)
    authUser = data.user;
  }

  console.log(authUser);
 

  const { data: newUser, error: insertErr } = await supabase
  .from('users')
  .insert({
    id: authUser?.id,
    first_name,
    last_name,
    email,
    role,
    branch_id,
    phone_number,
    restaurant_id,
    is_active,
    staff_code
  })
  .single()

  if (insertErr) throw new Error(`DB insert failed: ${insertErr.message}`)

  await sendEmail({
    to: email,
    subject: 'Welcome to the Team! Here is Your Staff Code',
    html: `
      <p>Hi ${first_name},</p>
      <p>Your staff account has been created.</p>
      <p><strong>Your staff code is: ${staff_code}</strong></p>
      <p>${['supervisor','manager'].includes(role.toLowerCase())
        ? 'You should shortly receive an email with a link to set your password.'
        : 'Please reach out to your manager for your login credentials.'
      }</p>
    `
  })

  return newUser;
}


export async function updateStaffDetails(userId, data){
  return repos.user.update(userId, data)
}


export async function deleteStaff(userId){
  return repos.user.delete(userId)
}

export async function suspendStaff(userId){
  return repos.user.deactivate(userId)
}


export async function reinstateStaff(userId){
  return repos.user.reactivate(userId)

}

export async function getStaffSessions(userId,{range=[0,9]}={}){
  const filters = {user_id : userId}
  return repos.session.findAll({filters, range})
}


async function generateUniqueStaffCode(restaurantId) {
  let code, existingCount, fetchErr

  do {
    // 1) Make a random 5-digit string, 10000–99999
    code = String(Math.floor(10000 + Math.random() * 90000))

    // 2) Ask Supabase: “How many users in this restaurant already use this code?”
    const res = await supabase
      .from('users')
      .select('id', { head: true, count: 'exact' })
      .eq('restaurant_id', restaurantId)
      .eq('staff_code', code)

    existingCount = res.count
    fetchErr      = res.error

    if (fetchErr) {
      throw new Error(`Staff-code lookup failed: ${fetchErr.message}`)
    }

    // If existingCount > 0, loop and try again
  } while (existingCount > 0)

  return code
}

export function fetchSupervisors(){
  const filters = {role : "supervisor"}
  const select = ("first_name, last_name, id")
  const range = [0,99]

  return repos.user.findAll({filters,range,select})

}