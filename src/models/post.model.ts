import { InferSchemaType, Schema, model } from 'mongoose';

const DOCUMENT_NAME = 'Post';
const COLLECTION_NAME = 'Posts';

const postSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    content: {
      type: String,
      required: true,
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

export type Post = InferSchemaType<typeof postSchema>;
const postModel = model<Post>(DOCUMENT_NAME, postSchema);
export default postModel;
