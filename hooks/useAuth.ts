"use client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const useAuth = () => {
  const router = useRouter();
  const signOut = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/users/logout`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!res.ok) {
        throw new Error("Logout failed");
        toast.error("Logout failed");
      }
      const data = await res.json();

      router.push("/sign-in");
      router.refresh();

      toast.success("Logout successful");
    } catch (err) {
      console.error(err);
      toast.error("Couldn't log out");
    }
  };
  return { signOut };
};

export default useAuth;
