'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Series = require('./Series');

var _Series2 = _interopRequireDefault(_Series);

var _helpers = require('./helpers');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function drawConnection(stageId, seriesId, positioning, xSpace) {
  var direction = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 1;

  var targetStageId = stageId - 1;
  var targetSeriesId = Math.floor(seriesId / 2);
  var x1 = positioning[stageId][seriesId]['x'] + (direction > 0 ? 0 : 200);
  var y1 = positioning[stageId][seriesId]['y'] + 25;
  var x2 = positioning[targetStageId][targetSeriesId]['x'] + direction * 200;
  var y2 = positioning[targetStageId][targetSeriesId]['y'] + 25;

  return _react2.default.createElement('path', {
    d: 'M' + x1 + ' ' + y1 + ' L' + (x1 - direction * xSpace / 2) + ' ' + y1 + ' L' + (x2 + (direction > 0 ? 0 : 200) + direction * xSpace / 2) + ' ' + y2 + ' L' + ((direction > 0 ? 0 : 200) + x2) + ' ' + y2,
    stroke: 'white',
    fill: 'none'
  });
}

var Grid = function (_Component) {
  _inherits(Grid, _Component);

  function Grid() {
    _classCallCheck(this, Grid);

    return _possibleConstructorReturn(this, (Grid.__proto__ || Object.getPrototypeOf(Grid)).apply(this, arguments));
  }

  _createClass(Grid, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          _props$seriesList = _props.seriesList,
          seriesList = _props$seriesList === undefined ? [] : _props$seriesList,
          teams = _props.teams,
          _props$seriesWidth = _props.seriesWidth,
          seriesWidth = _props$seriesWidth === undefined ? 200 : _props$seriesWidth,
          _props$seriesHeight = _props.seriesHeight,
          seriesHeight = _props$seriesHeight === undefined ? 50 : _props$seriesHeight,
          _props$xSpace = _props.xSpace,
          xSpace = _props$xSpace === undefined ? 30 : _props$xSpace,
          direction = _props.direction;

      var maxStage = (0, _helpers.findMaxStage)(seriesList);
      var maxSeriesOffset = maxStage * seriesWidth;
      var stageList = (0, _helpers.range)(maxStage + 1);
      var width = (seriesWidth + xSpace) * (maxStage + 1) - xSpace;
      var positioning = {};
      var seriesNumber = Math.pow(2, maxStage + 1) - 1;
      var height = 2 * stageList.reduce(function (sum, idx) {
        return sum + maxSeriesOffset / Math.pow(2, idx);
      }) + seriesHeight;

      return _react2.default.createElement(
        'svg',
        { width: width, height: height, viewBox: '0 0 100% ' + height },
        stageList.map(function (stageIdx) {
          positioning[stageIdx] = {};
          return (0, _helpers.range)(Math.pow(2, stageIdx)).map(function (seriesIdx) {
            var x = void 0,
                y = void 0;
            if (stageIdx === 0) {
              x = direction > 0 ? 0 : width - seriesWidth;
              y = height / 2 - seriesHeight / 2;
            } else if (seriesIdx % 2 === 0) {
              x = positioning[stageIdx - 1][Math.floor(seriesIdx / 2)]['x'] + direction * (seriesWidth + xSpace);
              y = positioning[stageIdx - 1][Math.floor(seriesIdx / 2)]['y'] - maxSeriesOffset / Math.pow(2, stageIdx);
            } else {
              x = positioning[stageIdx - 1][Math.floor(seriesIdx / 2)]['x'] + direction * (seriesWidth + xSpace);
              y = positioning[stageIdx - 1][Math.floor(seriesIdx / 2)]['y'] + maxSeriesOffset / Math.pow(2, stageIdx);
            }
            positioning[stageIdx][seriesIdx] = {
              x: x,
              y: y
            };

            var currentSeries = (0, _helpers.findSeries)(stageIdx, seriesIdx, seriesList);
            var firstTeamId = currentSeries ? currentSeries.first_team : null;
            var secondTeamId = currentSeries ? currentSeries.second_team : null;
            var firstTeam = _this2.props.teams.filter(function (t) {
              return t.id === firstTeamId;
            })[0];
            var secondTeam = _this2.props.teams.filter(function (t) {
              return t.id === secondTeamId;
            })[0];
            var score = (0, _helpers.getScoreFromGames)(currentSeries ? currentSeries.games : []);
            return _react2.default.createElement(
              'g',
              null,
              _react2.default.createElement(
                'g',
                null,
                _react2.default.createElement(_Series2.default, {
                  series: currentSeries,
                  firstText: firstTeam ? firstTeam.name : 'TBD',
                  secondText: secondTeam ? secondTeam.name : 'TBD',
                  firstScore: score[0],
                  secondScore: score[1],
                  onClick: function onClick() {
                    _this2.handleSeriesClick(currentSeries);
                  },
                  x: x,
                  y: y
                })
              ),
              _react2.default.createElement(
                'g',
                null,
                stageIdx !== 0 && drawConnection(stageIdx, seriesIdx, positioning, xSpace, direction)
              )
            );
          });
        })
      );
    }
  }]);

  return Grid;
}(_react.Component);

exports.default = Grid;