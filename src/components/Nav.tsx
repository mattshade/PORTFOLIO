import './Nav.css'

export function Nav() {
  return (
    <nav className="nav" aria-label="Main">
      <div className="nav-inner">
        <a href="#" className="nav-home">
          <img src="/favicon.svg" alt="Bird Logo" className="nav-logo" width="18" height="18" />
          Matt Shade
        </a>
        <div className="nav-links">
          <a href="#projects">Projects</a>
          <a href="#experience">Experience</a>
        </div>
      </div>
    </nav>
  )
}
