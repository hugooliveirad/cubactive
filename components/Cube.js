var React = require('react');
var EventHandler = require('rx-react').EventHandler;
var Rx = require('rx');
var _ = require('lodash');
var s = require('react-prefixr');


var CubeFace = React.createClass({ displayName: 'CubeFace',

	propTypes: {
		// size of the square
		size: React.PropTypes.number.isRequired,
		// number of the face {1..6}
		number: React.PropTypes.oneOf(_.range(0, 6)).isRequired
	},

	rotates: [
		'Y(0deg)',
		'X(-90deg)',
		'X(180deg)',
		'X(90deg)',
		'Y(-90deg)',
		'Y(90deg)'
	],

	getStyle: function() {
		var $number = this.props.number;
		var $size = this.props.size;

		var style = s({
			width: this.props.size + 'px',
			height: this.props.size + 'px',
			transform: 'rotate'+this.rotates[$number]+' translateZ('+$size/2+'px)'
		});

		return style;
	},

	render: function() {
		var style = this.getStyle();
		var $number = this.props.number;

		return (
			React.createElement('div', {
				className: 'Cube-face Cube-face--'+$number,
				style: style
			})
		);
	}

});


var Cube = React.createClass({ displayName: 'Cube',

	propTypes: {
		// size of each facet
		size: React.PropTypes.number.isRequired,
		// perspective of the cube
		perspective: React.PropTypes.arrayOf(React.PropTypes.number)
	},

	getDefaultProps: function() {
		return {
			perspective: [-30, -30]
		};
	},

	getStyle: function() {
		var $size = this.props.size;
		var $perspective = this.props.perspective;

		var style = s({
			width: this.props.size,
			height: this.props.size,
			transform: 'translate3d(-50%, -50%, -'+$size+'px)'+
					   'rotateY('+$perspective[0]+'deg) '+
					   'rotateX('+$perspective[1]+'deg)'
		});

		return style;
	},

	getFaces: function() {
		var faces = _.map(_.range(0, 6), this.getFace);

		return faces;
	},

	getFace: function(number) {
		return React.createElement(CubeFace, {
			size: this.props.size,
			number: number
		});
	},

	render: function() {
		var style = this.getStyle();
		var faces = this.getFaces();

		return (
			React.createElement('div', {
				className: 'Cube',
				style: style
			}, faces)
		);
	}

});

module.exports = Cube;