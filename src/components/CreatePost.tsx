import { Button } from "@/components/ui/button";
import { Field, FieldLabel } from "./ui/field";
import { useState } from "react";
import { Plus } from "lucide-react";

import useUploadPost from "@/lib/uploadContent";

const CreatePost = () => {
  const MAX_TITLE_LENGTH = 50;
  const MAX_DES_LENGTH = 200;
  const [title, setTitle] = useState("");
  const [post, setPost] = useState("");
  const uploadPost = useUploadPost();


  return (
    <>
      <div className="p-2 min-h-120 w-120">
        <Field>
          <FieldLabel
            htmlFor="post-area"
            className="flex justify-center items-center p-2 text-xl"
          >
            Create Post
          </FieldLabel>
          <input
            type="text"
            maxLength={MAX_TITLE_LENGTH}
            name="post-area"
            id="post-area"
            placeholder="Title"
            className="border-2 rounded-xl px-2"
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
          <span className="text-sm ml-auto block">
            {title.length}/{MAX_TITLE_LENGTH}
          </span>
          <hr />
          <textarea
            name="post-des-area"
            id="post-des-area"
            placeholder="Write Here Something..."
            onChange={(e) => {
              setPost(e.target.value);
            }}
            maxLength={MAX_DES_LENGTH}
            className="border-2  rounded-xl p-4 min-h-100 my-2"
          />
          <span>
            {post.length}/{MAX_DES_LENGTH}
          </span>
          <Button
            className="bg-yellow-200 border-black border hover:bg-yellow-200"
            variant="outline"
            onClick={()=> uploadPost({title: title, content: post})}
          >
            <Plus> </Plus>
            Post
          </Button>
        </Field>
      </div>
    </>
  );
};

export default CreatePost;
