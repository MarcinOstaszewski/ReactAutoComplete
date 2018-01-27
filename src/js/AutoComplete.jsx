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
			// !!! check if value is on the list and save it OR CLEAR THE TEXT !!!
		}

		componentDidMount() {

			let countriesUrl = 'http://vocab.nic.in/rest.php/country/json';
			let tempCountries = [];

			fetch(countriesUrl).then( r => r.json() ).then( response => {
				response = response.countries;  // gets rid of an enclosing key
				response.forEach( item => {
					tempCountries.push(item.country)
				}) // returns an array of objects { country_id: "...", country_name: "..." }


				this.setState({
					countries : tempCountries
				})
			});
		}

		render() {

			let filteredCountryNamesArray = [];
			this.state.countries.forEach( item => {
				if (item["country_name"].includes(this.state.autoCompleteText.toUpperCase())) {
					filteredCountryNamesArray.push([item["country_name"], item["country_id"]]);
				}
			});			
			console.log(filteredCountryNamesArray);

			let countryPrompt = filteredCountryNamesArray.map( (item, index) => {
				return ( 
					<li key={index} className="promptList"> 
						<span className="leftAlign">{item[1]} </span> 
						<span className="rightAlign"> {item[0]}</span>
					</li>
				);
			});

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
						<ul className="countryPrompt">
							{this.state.autoCompleteText != "" ? countryPrompt : null }
						</ul>
					</div>
				</div>
			)
		}
	}

	ReactDOM.render(
			<Autocomplete />, document.getElementById('autocomplete')
		);
		
});
