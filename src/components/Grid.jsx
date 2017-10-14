import React, { Component } from "react";

import Series from "./Series";
import { range, getScoreFromGames, findMaxStage, findSeries } from "./helpers";

function drawConnection(
  stageId,
  seriesId,
  positioning,
  xSpace,
  connectionColor,
  direction = 1
) {
  const targetStageId = stageId - 1;
  const targetSeriesId = Math.floor(seriesId / 2);
  const x1 = positioning[stageId][seriesId]["x"] + (direction > 0 ? 0 : 200);
  const y1 = positioning[stageId][seriesId]["y"] + 25;
  const x2 = positioning[targetStageId][targetSeriesId]["x"] + direction * 200;
  const y2 = positioning[targetStageId][targetSeriesId]["y"] + 25;

  return (
    <path
      d={`M${x1} ${y1} L${x1 - direction * xSpace / 2} ${y1} L${x2 +
        (direction > 0 ? 0 : 200) +
        direction * xSpace / 2} ${y2} L${(direction > 0 ? 0 : 200) + x2} ${y2}`}
      stroke={connectionColor}
      fill="none"
    />
  );
}

class Grid extends Component {
  render() {
    const {
      seriesList = [],
      teams,
      seriesWidth = 200,
      seriesHeight = 50,
      xSpace = 30,
      ySpace = 50,
      direction = -1,
      onSeriesClick,
      connectionColor = "white",
      seriesStyle = null
    } = this.props;
    const maxStage = findMaxStage(seriesList);
    const maxSeriesOffset = ySpace * Math.pow(2, maxStage);
    const stageList = range(maxStage + 1);
    const width = (seriesWidth + xSpace) * (maxStage + 1) - xSpace;
    const positioning = {};
    const seriesNumber = Math.pow(2, maxStage + 1) - 1;
    const height =
      2 *
        stageList.reduce(
          (sum, idx) => sum + maxSeriesOffset / Math.pow(2, idx)
        ) +
      seriesHeight;

    return (
      <div style={{ overflow: "auto" }}>
        <svg width={width} height={height}>
          {stageList.map(stageIdx => {
            positioning[stageIdx] = {};
            return range(Math.pow(2, stageIdx)).map(seriesIdx => {
              let x, y;
              if (stageIdx === 0) {
                x = direction > 0 ? 0 : width - seriesWidth;
                y = height / 2 - seriesHeight / 2;
              } else if (seriesIdx % 2 === 0) {
                x =
                  positioning[stageIdx - 1][Math.floor(seriesIdx / 2)]["x"] +
                  direction * (seriesWidth + xSpace);
                y =
                  positioning[stageIdx - 1][Math.floor(seriesIdx / 2)]["y"] -
                  maxSeriesOffset / Math.pow(2, stageIdx);
              } else {
                x =
                  positioning[stageIdx - 1][Math.floor(seriesIdx / 2)]["x"] +
                  direction * (seriesWidth + xSpace);
                y =
                  positioning[stageIdx - 1][Math.floor(seriesIdx / 2)]["y"] +
                  maxSeriesOffset / Math.pow(2, stageIdx);
              }
              positioning[stageIdx][seriesIdx] = {
                x: x,
                y: y
              };

              const currentSeries = findSeries(stageIdx, seriesIdx, seriesList);
              const firstTeamId = currentSeries
                ? currentSeries.first_team
                : null;
              const secondTeamId = currentSeries
                ? currentSeries.second_team
                : null;
              const firstTeam = this.props.teams.filter(
                t => t.id === firstTeamId
              )[0];
              const secondTeam = this.props.teams.filter(
                t => t.id === secondTeamId
              )[0];
              const score = getScoreFromGames(
                currentSeries ? currentSeries.games : []
              );
              return (
                <g>
                  <g>
                    {
                      <Series
                        series={currentSeries}
                        firstText={firstTeam ? firstTeam.name : "TBD"}
                        secondText={secondTeam ? secondTeam.name : "TBD"}
                        firstScore={score[0]}
                        secondScore={score[1]}
                        onClick={() => {
                          onSeriesClick(currentSeries);
                        }}
                        x={x}
                        y={y}
                        seriesStyle={seriesStyle}
                      />
                    }
                  </g>
                  <g>
                    {stageIdx !== 0 &&
                      drawConnection(
                        stageIdx,
                        seriesIdx,
                        positioning,
                        xSpace,
                        connectionColor,
                        direction
                      )}
                  </g>
                </g>
              );
            });
          })}
        </svg>
      </div>
    );
  }
}

export default Grid;
