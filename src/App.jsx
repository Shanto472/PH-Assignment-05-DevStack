import { useEffect, useState } from 'react';
import { Menu, Star, X } from 'lucide-react';
import { toast } from 'react-toastify';

const navItems = ['Home', 'Technologies', 'Projects', 'About', 'Contact'];

function Logo() {
  return (
    <a className="logo" href="#home" aria-label="Dev Stack home">
      <span>DS</span>
      <strong>Dev <em>Stack</em></strong>
    </a>
  );
}

function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="navbar">
      <div className="nav-inner">
        <button
          className="menu-button"
          onClick={() => setOpen(!open)}
          aria-label="Toggle navigation"
          aria-expanded={open}
        >
          <Menu size={23} />
        </button>

        <Logo />

        <nav className={open ? 'nav-links open' : 'nav-links'}>
          {navItems.map((item, index) => (
            <a
              className={index === 0 ? 'active' : ''}
              href={`#${item.toLowerCase()}`}
              key={item}
              onClick={() => setOpen(false)}
            >
              {item}
            </a>
          ))}
        </nav>

        <div className="auth">
          <button className="sign-in">Sign In</button>
          <button className="primary small">Sign Up</button>
        </div>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="hero" id="home">
      <div className="hero-copy">
        <h1>Build Your Ideal <span>Development Stack</span></h1>
        <p>
          Explore frontend, backend, database, and tooling options, compare them
          side by side, and put together the stack that fits your next project.
        </p>
        <div className="hero-actions">
          <a className="primary" href="#technologies">Explore Technologies</a>
          <a className="secondary" href="#about">Learn More</a>
        </div>
      </div>

      <div className="hero-visual" role="img" aria-label="Colorful layered development stack illustration">
        <div className="visual-glow"></div>
        <div className="stack-layer layer-top"><span>&lt;/&gt;</span><i></i><i></i><i></i></div>
        <div className="stack-layer layer-middle"><span>JS</span><i></i><i></i><i></i></div>
        <div className="stack-layer layer-bottom"><span>API</span><i></i><i></i><i></i></div>
        <div className="stack-base"></div>
      </div>
    </section>
  );
}

function TechCard({ tech, isAdded, onAdd }) {
  return (
    <article className="tech-card">
      <div className="card-top">
        <img src={tech.icon} alt={`${tech.name} logo`} />
        <span className="badge">{tech.badge}</span>
      </div>
      <h3>{tech.name}</h3>
      <p>{tech.description}</p>
      <div className="meta">
        <span>{tech.category}</span>
        <span>{tech.difficulty}</span>
        <span className="rating"><Star size={13} fill="currentColor" /> {tech.rating}</span>
      </div>
      <button
        className={isAdded ? 'add-button added' : 'add-button'}
        onClick={() => onAdd(tech)}
        aria-disabled={isAdded}
      >
        {isAdded ? '✓ Added to Stack' : 'Add to Stack'}
      </button>
    </article>
  );
}

function StackPanel({ selected, onRemove, onRemoveAll }) {
  return (
    <aside className="stack-panel">
      <h3>Your Stack</h3>
      <p className="selected-count">
        {selected.length} {selected.length === 1 ? 'Technology' : 'Technologies'} Selected
      </p>

      {selected.length === 0 ? (
        <div className="empty-state">
          <div>+</div>
          <strong>Your stack is empty</strong>
          <span>Add technologies to build your ideal stack.</span>
        </div>
      ) : (
        <div className="stack-list">
          {selected.map(tech => (
            <div className="stack-item" key={tech.id}>
              <img src={tech.icon} alt="" />
              <div><strong>{tech.name}</strong><span>{tech.category}</span></div>
              <button onClick={() => onRemove(tech)} aria-label={`Remove ${tech.name}`}>
                <X size={18} />
              </button>
            </div>
          ))}
        </div>
      )}

      <button className="remove-all" disabled={!selected.length} onClick={onRemoveAll}>
        Remove All
      </button>
    </aside>
  );
}

