import HomeButton from '../buttons/HomeButton';

const Header = () =>{
    return (
        <div className="App" style={{ backgroundColor: 'white', padding: '20px 0' }}>
          <div className="header" style={{backgroundColor: 'white', position: 'fixed', top: 0, left: 0, width: '100%', height: '80px', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', borderBottom: '0.2px solid rgba(0, 0, 0, 0.1)',borderBottomLeftRadius:'10px',borderBottomRightRadius:'10px', alignItems: 'center', padding: '0 20px', zIndex: 999 }}>
            <HomeButton/>  
          </div>
        </div>
      );
      
}

export default Header;