
import src from '../../../images/img.png';
import './MoviesCardList.css';
import MovieCard from '../MoviesCard/MoviesCard';

function MoviesCardList() {
  return (
    <>
        <div className='moviesCardList'>
        <MovieCard
            movie={{
            src: src,
            title:
                'В погоне за бенкси',
            length: '1ч 18м',
            }}
            isSaved={true}
        />
        <MovieCard
            movie={{
            src: src,
            title: 'В погоне за бенкси',
            length: '1ч 18м',
            }}
            isSaved={true}
        />
        <MovieCard
            movie={{
            src: src,
            title: 'В погоне за бенкси',
            length: '1ч 18м',
            }}
            isSaved={false}
        />
        
        </div>
        <button className='moviesCardList__more'>Ещё</button>
    </>
  );
}

export default MoviesCardList;