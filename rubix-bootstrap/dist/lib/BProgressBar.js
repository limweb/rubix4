'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _styleMaps = require('react-bootstrap/lib/styleMaps');

var _bootstrapUtils = require('react-bootstrap/lib/utils/bootstrapUtils');

var _deprecationWarning = require('react-bootstrap/lib/utils/deprecationWarning');

var _deprecationWarning2 = _interopRequireDefault(_deprecationWarning);

var _ValidComponentChildren = require('react-bootstrap/lib/utils/ValidComponentChildren');

var _ValidComponentChildren2 = _interopRequireDefault(_ValidComponentChildren);

var _Interpolate = require('react-bootstrap/lib/Interpolate');

var _Interpolate2 = _interopRequireDefault(_Interpolate);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Custom propTypes checker
 */
function onlyProgressBar(props, propName, componentName) {
  if (props[propName]) {
    var _ret = function () {
      var error = void 0,
          childIdentifier = void 0;

      _react2.default.Children.forEach(props[propName], function (child) {
        if (child.type !== ProgressBar) {
          //eslint-disable-line
          childIdentifier = child.type.displayName ? child.type.displayName : child.type;
          error = new Error('Children of ' + componentName + ' can contain only ProgressBar components. Found ' + childIdentifier);
        }
      });

      return {
        v: error
      };
    }();

    if ((typeof _ret === 'undefined' ? 'undefined' : (0, _typeof3.default)(_ret)) === "object") return _ret.v;
  }
}

var ProgressBar = function (_React$Component) {
  (0, _inherits3.default)(ProgressBar, _React$Component);

  function ProgressBar() {
    (0, _classCallCheck3.default)(this, ProgressBar);
    return (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(ProgressBar).apply(this, arguments));
  }

  (0, _createClass3.default)(ProgressBar, [{
    key: 'getPercentage',
    value: function getPercentage(now, min, max) {
      var roundPrecision = 1000;
      return Math.round((now - min) / (max - min) * 100 * roundPrecision) / roundPrecision;
    }
  }, {
    key: 'render',
    value: function render() {
      if (this.props.isChild) {
        return this.renderProgressBar();
      }

      var content = void 0;

      if (this.props.children) {
        content = _ValidComponentChildren2.default.map(this.props.children, this.renderChildBar);
      } else {
        content = this.renderProgressBar();
      }

      return _react2.default.createElement(
        'div',
        (0, _extends3.default)({}, this.props, {
          className: (0, _classnames2.default)(this.props.className, 'progress'),
          min: null,
          max: null,
          label: null,
          'aria-valuetext': null
        }),
        content
      );
    }
  }, {
    key: 'renderChildBar',
    value: function renderChildBar(child, index) {
      return (0, _react.cloneElement)(child, {
        isChild: true,
        key: child.key ? child.key : index
      });
    }
  }, {
    key: 'renderProgressBar',
    value: function renderProgressBar() {
      var _props = this.props;
      var className = _props.className;
      var label = _props.label;
      var now = _props.now;
      var min = _props.min;
      var max = _props.max;
      var style = _props.style;
      var color = _props.color;
      var props = (0, _objectWithoutProperties3.default)(_props, ['className', 'label', 'now', 'min', 'max', 'style', 'color']);


      var percentage = this.getPercentage(now, min, max);

      if (typeof label === 'string') {
        label = this.renderLabel(percentage);
      }

      if (this.props.srOnly) {
        label = _react2.default.createElement(
          'span',
          { className: 'sr-only' },
          label
        );
      }

      var classes = (0, _classnames2.default)(className, (0, _bootstrapUtils.getClassSet)(this.props), (0, _defineProperty3.default)({
        active: this.props.active
      }, (0, _bootstrapUtils.prefix)(this.props, 'striped'), this.props.active || this.props.striped));

      return _react2.default.createElement(
        'div',
        {
          className: classes,
          role: 'progressbar',
          style: (0, _extends3.default)({ width: percentage + '%', backgroundColor: color }, style),
          'aria-valuenow': this.props.now,
          'aria-valuemin': this.props.min,
          'aria-valuemax': this.props.max
        },
        label
      );
    }
  }, {
    key: 'renderLabel',
    value: function renderLabel(percentage) {
      var _props2 = this.props;
      var interpolateClass = _props2.interpolateClass;
      var now = _props2.now;
      var min = _props2.min;
      var max = _props2.max;
      var bsStyle = _props2.bsStyle;
      var label = _props2.label;

      var InterpolateClass = interpolateClass || _Interpolate2.default;

      var REGEXP = InterpolateClass.REGEXP;

      if (REGEXP && REGEXP.exec(label)) {
        (0, _deprecationWarning2.default)('String interpolation in <ProgressBar label>', 'ES2015 template strings or other patterns');
      }

      return _react2.default.createElement(
        InterpolateClass,
        {
          now: now,
          min: min,
          max: max,
          percent: percentage,
          bsStyle: bsStyle
        },
        label
      );
    }
  }]);
  return ProgressBar;
}(_react2.default.Component);

ProgressBar.propTypes = {
  min: _react.PropTypes.number,
  now: _react.PropTypes.number,
  max: _react.PropTypes.number,
  label: _react.PropTypes.node,
  srOnly: _react.PropTypes.bool,
  striped: _react.PropTypes.bool,
  active: _react.PropTypes.bool,
  children: onlyProgressBar,
  className: _react2.default.PropTypes.string,
  interpolateClass: _react.PropTypes.node,
  /**
   * @private
   */
  isChild: _react.PropTypes.bool
};

ProgressBar.defaultProps = {
  min: 0,
  max: 100,
  active: false,
  isChild: false,
  srOnly: false,
  striped: false
};

exports.default = (0, _bootstrapUtils.bsStyles)(_styleMaps.State.values(), (0, _bootstrapUtils.bsClass)('progress-bar', ProgressBar));