import React from 'react'

const MovieCard = ({movie: {title, release_date, vote_average, vote_count, poster_path, original_language}}) => {
  return (
    <div className='movie-card'>
        <img src={poster_path ? `https://image.tmdb.org/t/p/w500/${poster_path}` : '/no-movie.png'} alt={title} />
        
        <div>
            <h3 className='mt-4'>{title}</h3>

            <div className='content'>
                <div className='rating'>
                    <img src="Star.svg" alt="Star Icon" />
                    <p>{vote_average ? vote_average.toFixed(1) : 'N/A'}</p>
                    <span>•</span>
                    <p>{vote_count || 'N/A'} Ratings</p>
                </div>
                <span>•</span>
                <p className='lang'>{original_language  || 'N/A'}</p>
                <span>•</span>
                <p className='year'>{release_date ? release_date.split('-')[0] : 'N/A'}</p>
            </div>
        </div>
    </div>
  )
}

export default MovieCard