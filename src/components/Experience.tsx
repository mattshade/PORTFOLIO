import { resume } from '../data/resume'
import './Experience.css'

export function Experience() {
  return (
    <section id="experience" className="section experience">
      <div className="section-inner">
        <h2 className="section-title">Experience</h2>
        <div className="experience-list">
          {resume.experience.map((job, i) => (
            <div key={i} className="experience-item glass" style={{ animationDelay: `${i * 80}ms` }}>
              <div className="experience-header">
                <h3 className="experience-role">{job.role}</h3>
                <span className="experience-company">{job.company}</span>
                {(job as { location?: string | null }).location && (
                  <span className="experience-location">{(job as { location: string }).location}</span>
                )}
                <span className="experience-period">{job.period}</span>
              </div>
              {(job as { description?: string }).description && (
                <p className="experience-desc">{(job as { description: string }).description}</p>
              )}
              {(job as { highlights?: string[] }).highlights?.length ? (
                <ul className="experience-highlights">
                  {(job as { highlights: string[] }).highlights.map((h, j) => (
                    <li key={j} className="experience-highlight">{h}</li>
                  ))}
                </ul>
              ) : null}
            </div>
          ))}
        </div>
        <div className="skills-wrap">
          <h3 className="skills-title">Skills</h3>
          <ul className="skills-list">
            {resume.skills.map((s) => (
              <li key={s} className="skills-item">{s}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
