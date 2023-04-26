import movieLogo from '../../movieLogo.png'
import { useNavigate } from 'react-router-dom';
const HomeButton = () => {
  const navigate = useNavigate();
    return(
      <div>
        <button style={{border:'none',backgroundColor:'transparent'}} onClick = {() => navigate('/')}>
          <div style={{ height: '60px', width: '100px', backgroundColor: '' }}>
            <img style={{ height: '100%', width: '100%' }} src={movieLogo} alt="Movie logo" />
        </div>
        </button>
      </div>
    );

}

export default HomeButton;