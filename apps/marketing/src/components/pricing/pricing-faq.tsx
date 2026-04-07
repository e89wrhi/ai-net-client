import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

import { HeaderSection } from '../layout/header-section';

const PricingFaqs = () => {
  const faqData = [
    {
      id: 'item1',
      question: 'Can I change my plan later?',
      answer: 'Yes, you can upgrade or downgrade your plan at any time through your dashboard. Changes to your billing will be applied on the next billing cycle.',
    },
    {
      id: 'item2',
      question: 'Is there a free trial available?',
      answer: 'We offer a Free Starter plan that allows you to explore our basic AI features with no credit card required. It is a great way to test the platform before committing to a paid plan.',
    },
    {
      id: 'item3',
      question: 'What happens if I reach my generation limit?',
      answer: 'If you reach your limit, you can either upgrade to a higher tier or wait until your next billing cycle for your limit to reset. We will notify you when you are close to your limit.',
    },
    {
      id: 'item4',
      question: 'Do you offer custom enterprise solutions?',
      answer: 'Absolutely! For large-scale requirements, custom model training, or specific compliance needs, please contact our sales team for a custom Enterprise quote.',
    },
    {
      id: 'item5',
      question: 'What payment methods do you accept?',
      answer: 'We accept all major credit cards including Visa, Mastercard, and American Express. For Enterprise plans, we also support bank transfers and custom invoicing.',
    },
  ];

  return faqData;
};

export function PricingFaq() {
  return (
    <section className="container max-w-4xl py-2">
      <HeaderSection
        label={'FAQ'}
        title={'Frequently Asked Questions'}
        subtitle="Everything you need to know about our pricing and plans."
      />

      <Accordion type="single" collapsible className="my-12 w-full">
        {PricingFaqs().map((faqItem) => (
          <AccordionItem key={faqItem.id} value={faqItem.id}>
            <AccordionTrigger>{faqItem.question}</AccordionTrigger>
            <AccordionContent className="text-sm text-muted-foreground sm:text-[15px]">
              {faqItem.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}

