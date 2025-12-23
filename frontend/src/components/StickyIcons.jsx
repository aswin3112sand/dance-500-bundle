import { MessageCircle, Mail } from 'lucide-react';

const StickyIcons = () => {
    return (
        <div className="sticky-icons">
            <a href="https://wa.me/919876543210" target="_blank" rel="noreferrer" className="sticky-icon">
                <MessageCircle size={20} />
            </a>
            <a href="mailto:support@asdance.com" className="sticky-icon">
                <Mail size={20} />
            </a>
        </div>
    );
};

export default StickyIcons;
