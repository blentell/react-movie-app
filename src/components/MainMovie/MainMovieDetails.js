import axios from "axios";
import React, { Component } from "react";
import MovieDetails from "../movies/MoviesDetails";
export class MainMovieDetail extends Component {
	state = {
		poster: "",
		title: "",
		imdbRating: "",
		search: "",
		isError: false,
		errorMessage: "",
		isLoading: false,
		moviesArray: [],
	};

	async componentDidMount() {
		this.setState({
			isLoading: true,
		});
		console.log(this.props);
		try {
			let payload = await axios.get(
				`https://www.omdbapi.com/?apikey=12384fbb&s=${this.props.match.params.name}&type=movie/`
			);

			this.setState({
				poster: payload.data.Poster,
				title: payload.data.Title,
				imdbRating: payload.data.imdbRating,
				moviesArray: payload,
				isError: false,
				errorMessage: "",
				isLoading: false,
			});
		} catch (e) {
			console.log(e);
		}
	}

	render() {
		return (
			<div>
				{this.state.isLoading ? (
					<div>...loading</div>
				) : (
					<MovieDetails
						title={this.state.title}
						poster={this.state.poster}
						imdbRating={this.state.imdbRating}
						moviesArray={this.state.moviesArray}
					/>
				)}
			</div>
		);
	}
}

export default MainMovieDetail;
