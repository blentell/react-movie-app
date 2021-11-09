import axios from "axios";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import MovieDetails from "../movies/MoviesDetails";

export class MainMovie extends Component {
	state = {
		isLoading: false,
		moviesArray: [],
	};

	async componentDidMount() {
		this.setState({
			isLoading: true,
		});
		try {
			let payload = await axios.get(
				`https://www.omdbapi.com/?apikey=12384fbb&t=${this.props.match.params.name}&type=movie`
			);
			console.log(payload.data);
				
			this.setState({
				moviesArray: payload.data,
				isLoading: false,
			}, () => {
				console.log(this.state.moviesArray);
			});
	

		} catch (e) { }
	}
	render() {
		const { moviesArray } = this.state;
		return (
			<div>
				{this.state.isLoading ? (
					<div>...loading</div>
				) : (
					<div className="title">
						<img src={moviesArray.Poster} alt="movie" />
						<div className="title">
							Title: <b>{moviesArray.Title}</b>
							<div>
								Rating: <b>{moviesArray.imdbRating}</b>
							</div>
						</div>
					</div>
				)}
			</div>
		);
	}
}
export default MainMovie;
