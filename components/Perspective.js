var React = require('react/addons');
var _ = require('lodash');
var curryRight = require('curry-d').curryRight;
var EventHandler = require('rx-react').EventHandler;
var Rx = require('rx');
var viewport = require('viewport-size');

function getCursorPerspective(position) {
	var x = position[0];
	var y = position[1];
	var vW = viewport.getWidth();
	var vH = viewport.getHeight();

	// perspectives. -100 ~ 100. 0 is center
	var pX = (x * 200 / vW) - 100;
	var pY = (y * 200 / vH) - 100;

	return [pX, pY];
}

function getOrientationPerspective(position) {
	var b = position[0];
	var g = position[1];
	var max = 90;

	// perspectives. -100 ~ 100. 0 is center
	var pB = (b * 200 / max) - 100;
	var pG = (g * 200 / max) - 100;

	return [pG, pB];
}

function makeSetState(stateName) {
	return function(value) {
		var state = {};
		state[stateName] = value;
		this.setState(state);
	};
}

var Perspective = React.createClass({ displayName: 'Perspective',

	propTypes: {
		type: React.PropTypes.oneOf(['Mouse', 'Orientation'])
	},

	getInitialProps: function() {
		return {
			type: 'Mouse'
		};
	},

	getInitialState: function() {
		return {
			perspective: [0, 0]
		};
	},

	componentWillMount: function() {
		this['handle'+this.props.type]();
	},

	handleOrientation: function() {
		var orientationSource = Rx.Observable.fromEvent(window, 'deviceorientation');

		// get all orientation changes
		orientationSource
			// pick just the desired properties
			.map(
				curryRight(_.pick)('gamma')('beta')
			)
			// transform into an array of the values
			.map(_.values)
			// get the cursor perspective
			.map(getOrientationPerspective)
			// finally set state
			.subscribe(_.bind(makeSetState('perspective'), this));
	},

	handleMouse: function() {
		var mouseSource = Rx.Observable.fromEvent(document, 'mousemove');
		var touchSource = Rx.Observable.fromEvent(window, 'touchmove');

		var touchSource = touchSource
			// map touchSource to get just the first touch info
			.map(function(evt) {
				return _.first(evt.touches);
			});

		touchSource.merge(mouseSource)
			// pick just the desired properties
			.map(
				curryRight(_.pick)('pageY')('pageX')
			)
			// transform into an array of the values
			.map(_.values)
			// get the cursor perspective
			.map(getCursorPerspective)
			// finally set state
			.subscribe(_.bind(makeSetState('perspective'), this));
	},

	renderChild: function(child) {
		var $perspective = this.state.perspective;

		return React.addons.cloneWithProps(child, { perspective: $perspective });
	},

	renderChildren: function() {
		return React.Children.map(this.props.children, this.renderChild);
	},

	render: function() {
		var children = this.renderChildren();

		return (
			React.createElement('div', { className: 'Perspective' },
				children
			)
		);
	}

});

module.exports = Perspective;