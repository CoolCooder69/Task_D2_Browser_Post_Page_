import { Globe, Heart, Mail, MessageCircle, Phone } from "lucide-react";
import Heading1 from "./heading1";
import CustomLink from "./link";
import type { NavLink, SocialLink } from "@/types";

const exploreLinks: NavLink[] = [
  { title: "Home", url: "/" },
  { title: "Gallery", url: "/gallery" },
  { title: "Articles", url: "/articles" },
  { title: "Tutorials", url: "/tutorials" },
];

const supportLinks: NavLink[] = [
  { title: "FAQ", url: "/faq" },
  { title: "Contact Us", url: "/contact" },
  { title: "Privacy Policy", url: "/privacy" },
  { title: "Terms of Service", url: "/terms" },
];

const socialLinks: SocialLink[] = [
  { name: "Email", url: "mailto:#", icon: Mail },
  { name: "Website", url: "/", icon: Globe },
  { name: "Contact", url: "#", icon: MessageCircle },
  { name: "Phone", url: "tel:+911234567890", icon: Phone },
];

const Footer = () => {
  return (
    <>
      <footer>
        <div className="w-full min-h-64 flex flex-col md:flex-row justify-between items-start gap-8 py-8 px-6 sm:px-10 lg:px-20 bg-black text-white border-t">
          <div className="flex flex-col gap-2">
            <Heading1 title="Explore" />
            {exploreLinks.map((link) => (
              <CustomLink key={link.title} url={link.url} title={link.title} />
            ))}
          </div>

          <div className="flex flex-col gap-2">
            <Heading1 title="Support" />
            {supportLinks.map((link) => (
              <CustomLink key={link.title} url={link.url} title={link.title} />
            ))}
          </div>

          <div className="flex flex-col gap-3">
            <Heading1 title="Stay Connected" />
            <p className="text-gray-400 max-w-xs">
              Connect with us and stay updated with the latest articles,
              tutorials and projects.
            </p>
            <div className="flex gap-3">
              {socialLinks.map(({ name, url, icon: Icon }) => (
                <a
                  key={name}
                  href={url}
                  className="p-2 rounded-full bg-gray-800 hover:bg-yellow-200 hover:text-black transition duration-200"
                  aria-label={name}
                >
                  <Icon size={20} />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="w-full px-6 sm:px-10 lg:px-20 py-4 bg-gray-950 text-gray-500 flex justify-between text-sm">
          <span className="w-full flex flex-wrap gap-1.5 justify-center items-center text-yellow-200">
            Made with <Heart size={18}/> by Ravneet.
          </span>
        </div>
      </footer>
    </>
  );
};


export default Footer;