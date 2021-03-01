import axios from 'axios'
import { UserResponse } from '../redux/types'

export async function getUsers(pageNo: number): Promise<UserResponse> {
    return await axios.get(`${process.env.REACT_APP_API_BASE_URL}users?page=${pageNo}`)
}