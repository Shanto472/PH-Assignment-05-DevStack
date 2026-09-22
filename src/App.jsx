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

export default function App() {
  return (
    <>
      <Navbar />
      <main className="navbar-preview" id="home">
        <p>Dev Stack</p>
      </main>
    </>
  );
}
