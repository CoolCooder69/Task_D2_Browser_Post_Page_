import * as React from "react";
import {  Link } from "react-router-dom";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

export function NavigateHover() {
  const date = new Date();

  const formatter = new Intl.DateTimeFormat("en-GB", {
    weekday: "short",
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
  const formattedDate = formatter.format(date);
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger className="text-mist-900 text-[15px]">
            {formattedDate}
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="w-[calc(100vw-3rem)] max-w-96">
              <ListItem href="/" title="Home"></ListItem>
              <ListItem href="/browse" title="Explore"></ListItem>
              <ListItem href="/newsletter" title="News Letter"></ListItem>
              <ListItem href="/pricing" title="Pricing"></ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}

function ListItem({
  title,
  children,
  href,
  ...props
}: React.ComponentPropsWithoutRef<"li"> & { href: string }) {
  return (
    <li {...props}>
      <NavigationMenuLink
        render={
          <Link to={href}>
            <div className="flex flex-col gap-1 text-sm">
              <div className="leading-none font-medium">{title}</div>
              <div className="line-clamp-2 text-muted-foreground">
                {children}
              </div>
            </div>
          </Link>
        }
      />
    </li>
  );
}