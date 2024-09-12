"use client";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ShoppingCart } from "lucide-react";

import { Separator } from "@/components/ui/separator";
import { format } from "path";
import { formatPrice } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";
import { useTheme } from "next-themes";

const Cart = () => {
  const { resolvedTheme, theme } = useTheme();
  console.log(theme);
  const itemCount = 0;
  const fee = 20;
  return (
    <Sheet>
      <SheetTrigger
        asChild
        className="group cursor-pointer -m-2 flex items-center p-2"
      >
        <div className="flex items-center">
          <ShoppingCart
            aria-hidden="true"
            className=" h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-800 transition-all ease-in-out duration-300"
          />
          <span className="ml-2 text-gray-400 group-hover:text-gray-800 transition-all ease-in-out duration-300">
            {itemCount}
          </span>
        </div>
      </SheetTrigger>
      <SheetContent className="flex w-full flex-col pr-0 sm:max-w-lg border-l-black">
        <SheetHeader className="space-y-2.5 pr-6">
          <SheetTitle>Cart({itemCount})</SheetTitle>
        </SheetHeader>

        {itemCount > 0 ? (
          <>
            <div className="flex w-full flex-col pr-6">
              {/*cart logic */}
              something should be done here
            </div>
            <div className="space-y-4 pr-6">
              <Separator />
              <div className="space-y-1.5 text-sm">
                <div className="flex">
                  <span className="flex-1">Shipping</span>
                  <span>Free</span>
                </div>
                <div className="flex">
                  <span className="flex-1">Transaction Fee</span>
                  <span>{formatPrice(fee, { currency: "USD" })}</span>
                </div>
                <div className="flex">
                  <span className="flex-1">Total</span>
                  <span>{formatPrice(fee, { currency: "USD" })}</span>
                </div>
              </div>
              <SheetFooter>
                <SheetTrigger asChild>
                  <Link
                    href="/cart"
                    className={buttonVariants({
                      className: "w-full",
                    })}
                  >
                    Proceed to checkout
                  </Link>
                </SheetTrigger>
              </SheetFooter>
            </div>
          </>
        ) : (
          <div className="flex h-full flex-col items-center justify-center space-y-1">
            <div aria-hidden="true" className="relative mb-4 h-60 w-60">
              <Image
                src={
                  theme === "dark"
                    ? "/normal-hippo-dark.png"
                    : "/hippo-empty-cart.png"
                }
                alt="empty shopping cart hippo"
                fill
              />
            </div>
            <div className="text-xl font-medium">Your cart is empty</div>
            <SheetTrigger>
              <Link
                href="/products"
                className={buttonVariants({
                  variant: "link",
                  className: "text-sm text-muted-foreground",
                })}
              >
                Add items to your cart to checkout
              </Link>
            </SheetTrigger>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};
export default Cart;
