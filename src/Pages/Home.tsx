import ArticleCard from "@/components/articleCard";
import Btn2 from "@/components/Btn2";
import GalleryCard from "@/components/galleryCard";
import Heading1 from "@/components/heading1";
import ProfileCard from "@/components/profileCard";
import type { Article } from "@/types";
import { useAuth } from "@/Context/AuthContext";

const articles: Article[] = [
  {
    Name: "Learn React",
    Description: "Learn React in 30 days",
    Example: "React Hooks",
    AuthorName: "Ravneet",
    ArticleImg: "https://picsum.photos/200/300?random=4",
    Stars: "4.5",
  },
  {
    Name: "JavaScript Basics",
    Description: "Learn JavaScript from scratch",
    Example: "Functions and Arrays",
    AuthorName: "Reuel",
    ArticleImg: "https://picsum.photos/200/300?random=5",
    Stars: "3.7",
  },
  {
    Name: "Node.js Guide",
    Description: "Learn backend development with Node.js",
    Example: "Express API",
    AuthorName: "Tejas",
    ArticleImg: "https://picsum.photos/200/300?random=6",
    Stars: "4.6",
  },
];

const tutorials: Article[] = [
  {
    Name: "Master CSS Flexbox",
    Description: "A step-by-step guide to building responsive layouts",
    Example: "Navbar and Card Layout",
    AuthorName: "Navpreet",
    ArticleImg: "https://picsum.photos/200/300?random=7",
    Stars: "4.8",
  },
  {
    Name: "Build Your First REST API",
    Description: "Learn how to create APIs using Node.js and Express",
    Example: "GET, POST and DELETE Requests",
    AuthorName: "Gaurav",
    ArticleImg: "https://picsum.photos/200/300?random=8",
    Stars: "4.7",
  },
  {
    Name: "Git & GitHub for Beginners",
    Description: "Learn version control from your first commit to GitHub",
    Example: "Commit, Branch and Pull Request",
    AuthorName: "Harnoor",
    ArticleImg: "https://picsum.photos/200/300?random=9",
    Stars: "4.9",
  },
];

const galleryImages: string[] = [
  "https://picsum.photos/200/300?random=1",
  "https://picsum.photos/200/300?random=2",
  "https://picsum.photos/200/300?random=3",
];



const Home = ()=> {
  let {user} = useAuth(); 
  return (
    <>
      {/* Profile */}
      <section className="my-10 sm:my-20">
        <ProfileCard userName={user && user.email ? user.email : "Monkey"} />
      </section>

      {/* Gallery */}
      <Heading1 title="Gallery" />
      <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 [&>div]:aspect-[4/3] sm:[&>div]:aspect-auto sm:h-96">
        {galleryImages.map((img) => (
          <GalleryCard key={img} ImgUrl={img} />
        ))}
      
      </div>

      {/* Featured Articles */}
      <Heading1 title="Featured Article" />
      <div className="flex flex-wrap px-4 sm:px-8 lg:px-14 py-7 gap-6 justify-center lg:justify-around items-center">
        {articles.map((article) => (
          <ArticleCard key={article.Name} {...article} />
        ))}
        <Btn2 title="See all Articles" />
      </div>

      {/* Featured Tutorials */}
      <Heading1 title="Featured Tutorials" />
      <div className="flex flex-wrap px-4 sm:px-8 lg:px-14 py-7 gap-6 justify-center lg:justify-around items-center">
        {tutorials.map((tutorial) => (
          <ArticleCard key={tutorial.Name} {...tutorial} />
        ))}
        <Btn2 title="See all Tutorials" />
      </div>
            
    </>
  );
}

export default Home;