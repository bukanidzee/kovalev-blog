import { action, makeObservable, observable } from 'mobx'

class Errors {
  errorMessages: string[] = []

  constructor() {
    makeObservable(this, {
      errorMessages: observable,
      setError: action,
      clearOld: action
    })
  }

  setError(errorMessage: string): void {
    this.errorMessages.push(errorMessage)
    const index = this.errorMessages.length - 1
    setTimeout(() => this.clearOld(index), 5000)
  }

  clearOld(index: number): void {
    this.errorMessages.splice(index)
  }
}

export default new Errors()
