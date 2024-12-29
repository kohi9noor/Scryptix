import BreadcrumHeader from "@/components/BreadcrumHeader";
import DesktopSideBar from "@/components/DesktopSideBar";
import { ModeToggle } from "@/components/mood-toggle";
import { Separator } from "@/components/ui/separator";
import { SignedIn, UserButton } from "@clerk/nextjs";
import React from "react";

const DahboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className=" flex h-screen">
      <DesktopSideBar />
      <div className=" flex flex-col flex-1 min-h-screen">
        <header className=" flex items-center justify-between px-6 py-4 h-[50px] ">
          <BreadcrumHeader />
          <div className=" gap-4 flex items-center">
            <ModeToggle />
            <SignedIn>
              <UserButton />
            </SignedIn>
          </div>
        </header>
        <Separator />
        <div className=" overflow-auto">
          <div className=" flex-1 py-4 px-6 text-accent-foreground">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DahboardLayout;
