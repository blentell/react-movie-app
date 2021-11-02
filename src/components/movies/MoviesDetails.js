import React from "react";
// import PropTypes from "prop-types";
import "../../MovieDetails.css";


function MovieDetails(props) {
	return (
		<div className="MovieTabs">
			{props.moviesArray.map((item) => {
				// console.log(item.data.imdbRating);
				return (
					<div className="title" key={item.data.Poster}>
						<img src={item.data.Poster} alt="movie" />
						<div className="title" key={item.data.Title}>
							Title: <b>{item.data.Title}</b>
							<div key={item.data.imdbRating}>
								Rating: <b>{item.data.imdbRating}</b>
							</div>
						</div>
					</div>
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

export default MovieDetails;
