"use client";
import { Icons } from "@/components/Icons";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { cn } from "@/lib/utils";
import { accountFormSchema } from "@/lib/validators/account-credentials";
import { trpc } from "@/trpc/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, LockIcon, MailIcon } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const SignIn = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const isSeller = searchParams.get("as") === "seller";
  const origin = searchParams.get("origin");

  const continueAsSeller = () => {
    router.push("?as=seller");
  };
  const continueAsBuyer = () => {
    router.replace("/sign-in", undefined);
  };
  //   const toEmail = searchParams.get("to");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof accountFormSchema>>({
    resolver: zodResolver(accountFormSchema),
  });
  const { mutateAsync: signIn, isPending } = trpc.auth.SignIn.useMutation({
    onSuccess: () => {
      toast.success("signed in successfully");

      if (origin) {
        router.push(`/${origin}`);
        return;
      }
      if (isSeller) {
        router.push("/sell");
        return;
      }
      router.push("/");
      router.refresh();
    },
    onError: (err) => {
      if (err.data?.code === "UNAUTHORIZED") {
        toast.error("Invalid email or password");
      }
    },
  });

  const onSubmit = async ({
    email,
    password,
  }: z.infer<typeof accountFormSchema>) => {
    return await signIn({ email, password });
  };
  return (
    <div className="container relative flex pt-20 flex-col items-center justify-center lg:px-0">
      <div className="mx-auto w-full justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col items-center space-y-2 text-center">
          <Icons.logo className="h-20" />
          <h1 className="text-2xl font-bold">Sign in to your account</h1>
          <Link
            href="/sign-up"
            className={buttonVariants({
              variant: "link",
              className: "gap-1.5",
            })}
          >
            Don&apos;t have an account? sign up
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid gap-6">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid gap-2">
              <div className="grid gap-2 py-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  {...register("email")}
                  type="email"
                  id="email"
                  placeholder="you@example.com"
                  className={cn({ "focus-visible:ring-red-500": errors.email })}
                  suffix={<MailIcon />}
                />
                {errors.email && (
                  <p className="text-sm text-red-600">{errors.email.message}</p>
                )}
              </div>
              <div className="grid gap-2 py-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  {...register("password")}
                  type="password"
                  id="password"
                  placeholder="Enter your password"
                  className={cn({
                    "focus-visible:ring-red-500": errors.password,
                  })}
                  suffix={<LockIcon />}
                />
                {errors.password && (
                  <p className="text-sm text-red-600">
                    {errors.password.message}
                  </p>
                )}
              </div>
              <Button type="submit">Sign in</Button>
            </div>
          </form>

          <div className="relative">
            <div
              aria-hidden="true"
              className="absolute inset-0 flex items-center"
            >
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                or
              </span>
            </div>
          </div>
          {isSeller ? (
            <Button
              onClick={continueAsBuyer}
              // className="secondary"
              variant="secondary"
              disabled={isPending}
            >
              Continue as customer
            </Button>
          ) : (
            <Button
              onClick={continueAsSeller}
              className="transition-all duration-500 ease-in-out"
              variant="secondary"
              disabled={isPending}
            >
              continue as seller
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};
export default SignIn;
