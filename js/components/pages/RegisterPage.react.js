/*
 * RegisterPage
 *
 * Users login on this page
 * Route: /register
 *
 */

import React, { Component} from 'react';
import { connect } from 'react-redux';
import Form from '../Form.react';
import { sendingRequest, register } from '../../actions/AppActions';
import LoadingIndicator from '../LoadingIndicator.react';

export default class RegisterPage extends Component {
	componentWillMount() {
		// If the user is logged in, forward them to the homepage
		if (this.props.data.loggedIn === true) {
			if (this.props.location.state && this.props.location.state.nextPathname) {
				this.props.history.replaceState(null, this.props.location.state.nextPathname)
			} else {
				this.props.history.replaceState(null, '/')
			}
		}
	}

	render() {
		const dispatch = this.props.dispatch;
		const { loggedIn, formState, currentlySending } = this.props.data;

    return (
			<div className="form-page__wrapper">
				<div className="form-page__form-wrapper">
					<div className="form-page__form-header">
						<h2 className="form-page__form-heading">Register</h2>
					</div>
					{/* While the form is sending, show the loading indicator,
						otherwise show "Register" on the submit button */}
		    	<Form data={formState} dispatch={dispatch} location={location} history={this.props.history} onSubmit={::this._register} btnText={"Register"} currentlySending={currentlySending}/>
				</div>
			</div>
		);
  }

	// Register a user
	_register(username, password) {
		this.props.dispatch(register(username, password));
	}
}

// Which props do we want to inject, given the global state?
function select(state) {
  return {
    data: state
  };
}

// Wrap the component to inject dispatch and state into it
export default connect(select)(RegisterPage);
