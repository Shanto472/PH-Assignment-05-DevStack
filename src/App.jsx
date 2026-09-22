import { useEffect, useState } from 'react';
import { Menu, Star } from 'lucide-react';

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

function TechCard({ tech }) {
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
      <button className="add-button">Add to Stack</button>
    </article>
  );
}

function Technologies() {
  const [technologies, setTechnologies] = useState([]);
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
        <div className="card-grid">
          {technologies.map(tech => <TechCard tech={tech} key={tech.id} />)}
        </div>
      )}
    </section>
  );
}

export default function App() {
  return (
    <>
      <Navbar />
      <main><Hero /><Technologies /></main>
    </>
  );
}
