import { BrowserRouter as Router,Routes,Route } from "react-router-dom";
import SearchPage from '../view/SearchPage';
import FavoritePage from '../view/FavoritePage';
import HomePage from '../view/HomePage'
import MovieDetails from './MovieDetails'

const Routers = () => {
  return (
    <div>
          <Router>
            <Routes>
                <Route exact path='/' element={<HomePage/>}/>
                <Route path='/favorites' element={<FavoritePage/>}/>
                <Route path='/search' element={<SearchPage/>}/>
                <Route path='/search/:movieId' element={<MovieDetails/>}/> 
            </Routes>
        </Router>
    </div>
  );
}

export default Routers;