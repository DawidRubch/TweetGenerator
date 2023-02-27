import { api } from "../../../utils/api";
import { useRouter } from "next/router";
import { useSession, signIn } from "next-auth/react";

export const useStripePayment = () => {
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
