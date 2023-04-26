import starLogo from '../../star.png'
import { useNavigate, useLocation } from 'react-router-dom';

const FavoriteButton = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const isFavoritesPage = location.pathname === '/favorites';

    return (
        <button
            style={{
                border: 'none',
                backgroundColor: isFavoritesPage ? '#e6e8e9' : 'transparent'
            }}
            onClick={() => navigate('/favorites')}
        >
            <div
                style={{
                    height: '50px',
                    width: '50px',
                    backgroundColor: '',
                    margin: '15px'
                }}
            >
                <img
                    style={{ height: '100%', width: '100%' }}
                    src={starLogo}
                    alt="Star logo"
                />
            </div>
        </button>
    );
}

export default FavoriteButton;

