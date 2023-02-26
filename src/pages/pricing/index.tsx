import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { AnimatedPage } from "../../components/AnimatedPage";
import { api } from "../../utils/api";
import PricingLayout from "./layout";

export default function PricingPage() {
  return (
    <AnimatedPage className=" flex h-5/6 items-center justify-center overflow-hidden text-white">
      <div>
        <h1 className="m-5 text-4xl font-bold">Plans & Pricing</h1>
        <div
          className="flex
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
    <div className="m-5 flex-shrink flex-grow basis-0 rounded-3xl bg-rgba-gray px-5 py-10">
      <div className="my-10 text-5xl font-bold">
        ${price} <span className="text-lg font-normal">/month</span>
      </div>
      <div className="my-5 text-3xl font-bold ">{title}</div>
      <div className="text-md h-20">{description}</div>

      <button
        disabled={isLoading}
        className="my-10 ml-auto mr-auto w-full rounded-full bg-[#371A46] py-3 px-12 disabled:opacity-50"
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
