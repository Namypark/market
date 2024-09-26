"use client";

import VerifyEmail from "@/components/verifyEmail";
import Image from "next/image";
import { useSearchParams } from "next/navigation";

const VerifyEmailComponent = () => {
  // const [token, setToken] = useState<string | null>(null);
  // const [toEmail, setToEmail] = useState<string | null>(null);

  const searchParams = useSearchParams();

  const token = searchParams.get("token");
  const toEmail = searchParams.get("to");

  return (
    <div className="container relative flex pt-20 flex-col items-center justify-center lg:px-0">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        {token && typeof token === "string" ? (
          <div className="grid gap-6">
            <VerifyEmail token={token} />
          </div>
        ) : (
          <div className="flex h-full flex-col items-center justify-center space-y-1">
            <div className="relative mb-4 h-60 w-60 text-muted-foreground flex justify-center">
              <Image
                src={`/hippo-email-sent-light.png`}
                width={1000}
                height={1000}
                alt="hippo sent email"
                className="dark:hidden" // Shown only in light theme
              />
              <Image
                src={`/hippo-email-sent-dark.png`}
                width={1000}
                height={1000}
                alt="hippo sent email"
                className="hidden dark:block" // Shown only in dark theme
              />
            </div>
            <h3 className="font-semibold text-2xl">Check your email</h3>
            {toEmail ? (
              <p className="text-muted-foreground text-center">
                we&apos;ve sent a verification link to{" "}
                <span className="font-semibold">{toEmail}</span>.
              </p>
            ) : (
              <p className="text-center text-muted-foreground">
                We&apos;ve sent a verification link to your email.
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default VerifyEmailComponent;
