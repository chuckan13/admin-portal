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
import LoginBadCred from './views/Login/loginbadcred.js';
import Home from './views/Home/Home.js';
import Error from './views/404/404.js';
import Edit from './views/EditAccount/Editaccount.js';

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
										Application Portal
									</a>
								</Navbar.Brand>
								<Navbar.Toggle />
							</Navbar.Header>
							<Navbar.Collapse>
								<Nav pullRight>
									<NavItem eventKey={1} href="/edit">
										<a href="/edit" id="about">
											Edit Account
										</a>
									</NavItem>
									<NavItem eventKey={2} href="/admin">
										<a href="/admin" id="about">
											Dashboard
										</a>
									</NavItem>
									<NavItem eventKey={3} href="/logout">
										<a href="/logout" id="about">
											Logout
										</a>
									</NavItem>
								</Nav>
							</Navbar.Collapse>
						</Navbar>
					</div>
					<Switch>
						<Route exact path="/" component={Home} exact />
						{/* <Route path="/apply" component={Apply} /> */}
						<Route path="/edit" component={Edit} />
						<Route path="/admin" component={Admin} />
						<Route path="/loginpage" component={Login} />
						<Route path="/badcredentials" component={LoginBadCred} />
						<Route component={Error} />
					</Switch>
				</div>
			</Router>
		);
	}
}

ReactDOM.render(<App />, document.getElementById('root'));
