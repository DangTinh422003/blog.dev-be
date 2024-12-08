import postModel from '@/models/post.model';
interface Post {
  title: string;
  content: string;
  author: string;
  image: string;
}
class PostRepo {
  async createPost({ title, content, author, image }: Post) {
    const newPost = await postModel.create({
      title,
      content,
      author,
      image,
    });
    return newPost;
  }
  async getPostById(id: string) {
    return await postModel.findById(id).lean();
  }
  async getAllPostWithAuthor() {
    return await postModel.find().populate('author').lean();
  }
  async getPostDetailByIdWithAuthor(id: string) {
    return await postModel.findById(id).populate('author').lean();
  }
  async updatePostById(id: string, data: Post) {
    return await postModel.findByIdAndUpdate(id, data);
  }
  async deletePostById(id: string) {
    return await postModel.findByIdAndUpdate(id, { isDeleted: true });
  }
}

const postRepo = new PostRepo();
export default postRepo;