function Technologies() {
  const [technologies, setTechnologies] = useState([]);
  const [selected, setSelected] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch('/technologies.json')
      .then(response => {
        if (!response.ok) throw new Error('Unable to load technologies.');
        return response.json();
      })
      .then(setTechnologies)
      .catch(error => setError(error.message))
      .finally(() => setLoading(false));
  }, []);

  const addTechnology = tech => {
    if (selected.some(item => item.id === tech.id)) {
      toast.warning(`${tech.name} is already in your stack.`);
      return;
    }
    setSelected(current => [...current, tech]);
    toast.success(`${tech.name} added to your stack!`);
  };

  const removeTechnology = tech => {
    setSelected(current => current.filter(item => item.id !== tech.id));
    toast.info(`${tech.name} removed from your stack.`);
  };

  const removeAll = () => {
    if (!selected.length) return;
    setSelected([]);
    toast.info('All technologies removed from your stack.');
  };

  return (
    <section className="technologies section" id="technologies">
      <div className="section-heading">
        <h2>Explore the <span>Technologies</span></h2>
        <p>Pick the right technologies to build your ideal stack.</p>
      </div>
      {loading ? (
        <div className="loading"><span></span>Loading technologies...</div>
      ) : error ? (
        <div className="error">{error}</div>
      ) : (
        <div className="catalog-layout">
          <div className="card-grid">
            {technologies.map(tech => (
              <TechCard
                tech={tech}
                key={tech.id}
                isAdded={selected.some(item => item.id === tech.id)}
                onAdd={addTechnology}
              />
            ))}
          </div>
          <StackPanel selected={selected} onRemove={removeTechnology} onRemoveAll={removeAll} />
        </div>
      )}
    </section>
  );
}

const faqItems = [
  { question: 'Where can I deploy this project?', answer: 'You can deploy Dev Stack on platforms such as Netlify, Vercel, Cloudflare Pages, or any static hosting service that supports Vite applications.' },
  { question: 'Can I use JavaScript instead of TypeScript?', answer: 'Absolutely. This project uses modern JavaScript and React, so TypeScript is optional rather than required.' },
  { question: 'Can the brand colors and logo be customized?', answer: 'Yes. The shared gradient is defined once in CSS, making it easy to re-theme the brand name, highlighted text, and primary buttons together.' },
  { question: 'Where do the technology icons come from?', answer: 'The technology data uses clean SVG icons from the Devicon CDN. You can replace any URL in the local technologies JSON file.' },
];

function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="faq-section" id="faq">
      <div className="faq-inner">
        <div className="faq-heading">
          <span>NEED TO KNOW</span>
          <h2>Questions, <em>answered.</em></h2>
          <p>Quick answers about using and customizing Dev Stack.</p>
        </div>
        <div className="faq-list">
          {faqItems.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <article className={isOpen ? 'faq-item open' : 'faq-item'} key={item.question}>
                <button onClick={() => setOpenIndex(isOpen ? -1 : index)} aria-expanded={isOpen}>
                  <span className="faq-number">0{index + 1}</span>
                  <strong>{item.question}</strong>
                  <span className="faq-toggle">{isOpen ? '−' : '+'}</span>
                </button>
                <div className="faq-answer"><p>{item.answer}</p></div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function FooterLinks({ title, links }) {
  return (
    <div className="footer-links">
      <h4>{title}</h4>
      {links.map(link => (
        <a href={`#${link.toLowerCase().replaceAll(' ', '-')}`} key={link}>{link}</a>
      ))}
    </div>
  );
}

function Footer() {
  return (
    <footer id="about">
      <div className="footer-inner">
        <div className="footer-main">
          <div className="brand-block">
            <Logo />
            <p>Curated tools, technologies, and resources for developers building modern software.</p>
            <div className="socials">
              <a href="https://github.com">GitHub</a>
              <a href="https://twitter.com">Twitter</a>
              <a href="https://linkedin.com">LinkedIn</a>
            </div>
          </div>
          <FooterLinks title="Product" links={['Home', 'Technologies', 'Projects']} />
          <FooterLinks title="Company" links={['About', 'Contact', 'Careers']} />
          <FooterLinks title="Legal" links={['Privacy Policy', 'Terms of Service']} />
        </div>
        <div className="footer-bottom">
          <span>© 2026 Dev Stack. All rights reserved.</span>
          <div><a href="#privacy">Privacy</a><a href="#terms">Terms</a></div>
        </div>
      </div>
    </footer>
  );
}

export default function App() {
  return (
    <>
      <Navbar />
      <main><Hero /><Technologies /><FAQ /></main>
      <Footer />
    </>
  );
}
