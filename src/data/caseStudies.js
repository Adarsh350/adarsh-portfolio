export const caseStudies = [
  {
    id: 'gcc-logistics-pipeline',
    sequence: 1,
    client: 'Multinational logistics operator',
    contextLabel: 'GCC · Logistics',
    industryTheme: 'logistics',
    title: 'Procurement nurture for lane-specific demand',
    summary:
      'Segmented lifecycle system connecting trade-lane messaging, quote routing, and weekly reporting for a complex logistics portfolio.',
    engagement: {
      timeline: '10-week demand-capture program',
      audience:
        '10,849 procurement and operations contacts across five verticals and five trade-lane groups',
      stakeholders: 'Regional sales, commercial operations, and marketing',
      systems:
        'Mailchimp, HubSpot, custom landing pages, and an executive dashboard',
      measurement:
        'Compared with the previous eight weeks of broad, non-segmented campaigns',
    },
    headings: {
      problem: 'A global service portfolio looked generic at inbox level.',
      decisions: 'Relevance had to be operational, not cosmetic.',
      results: 'Pipeline movement across a ten-week reporting window.',
      gallery: 'The complete lane-specific conversion system.',
    },
    primaryMetric: {
      value: '$1.18M',
      label: 'influenced pipeline',
    },
    stats: [
      { value: '47.8%', label: 'Average open rate' },
      { value: '6.9%', label: 'Unique click rate' },
      { value: '92', label: 'Qualified RFQs' },
      { value: '31%', label: 'Lift from segment-specific landing pages' },
    ],
    problem:
      'A broad service portfolio, fragmented lists, and generic communications made it difficult for procurement teams to understand which offer matched their shipping lane or operational need.',
    built: [
      'Contact segmentation by vertical, lane, and buying intent',
      'Four-email account-nurture sequence',
      'Segment-specific landing pages',
      'Quote-request routing and sales alerts',
      'Weekly performance dashboard and executive report',
    ],
    keyDecisions: [
      'Lead with operational risk and delivery certainty instead of service breadth.',
      'Split messaging by decision-maker and trade lane.',
      'Route high-intent engagement to sales within one business day.',
    ],
    learning:
      'The strongest lift came from relevance, not higher send volume.',
    nextIteration:
      'Add behavioral scoring earlier and package sales follow-up templates into the initial launch.',
    proofModule: {
      label: 'Commercial signal',
      title: 'High-intent behavior reached sales in under one business day.',
      body: 'Repeat clicks, quote starts, and route-page depth were routed into the CRM so sales could act on verified buying intent instead of raw engagement alone.',
      points: [
        'Lane and vertical tags traveled with every lead',
        'Sales alerts included the content and route viewed',
        'Weekly reporting separated sourced and influenced pipeline',
      ],
    },
    gallery: [
      {
        path: '/assets/work/logistics/email-campaign.png',
        alt: 'Campaign email mockup for freight operations buyers.',
        caption:
          'Email system framed each sequence around lane-specific risk, delivery certainty, and next-step clarity.',
        eyebrow: 'Email system',
        type: 'Campaign mockup',
      },
      {
        path: '/assets/work/logistics/landing-page.png',
        alt: 'Landing page mockup tailored to a shipping-lane offer.',
        caption:
          'Segment-specific landing pages clarified the relevant offer and improved quote intent from matched traffic.',
        eyebrow: 'Landing page',
        type: 'Conversion page',
      },
      {
        path: '/assets/work/logistics/analytics-dashboard.png',
        alt: 'Pipeline dashboard mockup showing RFQ and campaign performance.',
        caption:
          'Weekly reporting connected engagement, RFQ flow, and influenced pipeline in one operating view.',
        eyebrow: 'Analytics',
        type: 'Dashboard',
      },
    ],
  },
  {
    id: 'healthcare-activation-flow',
    sequence: 2,
    client: 'Healthcare platform',
    contextLabel: 'United States · Healthcare',
    industryTheme: 'healthcare',
    title: 'Activation flow for sensitive onboarding',
    summary:
      'Trust-led onboarding program combining plain-language education, staged reminders, and cohort reporting to improve completion.',
    engagement: {
      timeline: '12-week activation and re-engagement program',
      audience:
        '12,860 invited participants across new and stalled onboarding cohorts',
      stakeholders: 'Growth, product, clinical operations, and compliance',
      systems:
        'Customer.io, Webflow, product event tracking, and a cohort dashboard',
      measurement: 'Measured against the prior 30-day onboarding cohort',
    },
    headings: {
      problem: 'Interest was high. Completion confidence was low.',
      decisions: 'Every message had to reduce uncertainty.',
      results: 'Activation gains across the full onboarding cohort.',
      gallery: 'A trust-led journey from inbox to completed profile.',
    },
    primaryMetric: {
      value: '2.4×',
      label: 'activation rate',
    },
    stats: [
      { value: '52.4%', label: 'Average open rate' },
      { value: '14.6%', label: 'Click-to-open rate' },
      { value: '38%', label: 'Reduction in onboarding drop-off' },
      { value: '1,860', label: 'Completed eligibility profiles' },
    ],
    problem:
      'High initial interest did not translate into completed profiles because the process felt clinical, lengthy, and uncertain.',
    built: [
      'Trust-led five-email onboarding sequence',
      'Plain-language eligibility explainer',
      'Mobile-first onboarding landing page',
      'Reminder logic based on completion stage',
      'Cohort dashboard covering activation and abandonment',
    ],
    keyDecisions: [
      'Replace institutional language with clear, reassuring next steps.',
      'Use one action per email.',
      'Trigger reminders based on incomplete steps rather than elapsed time alone.',
    ],
    learning:
      'Clarity and reassurance outperformed urgency across the highest-friction steps.',
    nextIteration:
      'Introduce preference controls earlier and test short educational video inside the biggest drop-off step.',
    proofModule: {
      label: 'Friction diagnosis',
      title: 'The reminder logic followed incomplete steps, not a generic clock.',
      body: 'Stage-triggered messages responded to where participants stopped, while compliance review kept reassurance copy accurate and safe across every follow-up.',
      points: [
        'One action and one reassurance per email',
        'Mobile completion was monitored separately',
        'Drop-off was reviewed by step and cohort',
      ],
    },
    gallery: [
      {
        path: '/assets/work/healthcare/email-campaign.png',
        alt: 'Onboarding email mockup with reassurance-led healthcare copy.',
        caption:
          'Each message carried a single action and reduced ambiguity around eligibility, privacy, and the next step.',
        eyebrow: 'Email system',
        type: 'Onboarding sequence',
      },
      {
        path: '/assets/work/healthcare/onboarding-page.png',
        alt: 'Mobile-first onboarding page mockup for eligibility completion.',
        caption:
          'The landing experience translated a sensitive multi-step flow into plain-language progress and trust signals.',
        eyebrow: 'Landing page',
        type: 'Onboarding page',
      },
      {
        path: '/assets/work/healthcare/cohort-dashboard.png',
        alt: 'Cohort dashboard mockup tracking activation and abandonment.',
        caption:
          'Cohort reporting made it clear where abandonment happened and which reminder logic recovered users.',
        eyebrow: 'Analytics',
        type: 'Cohort dashboard',
      },
    ],
  },
  {
    id: 'ai-enterprise-demand-gen',
    sequence: 3,
    client: 'AI infrastructure company',
    contextLabel: 'United States · Enterprise technology',
    industryTheme: 'ai',
    title: 'Enterprise launch for committee buying',
    summary:
      'Audience-specific launch system aligning executive narrative, technical proof, and account-level measurement for enterprise demand generation.',
    engagement: {
      timeline: '8-week enterprise launch and nurture cycle',
      audience:
        '620 target accounts spanning infrastructure, engineering, security, finance, and operations roles',
      stakeholders:
        'Founder, product marketing, solutions engineering, and enterprise sales',
      systems:
        'HubSpot, Webflow, GA4, CRM account scoring, and a revenue dashboard',
      measurement: 'Compared with the prior 30 days of product-led demo traffic',
    },
    headings: {
      problem: 'Technical strength was buried inside architecture language.',
      decisions:
        'Business urgency opened the door. Technical proof closed the gap.',
      results: 'Committee-level demand across an eight-week launch.',
      gallery: 'A multi-role enterprise launch built for self-selected depth.',
    },
    primaryMetric: {
      value: '41',
      label: 'enterprise demos',
    },
    stats: [
      { value: '44.1%', label: 'Average open rate' },
      { value: '8.3%', label: 'Unique click rate' },
      { value: '19', label: 'sales-qualified opportunities' },
      { value: '27%', label: 'Demo-page conversion from engaged accounts' },
    ],
    problem:
      'The product was technically strong but the launch narrative focused on architecture rather than the business conditions that made the infrastructure necessary.',
    built: [
      'Three audience tracks for technical, operations, and executive buyers',
      'Five-email launch and nurture sequence',
      'Interactive solution landing page',
      'Account-engagement dashboard',
      'Sales enablement briefs and follow-up templates',
    ],
    keyDecisions: [
      'Translate technical capability into deployment speed, resilience, and control.',
      'Keep technical proof available without forcing every reader through it.',
      'Score engagement at the account level to reflect committee buying.',
    ],
    learning:
      'Executive messaging created awareness, while technical proof created conversion.',
    nextIteration:
      'Add a benchmark asset before launch and strengthen account-level retargeting for engaged committees.',
    proofModule: {
      label: 'Buying committee',
      title: 'Account scoring replaced single-contact lead scoring.',
      body: 'Role-level signals from the same company were combined into account intent so sales could prioritize collective buying behavior instead of isolated individual actions.',
      points: [
        'Executive clicks built awareness signals',
        'Technical proof views carried higher intent weight',
        'Sales received account-level next-best-action prompts',
      ],
    },
    gallery: [
      {
        path: '/assets/work/ai/email-campaign.png',
        alt: 'Enterprise launch email mockup for AI infrastructure buyers.',
        caption:
          'Launch messaging translated technical capability into deployment speed, resilience, and operational control.',
        eyebrow: 'Email system',
        type: 'Launch sequence',
      },
      {
        path: '/assets/work/ai/solution-page.png',
        alt: 'Solution page mockup presenting enterprise AI infrastructure outcomes.',
        caption:
          'The solution page let executive and technical readers self-select depth without losing the conversion path.',
        eyebrow: 'Landing page',
        type: 'Solution page',
      },
      {
        path: '/assets/work/ai/account-dashboard.png',
        alt: 'Account dashboard mockup tracking engaged buying committees.',
        caption:
          'Account-level scoring gave sales a clearer view of multi-stakeholder intent before demo outreach.',
        eyebrow: 'Analytics',
        type: 'Intent dashboard',
      },
    ],
  },
]
