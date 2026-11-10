import { Target } from "lucide-react";

interface LogoProps {
  name: string;
}

const Logo = ({ name }: LogoProps) => {
  return (
    <div className="bg-black text-lg sm:text-2xl text-white cursor-pointer px-2 whitespace-nowrap flex justify-center gap-2">
      <Target></Target>
      <span>{name}</span>
      <Target></Target>
    </div>
  );
};

export default Logo;