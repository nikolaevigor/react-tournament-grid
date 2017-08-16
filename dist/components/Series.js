"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (_ref) {
  var firstText = _ref.firstText,
      secondText = _ref.secondText,
      firstScore = _ref.firstScore,
      secondScore = _ref.secondScore,
      onClick = _ref.onClick,
      _ref$x = _ref.x,
      x = _ref$x === undefined ? 0 : _ref$x,
      _ref$y = _ref.y,
      y = _ref$y === undefined ? 0 : _ref$y,
      _ref$width = _ref.width,
      width = _ref$width === undefined ? 200 : _ref$width,
      _ref$height = _ref.height,
      height = _ref$height === undefined ? 50 : _ref$height,
      _ref$scoreWidth = _ref.scoreWidth,
      scoreWidth = _ref$scoreWidth === undefined ? 30 : _ref$scoreWidth,
      _ref$lineHeight = _ref.lineHeight,
      lineHeight = _ref$lineHeight === undefined ? 1 : _ref$lineHeight;
  return React.createElement(
    "svg",
    {
      width: width,
      height: height + lineHeight,
      viewBox: "0 0 " + width + " " + (height + lineHeight),
      x: x,
      y: y,
      onClick: onClick,
      style: { cursor: 'pointer' }
    },
    React.createElement("rect", { x: "0", y: "0", width: width, height: height, fill: "#58595e" }),
    React.createElement("rect", { x: "0", y: "0", width: width, height: height / 2, fill: "#58595e" }),
    React.createElement("rect", {
      x: "0",
      y: height / 2,
      width: width,
      height: height / 2,
      fill: "#58595e"
    }),
    React.createElement("rect", {
      x: width - scoreWidth,
      y: "0",
      width: scoreWidth,
      height: height,
      fill: "#787a80"
    }),
    React.createElement(
      "text",
      {
        x: "5",
        y: "16",
        style: {
          fill: 'rgb(255, 255, 255)',
          'font-size': '12px'
        }
      },
      firstText
    ),
    React.createElement(
      "text",
      {
        x: "5",
        y: "41",
        style: {
          fill: 'rgb(255, 255, 255)',
          'font-size': '12px'
        }
      },
      secondText
    ),
    React.createElement("line", {
      x1: "0",
      y1: height / 2,
      x2: width,
      y2: height / 2,
      style: { stroke: 'rgb(68, 69, 73)', 'stroke-width': 1 }
    }),
    React.createElement(
      "text",
      {
        x: "182",
        y: "16",
        style: {
          fill: 'rgb(255, 255, 255)',
          'font-size': '12px'
        }
      },
      firstScore
    ),
    React.createElement(
      "text",
      {
        x: "182",
        y: "41",
        style: {
          fill: 'rgb(255, 255, 255)',
          'font-size': '12px'
        }
      },
      secondScore
    )
  );
};