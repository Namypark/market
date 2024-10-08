"use client";
import { Icons } from "@/components/Icons";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
// import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { accountFormSchema } from "@/lib/validators/account-credentials";
import { trpc } from "@/trpc/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, LockIcon, MailIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z, ZodError } from "zod";
const Signup = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof accountFormSchema>>({
    resolver: zodResolver(accountFormSchema),
  });
  const { mutateAsync } = trpc.auth.createPayloadUser.useMutation({
    onError: (err) => {
      if (err.data?.code === "CONFLICT") {
        toast.error("There seems to be an error", {
          description:
            "An account with this email already exists, sign-in instead?",
        });
        return;
      }
      if (err instanceof ZodError) {
        toast.error(err.issues[0].message);
        return;
      }
    },
    onSuccess: ({ sentToEmail }) => {
      toast.success("Your account has ben created successfully", {
        description: "Please check your the link sent to verify your account",
      });
      router.push(`/verify-email?to=${sentToEmail}`);
    },
  });

  const onSubmit = async ({
    email,
    password,
  }: z.infer<typeof accountFormSchema>) => {
    return await mutateAsync({ email, password });
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
              <Button type="submit">Sign up</Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
