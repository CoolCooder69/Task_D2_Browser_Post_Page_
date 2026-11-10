import ProfilePhoto from "./profile";

interface ProfileCardProp {
  userName: string;
}

const ProfileCard = ({ userName }: ProfileCardProp) => (
  <section className="w-full text-lg flex justify-center px-4">
    <div className="border shadow-2xl w-full max-w-3xl lg:w-8/12 rounded-lg flex flex-col md:flex-row justify-start items-center p-4 gap-4 md:min-h-96">
      <ProfilePhoto
        imageUrl="https://i.pinimg.com/474x/55/1f/ff/551fff636303fb8a696c213736ddc09e.jpg"
        userName="Ravneet"
      />

      <div className="flex-1 min-w-0 flex flex-col justify-center gap-1 text-center p-2 sm:p-5">
        <span className="text-xl sm:text-3xl break-all">{userName}</span>
        <span className="text-sm">2510994789</span>
        <p className="text-gray-500 text-base">
          I'm {userName}, a software engineering student with a strong interest
          and experience in web development. I have worked with technologies
          such as React, Tailwind CSS, Next.js, and other modern web
          development tools.
        </p>
      </div>
    </div>
  </section>
);

export default ProfileCard;