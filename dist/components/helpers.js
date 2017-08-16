'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.range = range;

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function range(target) {
  return Array.from({ length: target }, function (_, idx) {
    return idx;
  });
}

function getScoreFromGames(games) {
  var firstTeamScore = games.filter(function (g) {
    return g.first_team_result === 'win';
  });
  var secondTeamScore = games.filter(function (g) {
    return g.second_team_result === 'win';
  });
  return [firstTeamScore.length, secondTeamScore.length];
}

function findMaxStage(seriesList) {
  return Math.max.apply(Math, _toConsumableArray(seriesList.map(function (series) {
    return series.stage;
  })));
}

function findSeries(stage, order, seriesList) {
  return seriesList.filter(function (series) {
    return series.stage === stage && series.order === order;
  })[0] || null;
}