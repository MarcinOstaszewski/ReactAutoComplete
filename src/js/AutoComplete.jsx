import React from 'react';
import ReactDOM from 'react-dom';

require('../sass/main.scss');

document.addEventListener('DOMContentLoaded', function() {

	class Autocomplete extends React.Component{
		constructor(props){
			super(props);
			this.state={
				
			}			
		}	
		

		render() {
			return (
				<div className="mainPage">
					<h1>Hello, World!</h1>
				</div>
			)
		}
	}

	ReactDOM.render(
			<Autocomplete />, document.getElementById('autocomplete')
		);
		
});
