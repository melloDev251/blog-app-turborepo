"use client";
import { Post } from "@/lib/types/modelTypes";
import PostListItem from "./PostListItem";
import Pagination from "@/components/pagination";
import { useMemo } from "react";

type Props = {
  posts: Post[];
  currentPage: number;
  totalPages: number;
};
const PostList = ({ posts, currentPage, totalPages }: Props) => {
  // TRI COTE CLIENT - ICI
  const sortedPosts = useMemo(() => {
    return [...posts].sort(
      (a, b) =>
        new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
    );
  }, [posts]); // Le tri se recalculera seulement si 'posts' change

  return (
    <>
      <div className="fixed top-19 left-0 right-0 z-50 bg-sky-500 text-white shadow-md p-5">
        <div className="grid grid-cols-8 text-center font-bold">
          <div className="col-span-2 uppercase">My Posts Lists</div>
          <div></div>
          <div>Date</div>
          <div>Published</div>
          <div>Likes</div>
          <div>Comments</div>
          <div></div>
        </div>
      </div>
      {/* <div className="mt-37"></div> */}

      {sortedPosts.map((post) => (
        <PostListItem post={post} key={post.id} />
      ))}
      <Pagination {...{ currentPage, totalPages }} className="my-4" />
    </>
  );
};

export default PostList;
