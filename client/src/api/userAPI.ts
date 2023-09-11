import { IFetchSuccess } from './../types/fetchtypes'
import axios, { AxiosResponse } from 'axios'
import { ILoginData } from '../pages/auth/Login'

export interface ILoginResponse {
  token: string
  userId: string
  name: string
  picture: string
  isAdmin: boolean
}

type TFetchLogin = (
  data: ILoginData
) => Promise<AxiosResponse<ILoginResponse, any>>

export const fetchLogin: TFetchLogin = async data =>
  await axios.post<ILoginResponse>('/api/auth/login', data)

type TFetchRegister = (
  data: FormData
) => Promise<AxiosResponse<IFetchSuccess, any>>

export const fetchRegister: TFetchRegister = async data =>
  await axios.post<IFetchSuccess>('/api/auth/registration', data)
