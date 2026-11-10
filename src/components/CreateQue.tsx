import { Button } from "@/components/ui/button";
import { Field, FieldLabel } from "./ui/field";
import { useState } from "react";
import { Plus } from "lucide-react";

const CreateQue = () => {
  const MAX_TITLE_LENGTH = 50;
  const MAX_DES_LENGTH = 200;
  const [title, setTitle] = useState("");
  const [que, setQue] = useState("");
  return (
    <>
      <div className="p-2 w-full max-w-120">
        <Field>
          <FieldLabel
            htmlFor="que-area"
            className="flex justify-center items-center p-2 text-xl"
          >
            Create Que
          </FieldLabel>
          <input
            type="text"
            maxLength={MAX_TITLE_LENGTH}
            name="que-area"
            id="que-area"
            placeholder="Title"
            className="border-2 rounded-xl px-2 py-1 w-full"
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
              setQue(e.target.value);
            }}
            maxLength={MAX_DES_LENGTH}
            className="border-2 rounded-xl p-4 min-h-48 sm:min-h-100 my-2 w-full"
          />
          <span>
            {que.length}/{MAX_DES_LENGTH}
          </span>
          <Button
            className="bg-yellow-200 border-black border hover:bg-yellow-200"
            variant="outline"
          >
            <Plus> </Plus>
            Ask Que
          </Button>
        </Field>
      </div>
    </>
  );
};

export default CreateQue;