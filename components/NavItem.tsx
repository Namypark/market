"use client";
import React from "react";
import { Button } from "./ui/button";
import { PRODUCT_CATEGORIES } from "@/config";
import { NavItemProps } from "@/types";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import AnimateIn from "./AnimateIn";

const NavItem = ({ category, handleOpen, isOpen, isAnyOpen }: NavItemProps) => {
  return (
    <div className="flex">
      <div className="relative flex items-center">
        <Button
          className="gap-1.5 duration-500 ease-in-out transition-all rounded-md"
          onClick={handleOpen}
          variant={isOpen ? "secondary" : "ghost"}
        >
          {category.label}
          <ChevronDown
            className={cn(
              "h-4 w-4 transition-all duration-300 text-muted-foreground",
              {
                "-rotate-180": isOpen,
              }
            )}
          />
        </Button>
      </div>

      {isOpen ? (
        <div
          className={cn(
            "absolute inset-x-0 top-full text-sm text-muted-foreground",
            {
              "animate-in duration-1000 fade-in-100 slide-in-from-top-72":
                !isAnyOpen,
            }
          )}
        >
          {" "}
          <AnimateIn
            from="opacity-0 scale-105 -translate-y-8 blur-sm"
            to="opacity-100 scale-100 translate-y-0 translate-x-0 blur-none"
            delay={300}
            duration={300}
          >
            <div
              className="absolute inset-0  top-1/2 bg-secondary shadow"
              aria-hidden="true"
            >
              <div className="relative bg-secondary">
                <div className="mx-auto max-w-7xl px-8">
                  <div className="grid grid-cols-4 gap-x-8 gap-y-10 py-16">
                    <div className="col-span-4 col-start-1 grid grid-cols-3 gap-x-8">
                      {category.featured.map((item, index) => (
                        <div
                          key={index}
                          className="group relative text-base sm:text-sm"
                        >
                          <div className="relative aspect-video overflow-hidden rounded-lg bg-gray-100 group-hover:opacity-75">
                            <Image
                              src={item.imageSrc}
                              alt="product-category-image"
                              className="object-cover object-center"
                              fill
                            />
                          </div>
                          <Link href={item.href} className="mt-6 block font-md">
                            {item.name}
                          </Link>
                          <p
                            className="cursor-pointer mt-1 text-primary hover:text-muted-foreground"
                            aria-hidden="true"
                          >
                            Shop now
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </AnimateIn>
        </div>
      ) : null}
    </div>
  );
};

export default NavItem;
