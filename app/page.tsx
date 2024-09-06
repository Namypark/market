import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { Button, buttonVariants } from "@/components/ui/button";
import { ArrowDownToLine, CheckCircle, Leaf } from "lucide-react";
import Link from "next/link";

const Home = () => {
  const perks = [
    {
      name: "Instant delivery",
      icon: ArrowDownToLine,
      description:
        "Get your assets delivered to your email in seconds and download them right away",
    },
    {
      name: "Guaranteed Quality",
      icon: CheckCircle,
      description:
        "Every asset on our platform is verified by our team to ensure our highest quality standards",
    },
    {
      name: "For the planet",
      icon: Leaf,
      description:
        "We have some products we can't just wait for you to see and we hope you love it.",
    },
  ];
  return (
    <MaxWidthWrapper className="">
      <div className="py-20 mx-auto text-center flex items-center flex-col max-w-3xl">
        <h1 className="text-4xl font-bold tracking-tight sm:text-6xl text-secondary-muted">
          Your marketplace for high-quality{" "}
          <span className="text-blue-600">digital assets.</span>
        </h1>
        <p className="mt-9 text-lg max-w-prose text-muted-foreground">
          Welcome to Hippo. Every asset on our platform is verified by our team
          to ensure high quality standards
        </p>
        <div className="flex flex-col sm:flex-row gap-4 mt-6">
          <Link href="/products" className={buttonVariants()}>
            Browse Trending
          </Link>
          <Button
            variant="ghost"
            className="animate duration-700 ease-in-out transition-all"
          >
            Our quality promise &rarr;
          </Button>
        </div>
      </div>
      {/*TODO: List products*/}
      <section className="border-t border-secondary bg-secondary">
        <MaxWidthWrapper className="py-20">
          <div className="grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-3 lg:gap-x-8 lg:gap-y-0 ">
            {perks.map((perk) => (
              <div
                key={perk.name}
                className="text-center md:flex md:items-start md:text-left lg:block lg:text-center"
              >
                <div className="md:flex-shrink-0 flex justify-center">
                  <div className="h-16 w-16 items-center justify-center flex rounded-full bg-blue-900">
                    {<perk.icon className="w-1/3 h-1/3" />}
                  </div>
                </div>
                <div className="mt-6 md:ml-4 md:mt-4 lg:ml-0 lg-mt-6">
                  <h3 className="text-base font-medium text-secondary-muted">
                    {perk.name}
                  </h3>
                  <p className="mt-3 text-sm text-muted-foreground">
                    {perk.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </MaxWidthWrapper>
      </section>
    </MaxWidthWrapper>
  );
};

export default Home;
