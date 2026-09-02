export type Project = { name: string; category: string; description: string; proof: string; href: string };

export const projects: Project[] = [
  { name: "mailchimp-bounce-monitor-worker", category: "Marketing operations", description: "A Cloudflare Worker dashboard for Mailchimp bounce monitoring.", proof: "Webhooks · scheduled checks · deliverability reporting", href: "https://github.com/Adarsh350/mailchimp-bounce-monitor-worker" },
  { name: "skill-routing-eval", category: "AI evaluation", description: "An A/B evaluation harness for measuring the effect of injected agent context.", proof: "Experimental design · repeatable evaluation · agent systems", href: "https://github.com/Adarsh350/skill-routing-eval" },
  { name: "chess-app", category: "Product engineering", description: "An offline-first chess analysis PWA with local engine support.", proof: "IndexedDB · Stockfish · offline-first product design", href: "https://github.com/Adarsh350/chess-app" },
  { name: "Jobfill-Extension", category: "Browser automation", description: "A privacy-first browser extension for job-application autofill.", proof: "Local-first data · extension UX · workflow automation", href: "https://github.com/Adarsh350/Jobfill-Extension" },
  { name: "mailchimp-reports-worker", category: "Marketing operations", description: "Event-driven Mailchimp reporting built on Cloudflare Workers.", proof: "KV storage · email delivery · campaign automation", href: "https://github.com/Adarsh350/mailchimp-reports-worker" },
  { name: "claude-code-hooks", category: "Agent infrastructure", description: "Reusable guardrails for safer, verifiable agent-assisted development.", proof: "Secret guard · verification gate · context controls", href: "https://github.com/Adarsh350/claude-code-hooks" },
];
