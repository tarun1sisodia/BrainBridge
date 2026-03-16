import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  supabase_id: {
    type: String,
    required: [true, 'Supabase ID is required'],
    unique: true,
  },
  username: {
    type: String,
    required: [true, 'Please provide a username'],
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'Please provide an email'],
    unique: true,
    lowercase: true,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  total_score: {
    type: Number,
    default: 0
  },
  games_played: {
    type: Number,
    default: 0
  }
});

const User = mongoose.model('User', userSchema);

export default User;
