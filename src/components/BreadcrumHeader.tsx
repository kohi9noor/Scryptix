"use client";
import { usePathname } from "next/navigation";
import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
} from "./ui/breadcrumb";
import { MobileSidebar } from "./DesktopSideBar";

const BreadcrumHeader = () => {
  const pathName = usePathname();
  const paths = pathName === "/" ? [] : pathName?.split("/").filter(Boolean);

  return (
    <div className="flex items-center justify-center">
      <MobileSidebar />
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink className="capitalize" href="/">
              Home
            </BreadcrumbLink>
          </BreadcrumbItem>

          {paths.map((path, index) => {
            const cumulativePath = paths.slice(0, index + 1).join("/");
            return (
              <BreadcrumbItem key={index + 1}>
                <BreadcrumbLink
                  className="capitalize"
                  href={`/${cumulativePath}`}
                >
                  {path}
                </BreadcrumbLink>
              </BreadcrumbItem>
            );
          })}
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
};

export default BreadcrumHeader;
