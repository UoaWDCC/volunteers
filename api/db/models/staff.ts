// copied from https://github.com/UoaWDCC/VPS/blob/master/backend/src/db/models/staff.js and modified schema to match api/db/User.ts

import mongoose from 'mongoose';

const { Schema } = mongoose;

const staffSchema = new Schema({
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
});

const Staff = mongoose.model('Staff', staffSchema);

export default Staff;
