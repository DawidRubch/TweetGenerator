import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { AnimatedPage } from "../../components/AnimatedPage";
import { api } from "../../utils/api";
import PricingLayout from "../../lib/layouts/PricingLayout";

export default function PricingPage() {
  return (
    <AnimatedPage className="flex h-5/6 items-center justify-center overflow-hidden text-white max-md:overflow-scroll">
      <div>
        <h1 className="m-5 text-4xl font-bold">Plans & Pricing</h1>
        <div
          className="flex max-md:flex-col max-md:items-center max-md:justify-center
"
        >
          <PricingComponent
            price={"5"}
            title="Intro"
            description="Unleash the power of the generator."
          ></PricingComponent>
          <PricingComponent
            price={"10"}
            title="Basic"
            description="Advanced tools to take your Twitter to the next level."
          ></PricingComponent>
          <PricingComponent
            price={"15"}
            title="Pro"
            description="Tools to enhance your Twitter."
          ></PricingComponent>
        </div>
      </div>
    </AnimatedPage>
  );
}

interface PricingComponentProps {
  price: "5" | "10" | "15";
  title: string;
  description: string;
}
const PricingComponent = ({
  price,
  title,
  description,
}: PricingComponentProps) => {
  const { payViaStripe, isLoading } = useStripePayment();

  const pay = () => {
    payViaStripe(price).catch((err) => console.log(err));
  };

  return (
    <div
      className=" m-5 w-full flex-shrink flex-grow basis-0 rounded-3xl bg-rgba-gray px-5 
    py-10 max-md:grid max-md:grid-cols-2 max-md:p-3"
    >
      <div className="col-start-2 row-span-1 my-10  text-5xl font-bold max-md:my-5 max-md:text-2xl">
        ${price}
        <span className="text-lg font-normal max-md:text-base">/month</span>
      </div>
      <div className="my-5 h-max text-3xl font-bold max-md:col-span-1 max-md:text-lg max-md:row-start-1">
        {title}
      </div>
      <div className="text-md max-md:col-span-2 max-md:row-start-2 max-sm:text-sm md:h-20">
        {description}
      </div>

      <button
        disabled={isLoading}
        className="my-10 ml-auto  mr-auto w-full rounded-full bg-[#371A46] py-3 px-12 disabled:opacity-50 max-md:col-span-2 max-md:row-start-3 max-md:my-3"
        onClick={pay}
      >
        Choose plan
      </button>
    </div>
  );
};

const useStripePayment = () => {
  const { mutateAsync: createCheckoutSession, isLoading } =
    api.payments.createCheckoutSession.useMutation();

  const { push } = useRouter();
  const { status } = useSession();

  const payViaStripe = async (price: "5" | "10" | "15") => {
    if (status !== "authenticated") {
      signIn("auth0").catch((err) => console.log(err));
      return;
    }

    const { checkoutUrl } = await createCheckoutSession({ price });
    if (checkoutUrl) {
      push(checkoutUrl).catch((err) => console.log(err));
    }
  };
  return { payViaStripe, isLoading };
};

PricingPage.getLayout = function getLayout(page: React.ReactElement) {
  return <PricingLayout>{page}</PricingLayout>;
};
