var React = require('react');

var Hero = React.createClass({ displayName: 'Hero',

	render: function() {
		return (
			React.createElement('div', { className: 'Hero' },
				this.props.children
			)
		);
	}

});

module.exports = Hero;