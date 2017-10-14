import React from "react";

const defaultTextStyle = {
  fill: "rgb(255, 255, 255)",
  "font-size": "12px",
  "font-family": "Lucida Grande, Open Sans"
};

export default ({
  firstText,
  secondText,
  firstScore,
  secondScore,
  onClick,
  seriesStyle,
  x = 0,
  y = 0,
  width = 200,
  height = 50,
  scoreWidth = 30,
  lineHeight = 1
}) => {
  const {
    textStyle = {},
    separationLineColor = "rgb(255, 255, 255)",
    backgroundColor = "#58595e",
    upperBlockColor = "#2f2f2f",
    lowerBlockColor = "#252525"
  } =
    seriesStyle || {};
  const finalTextStyle = Object.assign({}, defaultTextStyle, textStyle);
  return (
    <svg
      width={width}
      height={height + lineHeight}
      viewBox={`0 0 ${width} ${height + lineHeight}`}
      x={x}
      y={y}
      onClick={onClick}
      style={{ cursor: "pointer" }}
    >
      <rect x="0" y="0" width={width} height={height} fill={backgroundColor} />
      <rect
        x="0"
        y="0"
        width={width}
        height={height / 2}
        fill={upperBlockColor}
      />
      <rect
        x="0"
        y={height / 2}
        width={width}
        height={height / 2}
        fill={lowerBlockColor}
      />
      <rect
        x={width - scoreWidth}
        y="0"
        width={scoreWidth}
        height={height / 2}
        fill={upperBlockColor}
      />
      <rect
        x={width - scoreWidth}
        y={height / 2}
        width={scoreWidth}
        height={height / 2}
        fill={lowerBlockColor}
      />
      <text x="5" y="16" style={finalTextStyle}>
        {firstText}
      </text>
      <text x="5" y="41" style={finalTextStyle}>
        {secondText}
      </text>
      <line
        x1="0"
        y1={height / 2}
        x2={width}
        y2={height / 2}
        style={{ stroke: separationLineColor, "stroke-width": 1 }}
      />
      <text x="182" y="16" style={finalTextStyle}>
        {firstScore}
      </text>
      <text x="182" y="41" style={finalTextStyle}>
        {secondScore}
      </text>
    </svg>
  );
};
