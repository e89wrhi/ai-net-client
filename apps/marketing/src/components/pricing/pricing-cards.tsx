'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { HeaderSection } from '@/components/layout/header-section';
import { Icons } from '../icons';
import MaxWidthWrapper from '@/components/layout/content-width-wrapper';
import { PricingData } from '@/config/subscription';

export default function PricingCards() {
  const [isYearly, setIsYearly] = useState(false);
  const toggleBilling = (value: string) => {
    setIsYearly(value === 'yearly');
  };

  return (
    <MaxWidthWrapper>
      <section className="flex flex-col">
        <HeaderSection
          label={'Pricing'}
          title={'Transparent Pricing for Every Scale'}
          subtitle="Simple, flexible pricing tiers designed to grow with you. Choose the plan that fits your needs."
        />

        <div className="mb-8 mt-10 flex justify-center items-center gap-5">
          <ToggleGroup
            type="single"
            size="sm"
            value={isYearly ? 'yearly' : 'monthly'}
            onValueChange={toggleBilling}
            aria-label="toggle-year"
            className="h-9 overflow-hidden rounded-full border bg-background p-1 *:h-7 *:text-muted-foreground"
          >
            <ToggleGroupItem
              value="yearly"
              className="rounded-full px-5 data-[state=on]:!bg-primary data-[state=on]:!text-primary-foreground"
              aria-label="Toggle yearly billing"
            >
              Yearly (-20%)
            </ToggleGroupItem>
            <ToggleGroupItem
              value="monthly"
              className="rounded-full px-5 data-[state=on]:!bg-primary data-[state=on]:!text-primary-foreground"
              aria-label="Toggle monthly billing"
            >
              Monthly
            </ToggleGroupItem>
          </ToggleGroup>
        </div>

        <div className="grid gap-6 bg-inherit py-5 lg:grid-cols-3">
          {PricingData().map((plan) => {
            const price = isYearly ? plan.prices.yearly : plan.prices.monthly;
            const displayPrice = isYearly ? price / 12 : price;
            const isPopular = plan.title === 'Pro';

            return (
              <Card
                key={plan.title}
                className={`relative flex flex-col overflow-hidden ${
                  isPopular ? '-m-0.5 border-2 border-primary' : ''
                }`}
              >
                {isPopular && (
                  <div className="absolute top-0 left-0 right-0 bg-primary text-primary-foreground text-center py-2 text-sm font-medium">
                    Most Popular
                  </div>
                )}

                <CardHeader className={`${isPopular ? 'pt-12' : ''}`}>
                  <CardTitle className="text-xl">{plan.title}</CardTitle>
                  <CardDescription>{plan.description}</CardDescription>
                  <div className="mt-4">
                    <div className="flex items-baseline">
                      <span className="text-4xl font-bold">
                        ${displayPrice}
                      </span>
                      <span className="text-muted-foreground ml-2">
                        /{isYearly ? 'month' : 'month'}
                      </span>
                    </div>
                    {isYearly && plan.prices.yearly > 0 && (
                      <p className="text-sm text-muted-foreground mt-1">
                        ${plan.prices.yearly} billed annually
                      </p>
                    )}
                  </div>
                </CardHeader>

                <CardContent className="flex-1">
                  <ul className="space-y-3">
                    {plan.benefits.map((benefit) => (
                      <li key={benefit} className="flex items-start gap-3">
                        <Icons.check className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                        <span className="text-sm">{benefit}</span>
                      </li>
                    ))}
                    {plan.limitations.map((limitation) => (
                      <li
                        key={limitation}
                        className="flex items-start gap-3 text-muted-foreground"
                      >
                        <Icons.close className="h-5 w-5 shrink-0 mt-0.5" />
                        <span className="text-sm">{limitation}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>

                <div className="p-6 pt-0">
                  <Button
                    className="w-full rounded-full"
                    variant={isPopular ? 'default' : 'outline'}
                  >
                    {plan.prices.monthly === 0
                      ? 'Get Started Free'
                      : 'Choose Plan'}
                  </Button>
                </div>
              </Card>
            );
          })}
        </div>

        <p className="mt-6 text-balance text-center text-base text-muted-foreground">
          Need a custom solution for your enterprise? <a href="/contact" className="text-primary underline">Contact us</a> for a tailored plan.
        </p>
      </section>
    </MaxWidthWrapper>
  );
}
