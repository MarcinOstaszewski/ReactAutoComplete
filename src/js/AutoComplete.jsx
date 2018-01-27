import React from 'react';
import ReactDOM from 'react-dom';

require('../sass/main.scss');

document.addEventListener('DOMContentLoaded', function() {

	class Autocomplete extends React.Component{
		constructor(props){
			super(props);
			this.state={
				autoCompleteText : "",
				countries : []
			}			
		}	
		
		handleChange = (event) => {
			this.setState({ autoCompleteText: event.target.value });
		}

		validateCountry = () => {
			return true;
		}

		render() {
			return (
				<div className="mainPage">
					<div className="container">
						<h1 className="title">
							Mój pierwszy AutoComplete w ReactJS
						</h1>
						<p className="description">
							Podaj nazwę państwa:
						</p>
						<input
							required
							className="countryInput"
							name="country"
							type="text"
							value={this.state.autoCompleteText}
							onChange={this.handleChange}
							onBlur={this.validateCountry}
						/>
						<div className="prompt"></div>
					</div>
				</div>
			)
		}
	}

	ReactDOM.render(
			<Autocomplete />, document.getElementById('autocomplete')
		);
		
});
