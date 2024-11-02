import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  username: string;
  email: string;
  thoughts: mongoose.Types.ObjectId[];
  friends: mongoose.Types.ObjectId[];
  friendCount?: number;
}

const UserSchema: Schema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/.+@.+\..+/, 'Must match a valid email address'],
    },
    thoughts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Thought',
      },
    ],
    friends: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

// Virtual to calculate the number of friends
UserSchema.virtual('friendCount').get(function (this: IUser) {
  return this.friends.length;
});

export const User = mongoose.model<IUser>('User', UserSchema);



