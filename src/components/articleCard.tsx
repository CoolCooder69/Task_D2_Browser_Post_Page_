import { Star, StarHalf } from "lucide-react";
import type { Article } from "../types";

const ArticleCard = ({
  Name,
  Description,
  Example,
  AuthorName,
  ArticleImg,
  Stars,
}: Article) => {
  const hasRatingHigh = Number(Stars) > 4;

  return (
    <div className="cursor-pointer border w-full max-w-80 p-5 rounded-2xl shadow-2xl transition duration-150 md:hover:scale-105">
      <img
        src={ArticleImg}
        alt={Name}
        className="w-full h-48 rounded-2xl object-cover"
      />

      <div className="flex flex-col gap-1.5 mt-2">
        <div className="text-2xl">Title: {Name}</div>
        <div>Description: {Description}</div>
        <div className="text-gray-600">Example: {Example}</div>

        <div className="flex gap-2 items-center">
          {hasRatingHigh ? <Star /> : <StarHalf />}
          <span>
            {Stars} {AuthorName}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ArticleCard;