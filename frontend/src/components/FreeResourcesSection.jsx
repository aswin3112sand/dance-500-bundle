import resourceOne from '../assets/catalog-2.jpg'
import resourceTwo from '../assets/catalog-3.jpg'
import resourceThree from '../assets/catalog-1.jpg'
import resourceFour from '../assets/hero-model.jpg'

const resources = [
  {
    id: 1,
    title: 'Footwork Warmups',
    desc: 'Short drills to improve balance and timing before you start.',
    image: resourceOne,
    link: 'https://drive.google.com/file/d/1z3tCpmmEovzg31GXvv7-6_dXVKCH283Q/view?usp=drive_link'
  },
  {
    id: 2,
    title: 'Count Practice Pack',
    desc: 'Simple count guides to make rhythm practice feel effortless.',
    image: resourceTwo,
    link: 'https://drive.google.com/file/d/1z3tCpmmEovzg31GXvv7-6_dXVKCH283Q/view?usp=drive_link'
  },
  {
    id: 3,
    title: 'Beginner Flow Map',
    desc: 'A clear path to build confidence with easy sequences.',
    image: resourceThree,
    link: 'https://drive.google.com/file/d/1z3tCpmmEovzg31GXvv7-6_dXVKCH283Q/view?usp=drive_link'
  },
  {
    id: 4,
    title: 'Studio Etiquette',
    desc: 'Know what to bring, how to warm up, and how to stay consistent.',
    image: resourceFour,
    link: 'https://drive.google.com/file/d/1z3tCpmmEovzg31GXvv7-6_dXVKCH283Q/view?usp=drive_link'
  }
]

export default function FreeResourcesSection() {
  return (
    <section className="resources" id="resources">
      <div className="container">
        <p className="section-kicker">FREE RESOURCES</p>
        <h2>Free resources to explore</h2>
        <p className="section-sub">
          A curated set of view-only previews to help you experience the teaching style before you commit.
        </p>
        <div className="resource-grid">
          {resources.map((resource) => (
            <article className="glass-card resource-card" key={resource.id}>
              <div className="resource-thumb">
                <img src={resource.image} alt={resource.title} loading="lazy" decoding="async" />
                <span className="resource-tag">Free preview</span>
              </div>
              <div className="resource-body">
                <h3 className="resource-title">{resource.title}</h3>
                <p className="resource-desc">{resource.desc}</p>
                <div className="resource-actions">
                  <span className="preview-note">View-only</span>
                  <a className="btn btn-ghost" data-magnetic href={resource.link} target="_blank" rel="noreferrer">Preview</a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
