import axios from "axios";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import Movies from "../movies/Movies";

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
				`https://www.omdbapi.com/?apikey=12384fbb&s=${search}&type=movie`
			);

			this.setState({
				moviesArray: payload.data.results,
				isLoading: false,
			});
		} catch (e) {}
	}
	render() {
		return (
			<div>
				{this.state.isLoading ? (
					<div>...loading</div>
				) : (
					this.state.moviesArray.map((item) => {
						return (
							<div key={item.title}>
								<Link to={`/fetch-movie/${item.title}`}>
									<div>{item.title}</div>{" "}
								</Link>
							</div>
						);
					})
				)}
			</div>
		);
	}
}

export default MainMovie;
