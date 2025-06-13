import mongoose, { Schema } from 'mongoose';

const userSchema = new Schema({
  name: String,
  email: String,
  password: String,
  organization: String,
  kudosLeft: { type: Number, default: 3 },
  lastReset: { type: Date, default: new Date() }
});

export default mongoose.model('User', userSchema);
