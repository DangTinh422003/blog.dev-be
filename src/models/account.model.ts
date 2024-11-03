import { model, Schema } from 'mongoose';

const DOCUMENT_NAME = 'Account';
const COLLECTION_NAME = 'Accounts';

const accountSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    collection: COLLECTION_NAME,
  },
);

const accountModel = model(DOCUMENT_NAME, accountSchema);
export default accountModel;
