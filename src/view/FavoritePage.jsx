import Header from "../components/navbars/Header";
import Footer from "../components/navbars/Footer";
import MovieCard from "../components/MovieCard";
import { useEffect , useState } from "react";
import Pagination from "../components/pagination/pagination";
const PAGE_SIZE = 10;

const FavoritePage = () => {
const [movies, setMovies] = useState([]);
const [currentPage, setCurrentPage] = useState(1);

useEffect(() => {
  const storedMovies = JSON.parse(localStorage.getItem('movies')) || [];
  setMovies(storedMovies);
}, []);

const handlePageClick = (page) => {
  setCurrentPage(page);
};

const startIndex = (currentPage - 1) * PAGE_SIZE;
const endIndex = startIndex + PAGE_SIZE;
const displayedMovies = movies.slice(startIndex, endIndex);

return (
  <div>
    <Header />
    {movies.length !== 0 ?
      <div style={{ paddingTop: '10px', paddingBottom: '10px' }}>
        <Pagination
              currentPage={currentPage}
              pageSize={PAGE_SIZE}
              totalItems={movies.length}
              onPageClick={handlePageClick}
            />
          <div
            style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '10px',
            }}
            >
          {displayedMovies.map((movie) => (
          <MovieCard key={movie.id} {...movie} />
          ))}
          </div>
        <Pagination
              currentPage={currentPage}
              pageSize={PAGE_SIZE}
              totalItems={movies.length}
              onPageClick={handlePageClick}
            />
      </div>
      :
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', textAlign: 'center', height:'90vh'}}>
  <h1>EMPTY, Add some to favorites!</h1>
</div>
    }
    <Footer />
  </div>
  );
};

export default FavoritePage;