"use client";

import { trpc } from "@/trpc/client";
import {
  ArrowUpRightFromSquare,
  Loader,
  MoveRightIcon,
  XCircle,
} from "lucide-react";
import Image from "next/image";
import { buttonVariants } from "./ui/button";
import Link from "next/link";
import LoaderSpinner from "./LoaderSpinner";

const VerifyEmail = ({ token }: { token: string }) => {
  const { data, isLoading, isError } = trpc.auth.VerifyEmail.useQuery({
    token,
  });
  if (isError) {
    return (
      <div className="flex flex-col items-center gap-2">
        <XCircle className="h-8 w-8 text-red-600 animate-bounce" />
        <h3 className="font-semibold text-xl">There was a problem</h3>
        <p className="text-sm">
          This token is not valid or might have been expired
        </p>
      </div>
    );
  }
  if (data?.success) {
    return (
      <div className="flex h-full flex-col items-center justify-center">
        <div className="relative mb-4 h-60 w-60 text-muted-foreground">
          <Image
            src={`/hippo-email-sent-light.png`}
            fill
            alt="The email sent"
            className="dark:hidden" // Shown only in light theme
          />
          <Image
            src={`/hippo-email-sent-dark.png`}
            fill
            alt="The email sent"
            className="hidden dark:block" // Shown only in dark theme
          />
        </div>
        <h3 className="font-semibold text-2xl">You&apos;re all set!</h3>
        <p className="text-muted-foreground text-center mt-1">
          Thank you for verifying your email.
        </p>
        <Link
          className={buttonVariants({
            className: "mt-4 gap-2",
          })}
          href="/sign-in"
        >
          Sign in
          <MoveRightIcon />
        </Link>
      </div>
    );
  }
  if (isLoading) {
    return (
      <div className="flex flex-col items-center gap-2">
        <LoaderSpinner />
        <h3 className="font-semibold text-xl wave-text">
          <span>V</span>
          <span>e</span>
          <span>r</span>
          <span>i</span>
          <span>f</span>
          <span>y</span>
          <span>i</span>
          <span>n</span>
          <span>g</span>
          <span>.</span>
          <span>.</span>
          <span>.</span>
        </h3>
        <p className="text-sm">
          This token is not valid or might have been expired
        </p>
      </div>
    );
  }
};
export default VerifyEmail;
