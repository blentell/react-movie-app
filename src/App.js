import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Movies from "./components/movies/Movies"
import MainMovie from './components/MainMovie/MainMovie';

import "./App.css";

export class App extends Component {
  render() {
    return (
			<div className="App">
				{/* <Movies /> */}
				<Router>
					<Switch>
						<Route exact path="/abc" render={() => <h1>abc page</h1>} />
						<Route
							exact
							path="/fetch-movie/:name"
							component={MainMovie}
						/>
						<Route exact path="/" component={Movies} />
						<Route render={() => <h1>Not found 404</h1>} />
					</Switch>
				</Router>
			</div>
		);
  }
}

export default App

