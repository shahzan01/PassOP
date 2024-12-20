import  mongoose from 'mongoose';

const PasswordSchema = new mongoose.Schema({
  url: { type: String, required: true },
  username: { type: String, required: true, },
  password: { type: String, required: true },
});
const Password=mongoose.model('Passwrod',PasswordSchema);
export default Password
1