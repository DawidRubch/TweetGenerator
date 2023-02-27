import { useStripePayment } from "../hooks/useStripePayment";

interface Props {
  price: "5" | "10" | "15";
  title: string;
  description: string;
}
export const PricingTile = ({
  price,
  title,
  description,
}: Props) => {
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
      <div className="my-5 h-max text-3xl font-bold max-md:col-span-1 max-md:row-start-1 max-md:text-lg">
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
