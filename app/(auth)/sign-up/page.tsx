"use client";
import { Icons } from "@/components/Icons";
import { Button, buttonVariants } from "@/components/ui/button";
import { ArrowRight, EyeIcon, LockIcon, MailIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "@/hooks/use-toast";
import { accountFormSchema } from "@/lib/validators/account-credentials";

const Signup = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof accountFormSchema>>({
    resolver: zodResolver(accountFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const onSubmit = ({ email, password }: z.infer<typeof accountFormSchema>) => {
    toast({
      title: "Successful",
      variant: "default",
      description: "Your registration was successful",
    });
    // send the data to the server
  };

  return (
    <div className="container relative flex pt-20 flex-col items-center justify-center lg:px-0">
      <div className="mx-auto w-full justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col items-center space-y-2 text-center">
          <Icons.logo className="h-20" />
          <h1 className="text-2xl font-bold">Create an Account</h1>
          <Link
            href="/sign-in"
            className={buttonVariants({
              variant: "link",
              className: "gap-1.5",
            })}
          >
            Already have an account? sign in
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
              </div>
              <Button type="submit">Sign up</Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
