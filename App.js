var React = require('react');
var Hero = require('./components/Hero');
var Perspective = require('./components/Perspective');
var Cube = require('./components/Cube');

var App = React.createClass({ displayName: 'App',

	render: function() {
		return (
			React.createElement(Hero, null,
				React.createElement(Perspective, null,
					React.createElement(Cube, { size: 150 })
				)
			)
		);
	}

});

React.render(
	React.createElement(App, null),
	document.getElementById('app')
);

module.exports = App;