import mongoose from 'mongoose';

export interface IUser {
  name: string;
  email: string;
  phone: string;
  password: string;
  role: 'user' | 'admin' | 'agent';
  isEmailVerified: boolean;
  isPhoneVerified: boolean;
  preferences: {
    currency: string;
    language: string;
    notifications: boolean;
  };
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new mongoose.Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    phone: {
      type: String,
      required: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    role: {
      type: String,
      enum: ['user', 'admin', 'agent'],
      default: 'user',
    },
    isEmailVerified: {
      type: Boolean,
      default: false,
    },
    isPhoneVerified: {
      type: Boolean,
      default: false,
    },
    preferences: {
      currency: {
        type: String,
        default: 'NGN',
      },
      language: {
        type: String,
        default: 'en',
      },
      notifications: {
        type: Boolean,
        default: true,
      },
    },
  },
  {
    timestamps: true,
  }
);

// Don't return password in queries
UserSchema.methods.toJSON = function() {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

// Ensure model is registered
const User = mongoose.models.User || mongoose.model<IUser>('User', UserSchema);

export default User;