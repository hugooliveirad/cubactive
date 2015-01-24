var React = require('react');
var Hero = require('./components/Hero');
var Perspective = require('./components/Perspective');
var Cube = require('./components/Cube');

var App = React.createClass({ displayName: 'App',

	render: function() {
		return (
			React.createElement(Hero, null,
				[
					React.createElement(Perspective, { type: 'Mouse' },
						React.createElement(Cube, { size: 200 })
					),
					React.createElement(Perspective, { type: 'Orientation' },
						React.createElement(Cube, { size: 100 })
					)
				]
			)
		);
	}

});

React.render(
	React.createElement(App, null),
	document.getElementById('app')
);

module.exports = App;