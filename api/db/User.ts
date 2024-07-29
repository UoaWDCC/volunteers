import { Schema, model } from 'mongoose';

const userSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: String,
  email: {
    type: String,
    required: true,
    unique: true,
    maxLength: 40,
    minLength: 1,
  },
  studentID: {
    type: String,
    required: true,
    unique: true,
  },
  uid: {
    type: String,
    required: false,
    unique: true,
  },
  userRole: {
    type: String,
    required: false,
    unique: true,
  },
});

const User = model('User', userSchema);

export default User;
