import { constructMetadata } from '@/lib/utils';
import PricingCards from '@/components/pricing/pricing-cards';
import { PricingFaq } from '@/components/pricing/pricing-faq';
//import { getPlans } from '@/lib/stripe/stripe';

export const metadata = constructMetadata({
  title: 'Pricing – AInet',
  description:
    'Choose the perfect plan for your AI workflows. Scale from a hobbyist to enterprise with AInet.',
});

export default async function PricingPage() {
  return (
    <div className="bg-white dark:bg-black flex w-full flex-col gap-16 py-8 md:py-8">
      <PricingCards />
      <hr className="container" />
      <PricingFaq />
    </div>
  );
}
