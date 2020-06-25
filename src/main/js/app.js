const ReactDOM = require('react-dom');
import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Navbar } from 'react-bootstrap';
import { Nav } from 'react-bootstrap';
import { NavItem } from 'react-bootstrap';
import './app.css';
import Apply from './views/Apply.js';
import Admin from './views/Admin/Admin.js';
import Login from './views/Login/login.js';
import Home from './views/Home/Home.js';

class App extends Component {
	constructor(props) {
		super(props);
		this.state = 'Apply to e-club!';
	}

	render() {
		// console.log('IN RENDER');
		return (
			<Router>
				<div>
					<div>
						<Navbar id="nav">
							<Navbar.Header>
								<Navbar.Brand>
									<div id="logo"> </div>
									<a href="/" id="application-portal">
										application portal
									</a>
								</Navbar.Brand>
								<Navbar.Toggle />
							</Navbar.Header>
							<Navbar.Collapse>
								<Nav pullRight>
									<NavItem eventKey={1} href="#">
										<a href="/" id="about">
											about
										</a>
									</NavItem>
								</Nav>
							</Navbar.Collapse>
						</Navbar>
					</div>
					<Switch>
						<Route exact path="/" component={Home} exact />
						{/* <Route path="/apply" component={Apply} /> */}
						<Route path="/admin" component={Admin} />
						<Route path="/loginpage" component={Login} />
						<Route component={Error} />
					</Switch>
				</div>
			</Router>
		);
	}
}

ReactDOM.render(<App />, document.getElementById('root'));
