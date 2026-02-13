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
      question: 'pricingFaq.item1.question',
      answer: 'pricingFaq.item1.answer',
    },
    {
      id: 'item2',
      question: 'pricingFaq.item2.question',
      answer: 'pricingFaq.item2.answer',
    },
    {
      id: 'item3',
      question: 'pricingFaq.item3.question',
      answer: 'pricingFaq.item3.answer',
    },
    {
      id: 'item4',
      question: 'pricingFaq.item4.question',
      answer: 'pricingFaq.item4.answer',
    },
    {
      id: 'item5',
      question: 'pricingFaq.item5.question',
      answer: 'pricingFaq.item5.answer',
    },
  ];

  return faqData;
};

export function PricingFaq() {
  return (
    <section className="container max-w-4xl py-2">
      <HeaderSection
        label={'Pricing Faq'}
        title={'Pricing faq more info'}
        subtitle=""
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
