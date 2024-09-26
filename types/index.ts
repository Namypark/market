//index.ts
import { InitOptions } from "payload/config";
import { PRODUCT_CATEGORIES } from "@/config";

type Category = (typeof PRODUCT_CATEGORIES)[number];

export declare interface NavItemProps {
  category: Category;
  handleOpen: () => void;
  isOpen: boolean;
  isAnyOpen: boolean;
}

export type Event = MouseEvent | TouchEvent;

export interface Args {
  initOptions?: Partial<InitOptions>;
}

export interface PageProps {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
}
