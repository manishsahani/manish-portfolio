import { useEffect } from 'react';
import './index.css';

export default function App() {
  useEffect(() => {
    // Custom cursor
    const cursor = document.getElementById('cursor');
    const ring = document.getElementById('cursor-ring');
    let rx = 0, ry = 0, mx = 0, my = 0;

    const onMouseMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      if (cursor) {
        cursor.style.left = mx + 'px';
        cursor.style.top = my + 'px';
      }
    };

    document.addEventListener('mousemove', onMouseMove);

    let animationFrameId: number;
    const animRing = () => {
      rx += (mx - rx) * 0.1;
      ry += (my - ry) * 0.1;
      if (ring) {
        ring.style.left = rx + 'px';
        ring.style.top = ry + 'px';
      }
      animationFrameId = requestAnimationFrame(animRing);
    };
    animRing();

    const hoverElements = document.querySelectorAll('a, button, .exp-card, .case-card, .skill-category, .pillar');
    
    const onMouseEnter = () => {
      if (cursor) cursor.style.transform = 'translate(-50%,-50%) scale(2)';
      if (ring) {
        ring.style.transform = 'translate(-50%,-50%) scale(1.5)';
        ring.style.borderColor = 'rgba(79,142,255,0.8)';
      }
    };
    
    const onMouseLeave = () => {
       if (cursor) cursor.style.transform = 'translate(-50%,-50%) scale(1)';
       if (ring) {
         ring.style.transform = 'translate(-50%,-50%) scale(1)';
         ring.style.borderColor = 'rgba(79,142,255,0.5)';
       }
    };

    hoverElements.forEach(el => {
      el.addEventListener('mouseenter', onMouseEnter);
      el.addEventListener('mouseleave', onMouseLeave);
    });

    // Nav scroll
    const navbar = document.getElementById('navbar');
    const onScroll = () => {
      if (navbar) navbar.classList.toggle('scrolled', window.scrollY > 60);
    };
    window.addEventListener('scroll', onScroll);

    // Reveal on scroll
    const reveals = document.querySelectorAll('.reveal');
    const obs = new IntersectionObserver(entries => {
      entries.forEach((e, i) => {
        if (e.isIntersecting) {
          setTimeout(() => e.target.classList.add('visible'), i * 80);
        }
      });
    }, { threshold: 0.1 });
    reveals.forEach(el => obs.observe(el));

    // Counter animation
    function animateCounter(el: HTMLElement) {
      const target = parseInt(el.dataset.target || '0', 10);
      const suffix = el.dataset.suffix || '';
      const duration = 1800;
      const start = performance.now();
      
      function tick(now: number){
        const elapsed = now - start;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        if (el) {
          el.textContent = Math.round(eased * target) + suffix;
        }
        if(progress < 1) requestAnimationFrame(tick);
      }
      requestAnimationFrame(tick);
    }
    
    const counters = document.querySelectorAll('[data-target]');
    const cObs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          animateCounter(e.target as HTMLElement);
          cObs.unobserve(e.target);
        }
      });
    }, { threshold: 0.5 });
    counters.forEach(c => cObs.observe(c));

    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(animationFrameId);
      hoverElements.forEach(el => {
        el.removeEventListener('mouseenter', onMouseEnter);
        el.removeEventListener('mouseleave', onMouseLeave);
      });
      obs.disconnect();
      cObs.disconnect();
    };
  }, []);

  const openMobileNav = () => {
    document.getElementById('mobile-nav')?.classList.add('open');
  };

  const closeMobileNav = () => {
    document.getElementById('mobile-nav')?.classList.remove('open');
  };

  return (
    <>
      {/* Custom cursor */}
      <div id="cursor"></div>
      <div id="cursor-ring"></div>

      {/* Mobile nav */}
      <div id="mobile-nav">
        <button className="close-btn" onClick={closeMobileNav}>✕</button>
        <a href="#about" onClick={closeMobileNav}>About</a>
        <a href="#experience" onClick={closeMobileNav}>Experience</a>
        <a href="#work" onClick={closeMobileNav}>Case Studies</a>
        <a href="#analytics" onClick={closeMobileNav}>Analytics</a>
        <a href="#skills" onClick={closeMobileNav}>Skills</a>
        <a href="#contact" onClick={closeMobileNav}>Contact</a>
      </div>

      {/* NAV */}
      <nav id="navbar">
        <a href="#" className="nav-logo">MS<span>.</span></a>
        <ul className="nav-links">
          <li><a href="#about">About</a></li>
          <li><a href="#experience">Experience</a></li>
          <li><a href="#work">Case Studies</a></li>
          <li><a href="#analytics">Analytics</a></li>
          <li><a href="#skills">Skills</a></li>
        </ul>
        <a href="#contact" className="nav-cta">Get in Touch</a>
        <div className="hamburger" onClick={openMobileNav}>
          <span></span><span></span><span></span>
        </div>
      </nav>

      {/* HERO */}
      <section id="hero">
        <div className="hero-bg"></div>
        <div className="hero-grid"></div>
        <div className="hero-content">
          <div className="hero-tag">Available for opportunities · Business Analyst</div>
          <h1 className="hero-headline">
            Turning Data<br />
            into<br />
            <span className="line2">Business Decisions.</span>
          </h1>
          <p className="hero-sub">
            I'm <strong>Manish Sahani</strong> — a Business Analyst with 4+ years transforming ambiguous business problems into precise, measurable outcomes across telecom and digital platforms.
          </p>
          <div className="hero-ctas">
            <a href="#work" className="btn-primary">View Case Studies →</a>
             <a href="/Manish_Sahani_Resume.pdf" download className="btn-ghost">
              <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" /></svg>
              Download CV
            </a>
          </div>
        </div>

        <div className="hero-metrics">
          <div className="metric-card">
            <div className="val" data-target="4">0</div>
            <div className="label">Years of Experience</div>
          </div>
          <div className="metric-card">
            <div className="val" data-target="20">0</div>
            <div className="label">Stakeholders Managed</div>
          </div>
          <div className="metric-card">
            <div className="val" data-target="15" data-suffix="+">0</div>
            <div className="label">Requirements Delivered</div>
          </div>
        </div>
      </section>

      {/* MARQUEE */}
      <div className="marquee-wrap">
        <div className="marquee-track">
          <div className="marquee-item">Requirement Analysis</div>
          <div className="marquee-item">BRD / FRD Documentation</div>
          <div className="marquee-item">SQL Data Analysis</div>
          <div className="marquee-item">UAT Management</div>
          <div className="marquee-item">API Testing</div>
          <div className="marquee-item">KPI Tracking</div>
          <div className="marquee-item">Stakeholder Management</div>
          <div className="marquee-item">Production Support</div>
          <div className="marquee-item">Telecom Platforms</div>
          <div className="marquee-item">Product Analytics</div>
          {/* duplicate for seamless loop */}
          <div className="marquee-item">Requirement Analysis</div>
          <div className="marquee-item">BRD / FRD Documentation</div>
          <div className="marquee-item">SQL Data Analysis</div>
          <div className="marquee-item">UAT Management</div>
          <div className="marquee-item">API Testing</div>
          <div className="marquee-item">KPI Tracking</div>
          <div className="marquee-item">Stakeholder Management</div>
          <div className="marquee-item">Production Support</div>
          <div className="marquee-item">Telecom Platforms</div>
          <div className="marquee-item">Product Analytics</div>
        </div>
      </div>

      {/* ABOUT */}
      <section id="about">
        <div className="section-tag">About</div>
        <h2 className="section-title">Product-first.<br />Data-driven. Impact-led.</h2>
        <div className="about-grid">
          <div className="about-text reveal">
            <p>I don't just document requirements — I <strong>decode business problems</strong>. My work sits at the intersection of stakeholder vision, product logic, and analytical rigor, ensuring every solution is both technically sound and business-relevant.</p>
            <p>Working across <strong>telecom platforms and digital ecosystems</strong>, I've led end-to-end delivery cycles: from initial discovery and BRD authoring to UAT sign-off and post-production monitoring. I treat each project like a product — with a user, an outcome, and a measurable result.</p>
            <p>My approach combines structured analytical thinking with clear communication — whether presenting to C-suite stakeholders or aligning with cross-functional engineering teams.</p>
            <div className="pillars">
              <div className="pillar">
                <div className="pillar-icon">🔍</div>
                <div className="pillar-title">Problem Discovery</div>
                <div className="pillar-desc">Deep requirements elicitation before writing a single line of documentation.</div>
              </div>
              <div className="pillar">
                <div className="pillar-icon">📐</div>
                <div className="pillar-title">Structured Analysis</div>
                <div className="pillar-desc">SQL-backed data analysis and workflow modeling to quantify business gaps.</div>
              </div>
              <div className="pillar">
                <div className="pillar-icon">🤝</div>
                <div className="pillar-title">Stakeholder Alignment</div>
                <div className="pillar-desc">Translating technical complexity into business language that gets decisions made.</div>
              </div>
              <div className="pillar">
                <div className="pillar-icon">📊</div>
                <div className="pillar-title">Outcome Tracking</div>
                <div className="pillar-desc">KPI-driven success metrics defined before delivery and measured after.</div>
              </div>
            </div>
          </div>
          <div className="about-visual reveal">
            <div className="about-card-stack">
              <div className="acard">
                <div className="acard-label">Requirement Coverage</div>
                <div className="acard-val blue">94%</div>
                <div className="acard-sub">Acceptance rate on BRD sign-offs</div>
                <div className="mini-bar"><div className="mini-bar-fill blue"></div></div>
              </div>
              <div className="acard">
                <div className="acard-label">UAT Pass Rate</div>
                <div className="acard-val green">91%</div>
                <div className="acard-sub">First-cycle UAT approvals</div>
                <div className="mini-bar"><div className="mini-bar-fill green"></div></div>
              </div>
              <div className="acard">
                <div className="acard-label">Stakeholders Aligned</div>
                <div className="acard-val purple">20+</div>
                <div className="acard-sub">Cross-functional team members</div>
                <div className="mini-bar"><div className="mini-bar-fill purple"></div></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* EXPERIENCE */}
      <section id="experience">
        <div className="section-tag">Experience</div>
        <h2 className="section-title">Business Impact,<br />Not Just Tasks.</h2>
        <p className="section-sub">Four years of work distilled into outcomes that moved the needle.</p>
        <div className="exp-grid reveal">
          <div className="exp-card">
            <div className="exp-number">4+</div>
            <div className="exp-metric">Years · Telecom &amp; Digital</div>
            <div className="exp-card-title">End-to-End Delivery</div>
            <div className="exp-card-desc">Led full delivery lifecycles from requirement discovery through UAT sign-off, ensuring alignment between business vision and technical execution at every phase.</div>
            <div className="exp-tags">
              <span className="tag-sm">BRD</span>
              <span className="tag-sm">FRD</span>
              <span className="tag-sm">UAT</span>
              <span className="tag-sm">Delivery</span>
            </div>
          </div>
          <div className="exp-card">
            <div className="exp-number">20+</div>
            <div className="exp-metric">Stakeholders · Cross-functional</div>
            <div className="exp-card-title">Stakeholder Management</div>
            <div className="exp-card-desc">Managed requirements and communication across product, engineering, QA, and business units — maintaining clarity and momentum even in complex, multi-team environments.</div>
            <div className="exp-tags">
              <span className="tag-sm">Collaboration</span>
              <span className="tag-sm">Communication</span>
              <span className="tag-sm">Alignment</span>
            </div>
          </div>
          <div className="exp-card">
            <div className="exp-number">SQL</div>
            <div className="exp-metric">Data Analysis · Insights</div>
            <div className="exp-card-title">Data-Driven Decisions</div>
            <div className="exp-card-desc">Leveraged SQL queries to uncover workflow bottlenecks, validate business logic, and build KPI dashboards that informed product prioritization and operational improvements.</div>
            <div className="exp-tags">
              <span className="tag-sm">SQL</span>
              <span className="tag-sm">KPI</span>
              <span className="tag-sm">Analytics</span>
            </div>
          </div>
          <div className="exp-card">
            <div className="exp-number">API</div>
            <div className="exp-metric">Testing · Production Support</div>
            <div className="exp-card-title">Technical Collaboration</div>
            <div className="exp-card-desc">Bridged the gap between business and engineering through API testing, production monitoring, and incident management — ensuring system behavior matched documented requirements.</div>
            <div className="exp-tags">
              <span className="tag-sm">API Testing</span>
              <span className="tag-sm">Postman</span>
              <span className="tag-sm">Prod Support</span>
            </div>
          </div>
          <div className="exp-card">
            <div className="exp-number">⚡</div>
            <div className="exp-metric">Telecom · Platform Scale</div>
            <div className="exp-card-title">Telecom Platform Expertise</div>
            <div className="exp-card-desc">Deep domain experience in large-scale telecom workflows — billing systems, service activation, transaction analytics, and regulatory compliance at enterprise scale.</div>
            <div className="exp-tags">
              <span className="tag-sm">Telecom</span>
              <span className="tag-sm">Billing</span>
              <span className="tag-sm">Workflows</span>
            </div>
          </div>
          <div className="exp-card">
            <div className="exp-number">🎯</div>
            <div className="exp-metric">Healthcare · Digital Platforms</div>
            <div className="exp-card-title">Digital Transformation</div>
            <div className="exp-card-desc">Supported digital platform modernization efforts in healthcare, analyzing patient workflow data, mapping process inefficiencies, and defining measurable outcomes for improvement.</div>
            <div className="exp-tags">
              <span className="tag-sm">Healthcare</span>
              <span className="tag-sm">Workflows</span>
              <span className="tag-sm">Digital</span>
            </div>
          </div>
        </div>
      </section>

      {/* CASE STUDIES */}
      <section id="work">
        <div className="section-tag">Featured Work</div>
        <h2 className="section-title">Case Studies.</h2>
        <p className="section-sub">Two deep-dive analyses showcasing business impact, methodology, and measurable outcomes.</p>
        <div className="work-grid">
          {/* Healthcare */}
          <div className="case-card reveal">
            <div className="case-thumb health">
              <div className="thumb-visual">
                <div className="health-vis">
                  <div className="hcard c1">
                    <div className="hcard-lbl">Patient Wait Time</div>
                    <div className="hcard-val">−34%</div>
                  </div>
                  <div className="hcard c2">
                    <div className="hcard-lbl">Process Efficiency</div>
                    <div className="hcard-val">+28%</div>
                  </div>
                  <div className="hcard c3">
                    <div className="hcard-lbl">Workflow Coverage</div>
                    <div className="hcard-val">100%</div>
                  </div>
                </div>
              </div>
              <div className="case-hover-overlay">
                <div className="view-cta">View Case Study</div>
              </div>
            </div>
            <div className="case-body">
              <div className="case-domain">Healthcare · Digital Workflow</div>
              <h3 className="case-title">Healthcare Operations &amp; Workflow Analysis</h3>
              <p className="case-desc">A comprehensive business analysis of patient journey workflows, identifying operational inefficiencies and delivering data-backed recommendations that reduced wait times and improved care coordination.</p>
              <div className="case-pills">
                <span className="case-pill">Requirement Analysis</span>
                <span className="case-pill">SQL Analytics</span>
                <span className="case-pill">Process Mapping</span>
                <span className="case-pill">KPI Design</span>
              </div>
              <a href="https://healtcare-case-study.netlify.app/" target="_blank" rel="noreferrer" className="case-link">
                View Case Study
                <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M7 17L17 7M7 7h10v10" /></svg>
              </a>
            </div>
          </div>

          {/* Telecom */}
          <div className="case-card reveal">
            <div className="case-thumb telecom">
              <div className="thumb-visual">
                <div className="telecom-vis">
                  <svg className="lines" viewBox="0 0 260 160">
                    <line x1="67" y1="27" x2="7" y2="77" stroke="rgba(124,92,252,0.4)" strokeWidth="1.5" />
                    <line x1="67" y1="27" x2="137" y2="77" stroke="rgba(124,92,252,0.4)" strokeWidth="1.5" />
                    <line x1="7" y1="77" x2="67" y2="127" stroke="rgba(79,142,255,0.4)" strokeWidth="1.5" />
                    <line x1="137" y1="77" x2="67" y2="127" stroke="rgba(79,142,255,0.4)" strokeWidth="1.5" />
                    <line x1="67" y1="27" x2="230" y2="37" stroke="rgba(0,229,176,0.35)" strokeWidth="1.5" strokeDasharray="5,4" />
                    <line x1="137" y1="77" x2="220" y2="117" stroke="rgba(0,229,176,0.35)" strokeWidth="1.5" strokeDasharray="5,4" />
                  </svg>
                  <div className="node n1"></div>
                  <div className="node n2"></div>
                  <div className="node n3"></div>
                  <div className="node n4"></div>
                  <div className="node n5"></div>
                  <div className="node n6"></div>
                </div>
              </div>
              <div className="case-hover-overlay">
                <div className="view-cta">View Case Study</div>
              </div>
            </div>
            <div className="case-body">
              <div className="case-domain">Telecom · Platform Analytics</div>
              <h3 className="case-title">Telecom Platform Performance &amp; Analytics</h3>
              <p className="case-desc">End-to-end business analysis of a large-scale telecom platform — covering transaction workflows, billing accuracy, service activation funnels, and cross-system API dependencies to drive platform reliability.</p>
              <div className="case-pills">
                <span className="case-pill">API Analysis</span>
                <span className="case-pill">Transaction Analytics</span>
                <span className="case-pill">BRD / FRD</span>
                <span className="case-pill">UAT</span>
              </div>
              <a href="https://telecom-case-study.netlify.app/" target="_blank" rel="noreferrer" className="case-link">
                View Case Study
                <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M7 17L17 7M7 7h10v10" /></svg>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ANALYTICS DASHBOARD */}
      <section id="analytics">
        <div className="section-tag">Analytics</div>
        <h2 className="section-title">The Metrics I Move.</h2>
        <p className="section-sub">Analytical thinking applied to real business problems — visualized.</p>
        <div className="analytics-grid">
          <div className="an-card reveal">
            <div className="an-card-header">
              <div className="an-card-title">Requirement Delivery Funnel</div>
              <div className="an-badge">Optimized</div>
            </div>
            <div className="funnel">
              <div className="funnel-step">
                <span className="funnel-label">Discovery</span>
                <div className="funnel-bar-wrap"><div className="funnel-bar f1">100%</div></div>
                <span className="funnel-pct">100%</span>
              </div>
              <div className="funnel-step">
                <span className="funnel-label">BRD Sign-off</span>
                <div className="funnel-bar-wrap"><div className="funnel-bar f2">78%</div></div>
                <span className="funnel-pct">78%</span>
              </div>
              <div className="funnel-step">
                <span className="funnel-label">UAT Pass</span>
                <div className="funnel-bar-wrap"><div className="funnel-bar f3">91%</div></div>
                <span className="funnel-pct">91%</span>
              </div>
              <div className="funnel-step">
                <span className="funnel-label">Go-live</span>
                <div className="funnel-bar-wrap"><div className="funnel-bar f4">35%</div></div>
                <span className="funnel-pct">∞</span>
              </div>
            </div>
          </div>

          <div className="an-card reveal">
            <div className="an-card-header">
              <div className="an-card-title">Monthly Delivery Trend</div>
              <div className="an-badge">↑ Growing</div>
            </div>
            <div className="timeline-chart">
              <div className="t-bar"></div><div className="t-bar"></div><div className="t-bar"></div>
              <div className="t-bar"></div><div className="t-bar"></div><div className="t-bar"></div>
              <div className="t-bar"></div><div className="t-bar"></div><div className="t-bar"></div>
              <div className="t-bar"></div><div className="t-bar"></div><div className="t-bar"></div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '8px', fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--muted)' }}>
              <span>Jan</span><span>Mar</span><span>May</span><span>Jul</span><span>Sep</span><span>Nov</span>
            </div>
          </div>

          <div className="an-card wide reveal">
            <div className="an-card-header">
              <div className="an-card-title">Core Business KPIs</div>
              <div className="an-badge">Live Tracking</div>
            </div>
            <div className="kpi-grid">
              <div className="kpi-item">
                <div className="kpi-val up">94%</div>
                <div className="kpi-lbl">BRD Approval Rate</div>
                <div className="kpi-chg pos">↑ 6% vs baseline</div>
              </div>
              <div className="kpi-item">
                <div className="kpi-val up">91%</div>
                <div className="kpi-lbl">UAT First-pass Rate</div>
                <div className="kpi-chg pos">↑ 12% improvement</div>
              </div>
              <div className="kpi-item">
                <div className="kpi-val neu">4+</div>
                <div className="kpi-lbl">Years Experience</div>
                <div className="kpi-chg pos">Telecom &amp; Digital</div>
              </div>
              <div className="kpi-item">
                <div className="kpi-val up">20+</div>
                <div className="kpi-lbl">Stakeholders Managed</div>
                <div className="kpi-chg pos">Cross-functional teams</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SKILLS */}
      <section id="skills">
        <div className="section-tag">Expertise</div>
        <h2 className="section-title">What I Bring<br />to the Table.</h2>
        <div className="skills-grid">
          <div className="skill-category reveal">
            <div className="sk-icon">📋</div>
            <div className="sk-cat">Business Analysis</div>
            <div className="sk-sub">Core Discipline</div>
            <div className="sk-items">
              <div className="sk-item"><span className="sk-dot blue"></span>Requirement Gathering</div>
              <div className="sk-item"><span className="sk-dot blue"></span>BRD / FRD Authoring</div>
              <div className="sk-item"><span className="sk-dot blue"></span>Gap Analysis</div>
              <div className="sk-item"><span className="sk-dot blue"></span>Process Mapping</div>
              <div className="sk-item"><span className="sk-dot blue"></span>Use Case Design</div>
            </div>
          </div>

          <div className="skill-category reveal">
            <div className="sk-icon">📊</div>
            <div className="sk-cat">Data &amp; Analytics</div>
            <div className="sk-sub">Analytical Toolkit</div>
            <div className="sk-items">
              <div className="sk-item"><span className="sk-dot green"></span>SQL Analysis</div>
              <div className="sk-item"><span className="sk-dot green"></span>KPI Tracking</div>
              <div className="sk-item"><span className="sk-dot green"></span>Data Validation</div>
              <div className="sk-item"><span className="sk-dot green"></span>Trend Analysis</div>
              <div className="sk-item"><span className="sk-dot green"></span>Dashboard Design</div>
            </div>
          </div>

          <div className="skill-category reveal">
            <div className="sk-icon">🔬</div>
            <div className="sk-cat">Testing &amp; Quality</div>
            <div className="sk-sub">Validation Layer</div>
            <div className="sk-items">
              <div className="sk-item"><span className="sk-dot purple"></span>UAT Management</div>
              <div className="sk-item"><span className="sk-dot purple"></span>API Testing</div>
              <div className="sk-item"><span className="sk-dot purple"></span>Test Case Design</div>
              <div className="sk-item"><span className="sk-dot purple"></span>Defect Triage</div>
              <div className="sk-item"><span className="sk-dot purple"></span>Production Support</div>
            </div>
          </div>

          <div className="skill-category reveal">
            <div className="sk-icon">🌐</div>
            <div className="sk-cat">Domain Knowledge</div>
            <div className="sk-sub">Industry Context</div>
            <div className="sk-items">
              <div className="sk-item"><span className="sk-dot orange"></span>Telecom Platforms</div>
              <div className="sk-item"><span className="sk-dot orange"></span>Healthcare Workflows</div>
              <div className="sk-item"><span className="sk-dot orange"></span>Billing Systems</div>
              <div className="sk-item"><span className="sk-dot orange"></span>Digital Products</div>
              <div className="sk-item"><span className="sk-dot orange"></span>Stakeholder Mgmt</div>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact">
        <div className="contact-inner">
          <div className="section-tag" style={{ justifyContent: 'center' }}>Let's Connect</div>
          <h2 className="contact-headline">Ready to Create<br /><span>Business Impact?</span></h2>
          <p className="contact-sub">I'm open to Business Analyst, Product Analyst, and related roles where analytical depth and clear communication drive real outcomes.</p>
          <div className="contact-links">
            <a href="https://www.linkedin.com/in/manish-sahani" target="_blank" rel="noreferrer" className="contact-link li">
              <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" /><circle cx="4" cy="4" r="2" /></svg>
              LinkedIn Profile
            </a>
            <a href="mailto:sahanimanish3@gmail.com" className="contact-link em">
              <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M4 4h16a2 2 0 012 2v12a2 2 0 01-2 2H4a2 2 0 01-2-2V6a2 2 0 012-2z" /><polyline points="22,6 12,13 2,6" /></svg>
              sahanimanish3@gmail.com
            </a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer>
        <span>Manish Sahani · Business Analyst</span>
        <span>Designed &amp; built with intention.</span>
      </footer>
    </>
  );
}
