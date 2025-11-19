import { PropsWithChildren } from "react";

type Props = PropsWithChildren;
const PostsLayout = ({ children }: Props) => {
  return (
    <div className="mt-35 flex flex-col justify-center items-center">
      {children}
    </div>
  );
};

export default PostsLayout;
