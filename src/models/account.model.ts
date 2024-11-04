import { InferSchemaType, model, Schema } from 'mongoose';

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

export type Account = InferSchemaType<typeof accountSchema>;

const accountModel = model<Account>(DOCUMENT_NAME, accountSchema);
export default accountModel;
