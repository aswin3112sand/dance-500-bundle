import previewOne from '../assets/catalog-1.jpg'
import previewTwo from '../assets/catalog-2.jpg'
import previewThree from '../assets/catalog-3.jpg'
import previewFour from '../assets/hero-model.jpg'

const previews = [
  {
    id: 1,
    title: 'Velvet Waves',
    duration: '00:45',
    level: 'Beginner',
    image: previewOne,
    link: 'https://drive.google.com/file/d/1z3tCpmmEovzg31GXvv7-6_dXVKCH283Q/view?usp=drive_link',
    locked: false
  },
  {
    id: 2,
    title: 'Pulse Drop',
    duration: '00:55',
    level: 'Intermediate',
    image: previewTwo,
    link: 'https://drive.google.com/file/d/1z3tCpmmEovzg31GXvv7-6_dXVKCH283Q/view?usp=drive_link',
    locked: false
  },
  {
    id: 3,
    title: 'Neon Glide',
    duration: '01:05',
    level: 'Advanced',
    image: previewThree,
    link: 'https://drive.google.com/file/d/1z3tCpmmEovzg31GXvv7-6_dXVKCH283Q/view?usp=drive_link',
    locked: true
  },
  {
    id: 4,
    title: 'Studio Flow',
    duration: '00:50',
    level: 'Advanced',
    image: previewFour,
    link: 'https://drive.google.com/file/d/1z3tCpmmEovzg31GXvv7-6_dXVKCH283Q/view?usp=drive_link',
    locked: true
  }
]

export default function VideoPreview() {
  return (
    <section id="preview" className="video-preview">
      <div className="container">
        <p className="section-kicker">PREVIEW DANCE STEPS</p>
        <h2>Preview Dance Steps</h2>
        <p className="section-sub">
          Four curated previews with clear timing and view-only access, designed to match the full bundle style.
        </p>
        <div className="preview-grid">
          {previews.map((item) => (
            <article className={`glass-card preview-card${item.locked ? ' locked-card' : ''}`} key={item.id}>
              <div className="preview-thumb">
                <img src={item.image} alt={item.title} loading="lazy" decoding="async" />
                <span className="preview-tag">{item.level}</span>
                {item.locked && (
                  <>
                    <span className="lock-badge"><span className="lock-icon" /> Locked</span>
                    <span className="lock-tooltip">Unlock with &#8377;499 - Lifetime access</span>
                  </>
                )}
              </div>
              <div className="preview-body">
                <h3 className="preview-title">{item.title}</h3>
                <div className="preview-meta">
                  <span>Duration {item.duration}</span>
                  <span>View-only</span>
                </div>
                <div className="preview-actions">
                  <span className="preview-note">Free preview</span>
                  <a className="btn btn-ghost" data-magnetic href={item.link} target="_blank" rel="noreferrer">Preview</a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
