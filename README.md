# Game-Of-Life-Js-Version
Simple implementation Conway's Game of Life using javascript and canvas (https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial).
Based on description here: https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life 
 
 Features: 
- array of cells presented like multi-dimensional array of objects: http://www.javascripttutorial.net/javascript-multidimensional-array/
- each cell has coordinates (x,y) and state ( boolean active);
- using setInterval() for update UI: https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/setInterval
- you can change cell state by clicking on grid squares(make cell active/inactive);
- count of generations;