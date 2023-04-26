import SearchButton from "../buttons/SearchButton";
import FavoriteButton from "../buttons/FavoritesButton";

const Footer = () => {
    return (
      <div className="App" style={{ backgroundColor: 'white', padding: '20px 0' }}>
        <div className="footer" style={{ backgroundColor: 'white', position: 'fixed', bottom: 0, left: 0, width: '100%', height: '80px', display: 'flex', flexWrap: 'wrap', justifyContent: "space-around", borderTop: '0.2px solid rgba(0, 0, 0, 0.1)', borderTopLeftRadius: '10px', borderTopRightRadius: '10px', alignItems: 'center', padding: '0 20px', zIndex: 999 }}>
            <SearchButton/>
            <FavoriteButton/>
        </div>
      </div>
    );
  };
  
  export default Footer;
  