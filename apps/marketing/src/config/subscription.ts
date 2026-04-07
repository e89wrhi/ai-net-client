import { PlansRow, SubscriptionPlan } from '@/types';

export function PricingData(): SubscriptionPlan[] {
  return [
    {
      title: 'Starter',
      description: 'Ideal for individuals and hobbyists starting their AI journey.',
      benefits: [
        '100 AI Generations / month',
        'Access to basic AI models',
        'Standard processing speed',
        'Community support',
      ],
      limitations: [
        'No API access',
        'Standard support only',
        'Limited model selection',
        'Watermarked exports',
      ],
      prices: {
        monthly: 0,
        yearly: 0,
      },
      stripeIds: {
        monthly: null,
        yearly: null,
      },
    },
    {
      title: 'Pro',
      description: 'Unlock advanced features and higher limits for professional use.',
      benefits: [
        '1,000 AI Generations / month',
        'Access to advanced AI models',
        'Priority processing speed',
        'Email & Chat support',
        'Custom branding removal',
        'SEO optimization tools',
      ],
      limitations: [
        'Limited API access',
        'Individual usage only',
      ],
      prices: {
        monthly: 29,
        yearly: 288,
      },
      stripeIds: {
        monthly: '',
        yearly: '',
      },
    },
    {
      title: 'Business',
      description: 'Production-grade AI solutions for teams and growing businesses.',
      benefits: [
        'Unlimited AI Generations',
        'Full API access',
        'Dedicated account manager',
        'White-label options',
        'Bulk upload & processing',
        'Enterprise-grade security',
        'Custom model training',
        'Advanced analytics',
      ],
      limitations: [],
      prices: {
        monthly: 79,
        yearly: 768,
      },
      stripeIds: {
        monthly: '',
        yearly: '',
      },
    },
  ];
}

export function PlanColumns(): string[] {
  return ['Starter', 'Pro', 'Business', 'Enterprise'];
}

export function ComparePlans(): PlansRow[] {
  return [
    {
      feature: 'Monthly Generations',
      starter: '100',
      pro: '1,000',
      business: 'Unlimited',
      enterprise: 'Custom',
      tooltip: 'Number of AI-generated items allowed per month.',
    },
    {
      feature: 'AI Model Quality',
      starter: 'Standard',
      pro: 'Advanced',
      business: 'Premium',
      enterprise: 'Custom / Fine-tuned',
      tooltip: 'The sophisticated level of the AI models used.',
    },
    {
      feature: 'Processing Speed',
      starter: 'Standard',
      pro: 'High Speed',
      business: 'Real-time',
      enterprise: 'Dedicated',
      tooltip: 'Priority in the generation queue.',
    },
    {
      feature: 'API Access',
      starter: false,
      pro: 'Basic',
      business: 'Full Access',
      enterprise: 'High Throughput',
      tooltip: 'Connect your own applications to our AI engine.',
    },
    {
      feature: 'Custom Branding',
      starter: false,
      pro: true,
      business: true,
      enterprise: true,
      tooltip: 'Remove our branding and use your own logos.',
    },
    {
      feature: 'SEO Optimization',
      starter: false,
      pro: true,
      business: true,
      enterprise: true,
      tooltip: 'AI-driven SEO recommendations for your content.',
    },
    {
      feature: 'Support',
      starter: 'Community',
      pro: 'Priority Email',
      business: 'Priority Chat',
      enterprise: 'Dedicated Manager',
      tooltip: 'The level of customer support provided.',
    },
  ];
}

