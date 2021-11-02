import React, { Component } from 'react'
import axios from 'axios';
import Loading from "../common/Loading";
import MovieDetails from "./MoviesDetails";
import "../../../src/Movies.css"

export class Movies extends Component {
	state = {
		poster: "",
		title: "",
		imdbRating: "",
		search: "",
		// initialSearch: "",
		isError: false,
		errorMessage: "",
		isLoading: false,
		moviesArray: [],
	};

	randomizePoster = () => {
		let searchArray = [
			"Superman",
			"lord of the ring",
			"batman",
			"Pokemon",
			"Harry Potter",
			"Star Wars",
			"avengers",
			"Terminator",
		];
		let randomize = Math.floor(Math.random() * 8);
		return searchArray[randomize];
	};

	async componentDidMount() {
		await this.fetchMovieApi(this.randomizePoster());
		
	}
	fetchMovieApi = async (search) => {
		this.setState({
			isLoading: true,
		});
		try {
			let payload = await axios.get(
				`https://www.omdbapi.com/?apikey=12384fbb&s=${search}&type=movie`
			);
			if (payload.data.Response === "False") {
				this.setState({
					isError: true,
					errorMessage: "No movie by that name",
					isLoading: false,
				});
			} else {
				let movieIdArray = payload.data.Search.map((item) => item.imdbID);
				let promiseMovieArray = movieIdArray.map(async (item) => {
					return await axios.get(
						`https://www.omdbapi.com/?apikey=12384fbb&i=${item}`
					);
				});
			

				Promise.all(promiseMovieArray)
					.then((result) => {
						this.setState({
							isError: false,
							errorMessage: "",
							isLoading: false,
							moviesArray: result,
						});
					})
					.catch((e) => {
						this.setState({
							isError: true,
							errorMessage: e.response.data,
							isLoading: false,
						});
					});
			}
			} catch (e) {
				if (e && e.response.status === "404") {
					this.setState({
						isError: true,
						errorMessage: e.response.data,
						isLoading: false,
					});
				}
			}
		}
	

	handleOnChange = (e) => {
		this.setState({
			[e.target.name]: e.target.value,
		});
	};

	handleOnClick = async (event) => {
		event.preventDefault();
		if ((this.state.search.length === 0)) {
			this.setState({
				isError: true,
				errorMessage: "Cannot submit an empty field",
			})
		}	else {
			this.fetchMovieApi(this.state.search);
		};
	}
	
	render() {
		return (
			<React.Fragment>
				<div className="searchbar">
					<input
						name="search"
						value={this.state.search}
						onChange={this.handleOnChange}
						className="input"
					/>
					<button className="search" onClick={this.handleOnClick}>Search</button>
					<div>
						{this.state.isError && <span className="span">{this.state.errorMessage}</span>}
					</div>
				</div>
				<hr />
				{this.state.isLoading ? (
					<Loading />
				) : (
					<MovieDetails
						poster={this.state.poster}
						title={this.state.title}
						imdbRating={this.state.imdbRating}
						moviesArray={this.state.moviesArray}
					/>
				)}
			</React.Fragment>
		);
	}
}

export default Movies
