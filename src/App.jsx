import { useState } from 'react';
import { Menu } from 'lucide-react';

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

export default function App() {
  return (
    <>
      <Navbar />
      <main><Hero /></main>
    </>
  );
}
