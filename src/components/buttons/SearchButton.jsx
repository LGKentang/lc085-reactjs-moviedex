import searchLogo from '../../search.png'
import { useNavigate, useLocation } from 'react-router-dom';

const SearchButton = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const isSearchPage = location.pathname === '/search';

    return (
        <button
            style={{
                border: 'none',
                backgroundColor: isSearchPage ? '#e6e8e9' : 'transparent'
            }}
            onClick={() => navigate('/search')}
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
                    src={searchLogo}
                    alt="Search logo"
                />
            </div>
        </button>
    )
}

export default SearchButton;
