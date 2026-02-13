import { constructMetadata } from '@/lib/utils';
import PricingCards from '@/components/pricing/pricing-cards';
import { PricingFaq } from '@/components/pricing/pricing-faq';
//import { getPlans } from '@/lib/stripe/stripe';

export const metadata = constructMetadata({
  title: 'Pricing – AInet',
  description:
    'Choose the perfect plan to try ai features. Free starter plan available.',
});

export default async function PricingPage() {
  return (
    <div className="flex w-full flex-col gap-16 py-8 md:py-8">
      <PricingCards />
      <hr className="container" />
      <PricingFaq />
    </div>
  );
}
