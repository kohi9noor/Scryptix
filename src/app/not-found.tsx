import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import React from "react";

const NotFound = () => {
  return (
    <div className=" flex flex-col items-center justify-center min-h-screen p-4">
      <div className=" text-center">
        <h1 className=" text-6xl font-bold mb-4 text-primary">404</h1>
        <h2 className="text-2xl font-semibold mb-4">Page not found</h2>
        <p className=" text-muted-foreground mb-8 max-w-md">
          Don&apos;t worry, even the best data sometimes gets lost in the
          internet.
        </p>

        <div className=" flex sm:flex-row flex-col justify-center gap-4">
          <Link
            href={"/"}
            className=" flex items-center justify-center px-4 py-2  bg-primary rounded-md hover:bg-primary/80 transition-colors text-white"
          >
            <ArrowLeft className=" w-4 h-4 mr-2" />
            Back to Dashboard
          </Link>
        </div>
      </div>

      <footer className=" mt-12 text-center">
        <p className=" text-sem text-muted-foreground">
          If you believe this is an error, please contact our support team.
        </p>
      </footer>
    </div>
  );
};

export default NotFound;
