import catalogOne from '../assets/catalog-1.jpg';
import catalogTwo from '../assets/catalog-2.jpg';
import catalogThree from '../assets/catalog-3.jpg';

const Catalog = () => {
    const items = [
        {
            title: 'Firestarter Footwork',
            level: 'Intermediate',
            note: 'Naatu naatu... feel the hook, hit the counts.',
            image: catalogOne
        },
        {
            title: 'Velvet Waves',
            level: 'Beginner',
            note: 'Smooth waves for the chorus. Clean step numbers.',
            image: catalogTwo
        },
        {
            title: 'Pulse Drop',
            level: 'Advanced',
            note: 'Stage-ready groove — chorus hits with confidence.',
            image: catalogThree
        }
    ];

    return (
        <section id="catalog" className="section">
            <div className="container">
                <p className="hero-kicker">POPULAR CLASSES</p>
                <h2 className="section-title">Glowing catalog of routines</h2>
                <p className="section-subtitle mb-4">
                    Official dance tutorial previews • Secure Google Drive (view only)
                </p>
                <div className="catalog-grid">
                    {items.map((item) => (
                        <div key={item.title} className="catalog-card">
                            <img src={item.image} alt={item.title} loading="lazy" />
                            <div className="catalog-card-body">
                                <span className="catalog-tag">{item.level}</span>
                                <h5 className="mb-2">{item.title}</h5>
                                <p className="text-muted small mb-0">{item.note}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Catalog;
