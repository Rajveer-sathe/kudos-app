import mongoose, { Schema } from 'mongoose';

const kudoSchema = new Schema({
  from: { type: Schema.Types.ObjectId, ref: 'User' },
  to: { type: Schema.Types.ObjectId, ref: 'User' },
  message: String,
  createdAt: { type: Date, default: new Date() }
});

export default mongoose.model('Kudo', kudoSchema);

