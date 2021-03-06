# Simple component to render tournament grid

This small package presents simple components to implement tournament grid UI
with transparent data model.

[NPM Page](https://www.npmjs.com/package/react-tournament-grid)

## Installation

```
yarn add react-tournament-bracket
```

## Data model

### Series

Series is object that has following structure:

```
{
  stage: 2,
  order: 6,
  firstTeamId: 2,
  secondTeamId: 15,
  games: [{...}, ..., {...}]
}
```

### Game

Game is used to count series score.

```
{
  firstTeamResult: 'win',
  secondTeamResult: 'loose'
}
```

Score is counting according to number of won games for each team.
For example, in following example score will be 2:1:

```
{
  stage: 0,
  order: 0,
  games: [
    {
      firstTeamResult: 'win',
      secondTeamResult: 'loose'
    },
    {
      firstTeamResult: 'loose',
      secondTeamResult: 'win'
    },
    {
      firstTeamResult: 'draw',
      secondTeamResult: 'draw'
    },
    {
      firstTeamResult: 'win',
      secondTeamResult: 'loose'
    }
  ]
}
```

## Notes

* Currently support only single-elimination grid type
* Root series (i.e. Grand-Final) is represented with (stage: 0, order: 0) series
* Tree depth is calculated based on max stage in input series array. For example you have max stage equal 2, hence tree will be of depth 3 and it will has (2^3 - 1) = 7 series.
* Missed series will have `'TBD'` titles.

## ToDo

- [ ] Documentation
- [ ] Examples

## Contributions

Any contributions are highly appreciated.
