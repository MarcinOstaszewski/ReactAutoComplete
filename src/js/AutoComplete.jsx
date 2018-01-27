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
			// check if value is on the list and save it OR CLEAR THE TEXT !!!
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
					filteredCountryNamesArray.push([this.state.autoCompleteText, item["country_name"]]);
				}
			});

			// console.log(filteredCountryNamesArray);
			
			
			// for (var i = 0; i <= this.state.countries.length; i++) {

			// }


			// let prompt = this.state.countries.filter( item => {
			// 	let countryItem = item['country_name'];
			// 	if (countryItem.includes("PO")) {
			// 		countryNamesArray.push(countryItem);
			// 	};
			// 	return true;
			// });
			

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
