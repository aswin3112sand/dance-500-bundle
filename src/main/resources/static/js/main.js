document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.dance-card').forEach(card => {
        card.addEventListener('click', () => {
            const title = card.getAttribute('data-title');
            alert(`Login success – "${title}" video access coming soon.`);
        });
    });
});
