import { PlansRow, SubscriptionPlan } from '@/types';

export function PricingData(): SubscriptionPlan[] {
  return [
    {
      title: 'starterTitle',
      description: 'starterDescription',
      benefits: [
        'starterBenefit1',
        'starterBenefit2',
        'starterBenefit3',
        'starterBenefit4',
      ],
      limitations: [
        'starterLimitation1',
        'starterLimitation2',
        'starterLimitation3',
        'starterLimitation4',
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
      title: 'proTitle',
      description: 'proDescription',
      benefits: [
        'proBenefit1',
        'proBenefit2',
        'proBenefit3',
        'proBenefit4',
        'proBenefit5',
        'proBenefit6',
        'proBenefit7',
      ],
      limitations: ['proLimitation1', 'proLimitation2'],
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
      title: 'businessTitle',
      description: 'businessDescription',
      benefits: [
        'businessBenefit1',
        'businessBenefit2',
        'businessBenefit3',
        'businessBenefit4',
        'businessBenefit5',
        'businessBenefit6',
        'businessBenefit7',
        'businessBenefit8',
        'businessBenefit9',
        'businessBenefit10',
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
  return ['starter', 'pro', 'business', 'enterprise'];
}

export function ComparePlans(): PlansRow[] {
  return [
    {
      feature: 'featureMonthlyProductDescriptions',
      starter: 'starterValueMonthlyProductDescriptions',
      pro: 'proValueMonthlyProductDescriptions',
      business: 'businessValueMonthlyProductDescriptions',
      enterprise: 'enterpriseValueMonthlyProductDescriptions',
      tooltip: 'tooltipMonthlyProductDescriptions',
    },
    {
      feature: 'featureEcommercePlatforms',
      starter: 'starterValueEcommercePlatforms',
      pro: 'proValueEcommercePlatforms',
      business: 'businessValueEcommercePlatforms',
      enterprise: 'enterpriseValueEcommercePlatforms',
      tooltip: 'tooltipEcommercePlatforms',
    },
    {
      feature: 'featureAiQuality',
      starter: 'starterValueAiQuality',
      pro: 'proValueAiQuality',
      business: 'businessValueAiQuality',
      enterprise: 'enterpriseValueAiQuality',
      tooltip: 'tooltipAiQuality',
    },
    {
      feature: 'featureProcessingSpeed',
      starter: 'starterValueProcessingSpeed',
      pro: 'proValueProcessingSpeed',
      business: 'businessValueProcessingSpeed',
      enterprise: 'enterpriseValueProcessingSpeed',
      tooltip: 'tooltipProcessingSpeed',
    },
    {
      feature: 'featureCustomBranding',
      starter: false,
      pro: 'proValueCustomBranding',
      business: 'businessValueCustomBranding',
      enterprise: 'enterpriseValueCustomBranding',
      tooltip: 'tooltipCustomBranding',
    },
    {
      feature: 'featureAnalyticsInsights',
      starter: 'starterValueAnalyticsInsights',
      pro: 'proValueAnalyticsInsights',
      business: 'businessValueAnalyticsInsights',
      enterprise: 'enterpriseValueAnalyticsInsights',
      tooltip: 'tooltipAnalyticsInsights',
    },
    {
      feature: 'featureApiAccess',
      starter: false,
      pro: false,
      business: 'businessValueApiAccess',
      enterprise: 'enterpriseValueApiAccess',
      tooltip: 'tooltipApiAccess',
    },
    {
      feature: 'featureBulkUpload',
      starter: false,
      pro: false,
      business: true,
      enterprise: true,
      tooltip: 'tooltipBulkUpload',
    },
    {
      feature: 'featureCustomerSupport',
      starter: 'starterValueCustomerSupport',
      pro: 'proValueCustomerSupport',
      business: 'businessValueCustomerSupport',
      enterprise: 'enterpriseValueCustomerSupport',
      tooltip: 'tooltipCustomerSupport',
    },
    {
      feature: 'featureSeoOptimization',
      starter: false,
      pro: 'proValueSeoOptimization',
      business: true,
      enterprise: true,
      tooltip: 'tooltipSeoOptimization',
    },
  ];
}
