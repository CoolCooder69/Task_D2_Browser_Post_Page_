interface ProfilePhotoProps {
  imageUrl: string;
  userName: string;
}

const ProfilePhoto = ({ imageUrl, userName }: ProfilePhotoProps) => (
  <div className="relative group w-36 h-36 sm:w-48 sm:h-48 shrink-0 rounded-full overflow-hidden border-4 border-black">
    <img className="w-full h-full object-cover" src={imageUrl} alt="DP" />

    <div className="absolute inset-0 flex items-center justify-center bg-black/50 text-white text-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
      Hi I am {userName}.
    </div>
  </div>
);

export default ProfilePhoto;