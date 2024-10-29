import { model, Schema } from 'mongoose';

const DOCUMENT_NAME = 'User';
const COLLECTION_NAME = 'Users';

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    fullName: {
      type: String,
    },
    followerNumber: {
      type: Number,
      default: 0,
    },
    followingNumber: {
      type: Number,
      default: 0,
    },
    isActivated: {
      type: Boolean,
      default: false,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
    collection: COLLECTION_NAME,
  },
);

const userModel = model(DOCUMENT_NAME, userSchema);
export default userModel;
