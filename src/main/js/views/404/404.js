import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import { Row } from 'react-bootstrap';
import { Container } from 'react-bootstrap';
// import Logo from '../../resources/static/img/logo.png';
// import '../../app.css';
import './404.css';
import { FaGrinBeamSweat } from 'react-icons/fa';
import { FaMusic } from 'react-icons/fa';
import { addStyle } from 'react-bootstrap/lib/utils/bootstrapUtils';

addStyle(Button, 'apply');
class Error extends Component {
	render() {
		return (
			// <Container className="mt-2 pt-3">
			<div id="welcome-content">
				<Row className="center-block text-center">
					<div id="welcome-text">
						<h1>404</h1>
						<h3>The page you're looking for doesn't exist!</h3>
						<p>Try checking the previous page, or click the button below to go to our homepage.</p>
					</div>
					<Col>
						<div id="begin-button">
							<Button href="/" variant="main" bsStyle="apply" bsSize="large">
								Take me home <FaMusic className="ml-1" />
							</Button>
						</div>
					</Col>
				</Row>
				{/* <Row className="justify-content-center">
					<img src={Logo} height="40" alt="Newton Logo" className="mb-5" />
				</Row> */}
			</div>
			// </Container>
		);
	}
}

export default Error;
