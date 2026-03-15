import { resume } from '../data/resume'
import './Footer.css'

export function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-links">
          {resume.email && (
            <a href={`mailto:${resume.email}`} className="footer-link">Email</a>
          )}
          {resume.linkedin && (
            <a href={resume.linkedin} target="_blank" rel="noopener noreferrer" className="footer-link">LinkedIn</a>
          )}
          {resume.github && (
            <a href={resume.github} target="_blank" rel="noopener noreferrer" className="footer-link">GitHub</a>
          )}
          <a href={resume.resumePdf} target="_blank" rel="noopener noreferrer" className="footer-link">Resume (PDF)</a>
        </div>
        <p className="footer-copy">© {new Date().getFullYear()} {resume.name}</p>
      </div>
    </footer>
  )
}
