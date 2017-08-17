import React from 'react';

export default ({
  firstText,
  secondText,
  firstScore,
  secondScore,
  onClick,
  x = 0,
  y = 0,
  width = 200,
  height = 50,
  scoreWidth = 30,
  lineHeight = 1
}) =>
  <svg
    width={width}
    height={height + lineHeight}
    viewBox={`0 0 ${width} ${height + lineHeight}`}
    x={x}
    y={y}
    onClick={onClick}
    style={{ cursor: 'pointer' }}
  >
    <rect x="0" y="0" width={width} height={height} fill="#58595e" />
    <rect x="0" y="0" width={width} height={height / 2} fill="#2f2f2f" />
    <rect
      x="0"
      y={height / 2}
      width={width}
      height={height / 2}
      fill="#252525"
    />
    <rect
      x={width - scoreWidth}
      y="0"
      width={scoreWidth}
      height={height / 2}
      fill="#2f2f2f"
    />
    <rect
      x={width - scoreWidth}
      y={height / 2}
      width={scoreWidth}
      height={height / 2}
      fill="#252525"
    />
    <text
      x="5"
      y="16"
      style={{
        fill: 'rgb(255, 255, 255)',
        'font-size': '12px'
      }}
    >
      {firstText}
    </text>
    <text
      x="5"
      y="41"
      style={{
        fill: 'rgb(255, 255, 255)',
        'font-size': '12px'
      }}
    >
      {secondText}
    </text>
    <line
      x1="0"
      y1={height / 2}
      x2={width}
      y2={height / 2}
      style={{ stroke: 'rgb(255, 255, 255)', 'stroke-width': 1 }}
    />
    <text
      x="182"
      y="16"
      style={{
        fill: 'rgb(255, 255, 255)',
        'font-size': '12px'
      }}
    >
      {firstScore}
    </text>
    <text
      x="182"
      y="41"
      style={{
        fill: 'rgb(255, 255, 255)',
        'font-size': '12px'
      }}
    >
      {secondScore}
    </text>
  </svg>;
