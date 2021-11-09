import React from "react";
// import PropTypes from "prop-types";
import "../../MovieDetails.css";
import { Link } from "react-router-dom";



function MoviesDetails(props) {
	return (
		<div className="MovieTabs">
			{props.moviesArray.map((item) => {
				// console.log(item.data.imdbRating);
				return (
					<Link to={`/fetch-movie/${item.data.Title}`}>									
								
					<div className="title" key={item.data.Poster}>
						<img src={item.data.Poster} alt="movie" />
						<div className="title">
							Title: <b>{item.data.Title}</b>
							<div>
								Rating: <b>{item.data.imdbRating}</b>
							</div>
							</div>
					</div>
							</Link>
				);
			})}
		</div>
	);
}

// MovieDetails.propTypes = {
// 	Title: PropTypes.string.isRequired,
// 	Poster: PropTypes.string.isRequired,
// imdbRating: PropTypes.string.isRequired,
// 	moviesArray: PropTypes.array.isRequired,
// };

export default MoviesDetails;
