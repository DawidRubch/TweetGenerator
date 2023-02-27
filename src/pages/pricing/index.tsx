import { AnimatedPage } from "../../components/AnimatedPage";
import PricingLayout from "../../lib/layouts/PricingLayout";
import { PricingTile } from "../../lib/pricing/components/PricingTile";

export default function PricingPage() {
  return (
    <AnimatedPage className="flex h-5/6 items-center justify-center overflow-hidden text-white max-md:overflow-scroll">
      <div>
        <h1 className="m-5 text-4xl font-bold">Plans & Pricing</h1>
        <div
          className="flex max-md:flex-col max-md:items-center max-md:justify-center
"
        >
          <PricingTile
            price={"5"}
            title="Intro"
            description="Unleash the power of the generator."
          ></PricingTile>
          <PricingTile
            price={"10"}
            title="Basic"
            description="Advanced tools to take your Twitter to the next level."
          ></PricingTile>
          <PricingTile
            price={"15"}
            title="Pro"
            description="Tools to enhance your Twitter."
          ></PricingTile>
        </div>
      </div>
    </AnimatedPage>
  );
}



PricingPage.getLayout = function getLayout(page: React.ReactElement) {
  return <PricingLayout>{page}</PricingLayout>;
};
