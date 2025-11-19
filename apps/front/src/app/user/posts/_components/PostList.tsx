import { Post } from "@/lib/types/modelTypes";
import PostListItem from "./PostListItem";
import Pagination from "@/components/pagination";

type Props = {
  posts: Post[];
  currentPage: number;
  totalPages: number;
};
const PostList = ({ posts, currentPage, totalPages }: Props) => {
  return (
    <>
      <div className="fixed top-19 left-0 right-0 z-50 bg-sky-500 text-white shadow-md p-5">
        <div className="grid grid-cols-8 text-center font-bold">
          <div className="col-span-2 uppercase">Posts Lists</div>
          <div></div>
          <div>Date</div>
          <div>Published</div>
          <div>Likes</div>
          <div>Comments</div>
          <div></div>
        </div>
      </div>
      {/* <div className="mt-37"></div> */}

      {posts.map((post) => (
        <PostListItem post={post} key={post.id} />
      ))}
      <Pagination {...{ currentPage, totalPages }} className="my-4" />
    </>
  );
};

export default PostList;
