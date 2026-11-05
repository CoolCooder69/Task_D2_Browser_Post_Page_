
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CircleQuestionMark, PencilLine, Lock, Gift } from "lucide-react";
import { useState } from "react";
import CreatePost from "@/components/CreatePost";
import CreateQue from "@/components/CreateQue";

const Post = () => {
  const [post, setPost] = useState(true);
  const [postType, setPostType] = useState("Free");

  return (
    <>
      <div className="w-full h-dvh p-10 flex flex-col justify-start items-center gap-5">
        <div>
          <h1 className="text-2xl">Share your thoughts.</h1>
        </div>

        <div>
          <Tabs defaultValue="Post">
            <TabsList>
              <TabsTrigger
                className="text-xl"
                value="Post"
                onClick={() => setPost(true)}
              >
                <PencilLine />
                Post
              </TabsTrigger>

              <TabsTrigger
                className="text-xl"
                value="Que"
                onClick={() => setPost(false)}
              >
                <CircleQuestionMark />
                Questions
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setPostType("Free")}
            className={`flex items-center gap-2 px-5 py-2 rounded-lg border ${
              postType === "Free"
                ? "bg-primary text-primary-foreground"
                : "hover:bg-muted"
              
            }`}
          >
            <Gift size={18} />
            Free
          </button>

          <button
            onClick={() => setPostType("Paid")}
            className={`flex items-center gap-2 px-5 py-2 rounded-lg border ${
              postType === "Paid"
                ? "bg-primary text-primary-foreground"
                : "hover:bg-muted"
              
            }`}
          >
            <Lock size={18} />
            Paid
          </button>
        </div>

        <div>
          {post ? <CreatePost /> : <CreateQue />}
        </div>
      </div>
    </>
  );
};

export default Post;
