import React from 'react';
import ReactDOM from 'react-dom';

require('../sass/main.scss');

document.addEventListener('DOMContentLoaded', function() {

	class Autocomplete extends React.Component{
		constructor(props){
			super(props);
			this.state={
				autoCompleteText : "",
				countriesWithIds : [],
				countryNames: []
			}			
		}	
		
		handleChange = (event) => {
			this.setState({ autoCompleteText: event.target.value });
		}

		promptItemClicked = (event) => {
			this.setState({autoCompleteText: event.currentTarget.id});
			document.getElementById("countryInput").focus();
		}

		validateCountry = (event) => {
			event.preventDefault();
			// Checks if given value is on the list and SAVES it or CLEARS the text
			if (this.state.countryNames.includes( this.state.autoCompleteText )) {
				document.getElementById("countryChosenText").innerText = this.state.autoCompleteText;
				document.getElementById("description").innerText = "Wybrano: ";
				document.getElementById("countryChosen").classList.toggle("invisible");
				document.getElementById("countryChosenText").classList.toggle("invisible");
				document.getElementById("countryChosenButton").classList.toggle("invisible");
				document.getElementById("form").classList.toggle("invisible");
				document.getElementById("countryPrompt").classList.toggle("invisible");
			} else {
				this.setState({
					autoCompleteText : ""
				});
				console.log("No such country");
			}
			return true;
		}

		handleItemBlur = () => {

		}

		changeChosenCountry = () => {

		}

		createPromptList = (inputArray) => {
			let promptList = inputArray.map( (item, index) => {
				return ( 
					<li key={index} className="promptList"> 
						<div className="listItem" onClick={this.promptItemClicked} id={item[0]}>
							<span className="leftAlign">{item[0]}</span> 
							<span className="rightAlign">( {item[1]} )</span>
						</div>
					</li>
				);
			});
			return promptList;
		}

		componentDidMount() {

			let countriesUrl = 'http://vocab.nic.in/rest.php/country/json';
			let tempCountriesWithIds = [],
				tempCountryNames = [];

			fetch(countriesUrl).then( r => r.json() ).then( response => {
				response = response.countries;  // gets rid of an enclosing object key
				response.forEach( item => {
					tempCountriesWithIds.push(item.country);
					tempCountryNames.push(item.country["country_name"]);
				}); // creates an array of objects { country_id: "...", country_name: "..." } and an array of country names

				this.setState({
					countriesWithIds : tempCountriesWithIds,
					countryNames : tempCountryNames.sort()
				});
			});
		}

		render() {

			let filteredCountryNamesArray = [],
				filteredCountryIdsArray = [];
			this.state.countriesWithIds.forEach( item => {
				if (item["country_name"].slice(0,this.state.autoCompleteText.length) == this.state.autoCompleteText.toUpperCase()) {
					filteredCountryNamesArray.push([item["country_name"], item["country_id"]]);
				}
				if (this.state.autoCompleteText.length >= 3) { 
					filteredCountryIdsArray = []; // delete this list if input longer then ID (>2 letters)
				} else {
					if (item["country_id"].slice(0,this.state.autoCompleteText.length) == this.state.autoCompleteText.toUpperCase()) {
						filteredCountryIdsArray.push([item["country_name"], item["country_id"]]);
					}
				}
			});		

			filteredCountryNamesArray.sort();
			filteredCountryIdsArray.sort();
			
			let idsList = this.createPromptList(filteredCountryIdsArray);
			let namesList = this.createPromptList(filteredCountryNamesArray);
			let divider = (
				<li key="0000" className="promptList"> 
					<div className="listItem">
						<span></span>
						<span className="divider">
							- - - - - matchings found in country code - - - - -
						</span>
						<span></span>
					</div>
				</li>
			);
			


			return (
				<div className="mainPage">
					<div className="container">
						<h1 className="title">
							ReactJS AutoComplete Component
						</h1>
						<p id="description">
							Choose a country by starting to type its name or code:
						</p>
						<form id="form" onSubmit={this.validateCountry}>
							<input
								id="countryInput"
								required
								autoFocus="true"
								autoComplete="off"
								className="countryInput"
								name="country"
								type="text"
								value={this.state.autoCompleteText}
								onChange={this.handleChange}
								onBlur={this.handleInputBlur}
							/>
							<ul id="countryPrompt">
								{this.state.autoCompleteText != "" ? namesList : null }
								{this.state.autoCompleteText != "" ? divider : null }
								{this.state.autoCompleteText.length > 0 && this.state.autoCompleteText.length < 3 ? idsList : null }
							</ul>
						</form>
						<div id="countryChosen" className="countryChosen invisible">
							<div id="countryChosenText" className="countryChosenText invisible">sdadasda</div>
							<div id="countryChosenButton" className="countryChosenButton invisible" onClick={this.changeChosenCountry}> ZMIEŃ</div>
						</div>
					</div>
				</div>
			)
		}
	}

	ReactDOM.render(
			<Autocomplete />, document.getElementById('autocomplete')
		);
		
});
