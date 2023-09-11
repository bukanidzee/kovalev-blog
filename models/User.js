import {Schema, model} from 'mongoose'

const User = new Schema({
  email: {type:String, required:true, unique:true},
  picture: {type: String},
  name: {type:String, required:true, unique:true},
  password: {type:String, required:true},
  isAdmin: {type:Boolean, default:false}
})

export default model('User', User)
