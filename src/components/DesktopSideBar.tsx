"use client";

import {
  CoinsIcon,
  ShieldCheckIcon,
  HomeIcon,
  Layers2Icon,
  MenuIcon,
} from "lucide-react";

import Logo from "./Logo";
import Link from "next/link";
import { buttonVariants } from "./ui/button";
import { useParams, usePathname } from "next/navigation";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { useState } from "react";
import TooltipWrapper from "./TooltipWrapper";

const routes = [
  {
    href: "",
    label: "Home",
    icon: HomeIcon,
  },
  {
    href: "workflows",
    label: "WorkFlows",
    icon: Layers2Icon,
  },
  {
    href: "credentials",
    label: "credentials",
    icon: ShieldCheckIcon,
  },
  {
    href: "billing",
    label: "Billing",
    icon: CoinsIcon,
  },
];
const DesktopSideBar = ({}) => {
  const pathname = usePathname();
  const activeRoute =
    routes.find(
      (routes) => routes.href.length > 0 && pathname.includes(routes.href)
    ) || routes[0];

  return (
    <div className=" hidden relative md:block min-w-[40px] h-screen overflow-hidden w-auto bg-primary/5 dark:bg-secondary/30 dark:text-foreground text-muted-foreground border-r-2 border-separate">
      {/* <div className=" flex items-center justify-center gap-2 border-b-[1px] border-separate p-4">
        <Logo />
      </div> */}

      <div className=" flex py-4 px-2 flex-col items-center gap-1">
        {routes.map((route) => (
          <Link
            key={route.label}
            className={buttonVariants({
              variant:
                activeRoute.href == route.href
                  ? "sidebarActiveItem"
                  : "sidebarItem",
            })}
            href={route.href}
          >
            <TooltipWrapper content={route.label}>
              <route.icon size={30}></route.icon>
            </TooltipWrapper>
          </Link>
        ))}
      </div>
    </div>
  );
};
export function MobileSidebar() {
  const pathname = usePathname();
  const activeRoute =
    routes.find(
      (routes) => routes.href.length > 0 && pathname.includes(routes.href)
    ) || routes[0];

  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className=" block md:hidden border-separate bg-background">
      <nav className=" flex items-center justify-between mr-4">
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <MenuIcon />
          </SheetTrigger>
          <SheetContent
            className=" w-[400px] sm:-[450px] space-y-4"
            side={"left"}
          >
            <Logo />
            <div className=" flex flex-col p-2 gap-1">
              {routes.map((route) => (
                <Link
                  key={route.label}
                  className={buttonVariants({
                    variant:
                      activeRoute.href == route.href
                        ? "sidebarActiveItem"
                        : "sidebarItem",
                  })}
                  onClick={() => setIsOpen((prev) => !prev)}
                  href={route.href}
                >
                  <route.icon size={20}></route.icon>
                  {route.label}
                </Link>
              ))}
            </div>
          </SheetContent>
        </Sheet>
      </nav>
    </div>
  );
}
export default DesktopSideBar;
