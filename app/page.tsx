import Image from "next/image";
import { SiteNav } from "@/components/site-nav";
import { ProofLedger } from "@/components/proof-ledger";
import { SectionHeading } from "@/components/section-heading";
import { CaseStudy } from "@/components/case-study";
import { ProjectIndex } from "@/components/project-index";
import { ArrowDown, ArrowUpRight, Mail } from "@/components/icons";
import { profile } from "@/content/profile";
import { caseStudies, career } from "@/content/experience";
import { capabilities, certifications } from "@/content/skills";

export default function Home() {
  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <SiteNav />
      <main id="main">
        <section className="hero" id="top">
          <div className="hero-copy">
            <div className="eyebrow"><span className="status-dot" />{profile.role}</div>
            <h1>I build the systems behind <em>measurable growth.</em></h1>
            <p className="hero-summary">{profile.summary}</p>
            <div className="mobile-status" aria-label="Current location and availability">
              <p><span>Current base</span><strong>{profile.location}</strong></p>
              <p><span>Status</span><strong>{profile.availability}</strong></p>
            </div>
            <div className="hero-actions">
              <a className="button button-primary" href="#work">Explore selected work <ArrowDown /></a>
              <a className="button button-secondary" href={profile.resume} download>Download résumé <ArrowDown /></a>
            </div>
            <div className="hero-links">
              <a href={`mailto:${profile.email}`}>Email <ArrowUpRight /></a>
              <a href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn <span className="sr-only">(opens in a new tab)</span><ArrowUpRight /></a>
              <a href={profile.github} target="_blank" rel="noreferrer">GitHub <span className="sr-only">(opens in a new tab)</span><ArrowUpRight /></a>
            </div>
          </div>
          <div className="hero-visual">
            <div className="portrait-frame">
              <Image src="/assets/headshot/adarsh-shankar.png" alt="Adarsh Shankar" width={1086} height={1448} priority sizes="(max-width: 760px) 46vw, 30vw" />
              <span className="portrait-code">AS / 026</span>
            </div>
            <div className="availability-card">
              <div><span>Current base</span><strong>{profile.location}</strong></div>
              <div><span>Status</span><strong>{profile.availability}</strong></div>
            </div>
          </div>
          <div className="authorization" aria-label="Work authorization">
            <p className="micro-label">Work authorization</p>
            <div>{profile.authorization.map((item) => <p key={item.market}><strong>{item.market}</strong><span>{item.status}</span></p>)}</div>
          </div>
        </section>

        <ProofLedger />

        <section className="work-section" id="work">
          <SectionHeading index="01" eyebrow="Selected work" title="Strategy is useful. Shipped systems are better." intro="Four roles where research, positioning, campaigns, product decisions, and technical delivery moved the same number." />
          <div className="case-list">{caseStudies.map((study) => <CaseStudy key={study.id} study={study} />)}</div>
        </section>

        <section className="builds-section" id="builds">
          <SectionHeading index="02" eyebrow="Builder index" title="AI-native is a working method, not a bio line." intro="Public repositories that show how I turn operational friction into practical software." />
          <ProjectIndex />
          <p className="build-note"><span>Operating principle</span>Use AI to compress the distance between an idea, a working system, and evidence that it works.</p>
        </section>

        <section className="about-section" id="about">
          <SectionHeading index="03" eyebrow="Range" title="Built across markets, stages, and business models." />
          <div className="career-grid">
            <div className="career-list">
              <p className="micro-label">Earlier work</p>
              {career.map((item) => <article key={item.company}>
                <div><h3>{item.company}</h3><p>{item.role} · {item.location}</p></div>
                <span>{item.period}</span><strong>{item.result}</strong>
              </article>)}
            </div>
            <div className="education-list">
              <p className="micro-label">Education</p>
              {profile.education.map((item) => <article key={item.school}><span>{item.period}</span><h3>{item.school}</h3><p>{item.degree}</p><small>{item.note}</small></article>)}
            </div>
          </div>
          <div className="capability-grid">
            {capabilities.map((capability) => <article key={capability.index}>
              <span>{capability.index}</span><h3>{capability.title}</h3><p>{capability.description}</p><small>{capability.tools.join(" · ")}</small>
            </article>)}
          </div>
          <details className="certifications"><summary>Selected certifications</summary><ul>{certifications.map((certification) => <li key={certification}>{certification}</li>)}</ul></details>
        </section>

        <section className="contact-section" id="contact">
          <div className="contact-index"><span>04</span><span>Next</span></div>
          <div className="contact-main">
            <p className="contact-eyebrow">Selective by design</p>
            <h2>I’m looking for the right scale of problem.</h2>
            <p>I built Iyara Labs and the systems that let it run. My co-founder is taking over day-to-day operations; I’ll remain a shareholder. I’m exploring roles where the ownership, scale, and measurable impact make that transition worthwhile.</p>
            <a className="contact-email" href={`mailto:${profile.email}`}><Mail />{profile.email}<ArrowUpRight /></a>
            <div className="contact-links">
              <a href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn <span className="sr-only">(opens in a new tab)</span><ArrowUpRight /></a>
              <a href={profile.github} target="_blank" rel="noreferrer">GitHub <span className="sr-only">(opens in a new tab)</span><ArrowUpRight /></a>
            </div>
            <div className="contact-markets">
              {profile.authorization.map((item) => <div key={item.market}><span>{item.market}</span><p>{item.status}</p></div>)}
            </div>
          </div>
        </section>
      </main>
      <footer><a href="#top">Adarsh Shankar</a><p>Product marketing · Growth systems · AI-native delivery</p><span>Dubai / 2026</span></footer>
    </>
  );
}
