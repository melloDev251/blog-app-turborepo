import CreatePostContainer from "./_components/createPostContainer";
import UpsertPostForm from "./_components/upsertPostForm";

const CreatePostPage = () => {
  return (
    <div className="bg-white shadow-md rounded-md p-6 max-w-2xl w-full">
      <h2 className="text-lg uppercase text-center font-extrabold text-slate-700">
        Create a New Post
      </h2>
      <CreatePostContainer />
    </div>
  );
};

export default CreatePostPage;
