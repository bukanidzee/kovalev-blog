import { ILoginResponse } from '../api/userAPI'
import { makeAutoObservable } from 'mobx'
import axios from 'axios'

class User {
  name = ''
  pictureUrl = ''
  userId = ''
  token = ''
  isAdmin = false

  constructor() {
    makeAutoObservable(this)
  }

  login(data: ILoginResponse): void {
    this.name = data.name
    this.pictureUrl = data.picture
    this.userId = data.userId
    this.token = data.token
    this.isAdmin = data.isAdmin

    axios.defaults.headers.authorization = `Token ${data.token}`

    localStorage.setItem('userData', JSON.stringify(data))
  }

  logout(): void {
    this.name = ''
    this.pictureUrl = ''
    this.userId = ''
    this.token = ''
    this.isAdmin = false

    delete axios.defaults.headers.authorization
    localStorage.removeItem('userData')
  }
}

export default new User()
