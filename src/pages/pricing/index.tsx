import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { api } from "../../utils/api";

export default function () {
  return (
    <section className=" flex h-full items-center justify-center overflow-hidden text-white">
      <div>
        <h1 className="m-5 text-4xl font-bold">Plans & Pricing</h1>
        <div
          className="flex
"
        >
          <PricingComponent
            price={5}
            title="Intro"
            description="Unleash the power of the generator."
          ></PricingComponent>
          <PricingComponent
            price={10}
            title="Basic"
            description="Advanced tools to take your Twitter to the next level."
          ></PricingComponent>
          <PricingComponent
            price={15}
            title="Pro"
            description="Tools to enhance your Twitter."
          ></PricingComponent>
        </div>
      </div>
    </section>
  );
}

interface PricingComponentProps {
  price: number;
  title: string;
  description: string;
}
const PricingComponent = ({
  price,
  title,
  description,
}: PricingComponentProps) => {
  const payViaStripe = useStripePayment();

  return (
    <div className="m-5 flex-shrink flex-grow basis-0  rounded-3xl bg-rgba-gray px-5 py-10">
      <div className="my-10 text-4xl font-bold">${price} /month</div>
      <div className="my-5 text-3xl font-bold ">{title}</div>
      <div className="text-md h-20">{description}</div>

      <button
        className="my-10 ml-auto mr-auto rounded-full bg-[#371A46] py-3 px-12"
        onClick={payViaStripe}
      >
        Choose plan
      </button>
    </div>
  );
};

const useStripePayment = () => {
  const { mutateAsync: createBillingPortalSession } =
    api.payments.createBillingPortalSession.useMutation();

  const { push } = useRouter();
  const { status } = useSession();

  const payViaStripe = async () => {
    if (status !== "authenticated") {
      signIn("auth0");
      return;
    }

    const { billingPortalUrl } = await createBillingPortalSession();
    if (billingPortalUrl) {
      push(billingPortalUrl);
    }
  };
  return payViaStripe;
};
