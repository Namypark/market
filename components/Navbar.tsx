import React from "react";
import MaxWidthWrapper from "./MaxWidthWrapper";
import Link from "next/link";
import { Icons } from "./Icons";
import NavItems from "./NavItems";
import { buttonVariants } from "./ui/button";
import Cart from "./Cart";
import { ModeToggle } from "./ModeToggle";
import { getServerSideUser } from "@/lib/payload-utils";
import { cookies } from "next/headers";
import UserAccountNav from "./UserAccountNav";
import { LogIn } from "lucide-react";

const Navbar = async () => {
  const nextCookies = cookies();
  const { user } = await getServerSideUser(nextCookies);
  console.log(user);
  // const user = null;
  await getServerSideUser(nextCookies);
  return (
    <div className="bg-background sticky z-50 top-0 inset-x-0 h-16">
      <header className="">
        <MaxWidthWrapper>
          <div className="relative bg-background">
            <div className="border-b border-border ">
              <div className="flex h-16 items-center">
                {/* TODO MOBILE NAV */}

                {/* Items in the Nav are here we have the parent flex items-center so everything that needs to be in the Nav section just put a div after the other for structuring */}
                <div className="ml-4 flex lg:ml-0">
                  <Link href="/">
                    <Icons.logo className="h-10 w-10" />
                  </Link>
                </div>
                <div className="ml-4">
                  <ModeToggle />
                </div>

                {/* UI kit and icons*/}
                <div className="hidden z-50 lg:ml-8 lg:block lg:self-stretch">
                  <NavItems />
                </div>
                {/* sign in start */}
                <div className="ml-auto flex items-center">
                  <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
                    {user ? null : (
                      <Link
                        href="/sign-in"
                        className={`${buttonVariants({
                          variant: "ghost",
                        })} duration-500 ease-in-out transition-all rounded-md`}
                      >
                        <LogIn className="mr-2 h-4 w-4" />
                        Sign in
                      </Link>
                    )}
                    {user ? null : (
                      <span
                        className="h-6 w-px bg-gray-200"
                        aria-hidden="true"
                      />
                    )}
                    {user ? (
                      <UserAccountNav user={user} />
                    ) : (
                      <Link
                        href="/sign-up"
                        className={`${buttonVariants({
                          variant: "ghost",
                        })} duration-500 ease-in-out transition-all rounded-md`}
                      >
                        Create account
                      </Link>
                    )}
                    {user ? (
                      <span
                        className="h-6 w-px bg-gray-200"
                        aria-hidden="true"
                      />
                    ) : null}
                    {user ? null : (
                      <div className="flex lg:ml-6">
                        <span
                          className="h-6 w-px bg-gray-200"
                          aria-hidden="true"
                        />
                      </div>
                    )}
                    <div className="ml-4 flow-root lg:ml-6">
                      <Cart />
                    </div>
                  </div>
                </div>
                {/* sign in end */}
              </div>
            </div>
          </div>
        </MaxWidthWrapper>
      </header>
    </div>
  );
};

export default Navbar;
