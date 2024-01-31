import { jwtDecode } from "jwt-decode"
import Cookies from "js-cookie"
import moment from 'moment'
export const isAdminUser = () => {
    const token = Cookies.get('accessToken')
    const decoded = jwtDecode(token)
    return decoded?.is_admin ?? false
}

export const userId = () => {
    const token = Cookies.get('accessToken')
    const decoded = jwtDecode(token)
    return decoded.user_id
}

export function capitalize(str) {

  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function formatDate(str){
  return moment(str).format('MMM-DD-YYYY')
}

export function formatName(firstName='', lastName='') {
  return `${firstName} ${lastName}`
}
