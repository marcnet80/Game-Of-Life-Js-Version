const POINT = 1;
const ROWS = 24;
const COLUMNS = 24;
const CANVAS_RECT_WIDTH = 25;
const CANVAS_RECT_HEIGHT = 25;
const COUNT_NEIGHBOURS_FOR_ACTIVE_CELL = 3;
const CANVAS_FILLSTYLE_ACTIVE_CELLS = "#194A8D";
const CANVAS_FILLSTYLE_INACTIVE_CELLS = "white";
const CANVAS_STROKESTYLE = "#495F75";

var timer;
var generationCount = 0;
var cells = [];
var newGenerationCells = [];

var element = document.getElementById("canvas");
var context = element.getContext("2d");
element.addEventListener("click", handleClick);

init();

function init()
{
	for(var row = 0; row < ROWS; row++){
		cells[row] = [];
    	for(var column = 0; column < COLUMNS; column++){
			var x = CANVAS_RECT_WIDTH * row;
            var y = CANVAS_RECT_HEIGHT * column;
			
			cells[row][column] = { x: x, y: y, active: false };
		}
    }
	displayGrid();
    generationCount = 0;
	document.getElementById("#generation").innerHTML = generationCount;
}  

function handleClick(event)
{
   var x = Math.floor(event.offsetX/CANVAS_RECT_WIDTH)*CANVAS_RECT_WIDTH;
   var y = Math.floor(event.offsetY/CANVAS_RECT_HEIGHT)*CANVAS_RECT_HEIGHT; 
   cells[x/CANVAS_RECT_WIDTH][y/CANVAS_RECT_HEIGHT].active = cells[x/CANVAS_RECT_WIDTH][y/CANVAS_RECT_HEIGHT].active ? false: true;
   displayGrid();
}

 function hasCellActiveNeighbour(x, y) 
 {
	if(!cells[x] || !cells[x][y])
		  return false;
	  
    return cells[x][y].active;
}
 
 function countCellsNeighbours(x, y)
 {
	    var neighbours = 0;
		if (hasCellActiveNeighbour(x - POINT, y))
		{ 
		    neighbours++;
		}
        if (hasCellActiveNeighbour(x + POINT, y)) 
		{	
		    neighbours++;
		}
	    if (hasCellActiveNeighbour(x - POINT, y - POINT)) 
		{
			neighbours++;
	    }
		if (hasCellActiveNeighbour(x + POINT, y - POINT))
	    {
		    neighbours++;
		}
        if (hasCellActiveNeighbour(x, y - POINT))
		{
			neighbours++;
		}
        if (hasCellActiveNeighbour(x - POINT, y + POINT))
		{
		    neighbours++;
		}
        if (hasCellActiveNeighbour(x + POINT, y + POINT))
		{
			neighbours++;
		}
		if (hasCellActiveNeighbour(x, y + POINT))
		{
		    neighbours++;
		}
		
	return neighbours;
}
	
function draw(cell)
{
   context.beginPath();
   context.rect(cell.x, cell.y, CANVAS_RECT_WIDTH, CANVAS_RECT_HEIGHT);
   
  if(cell.active)
  {
   context.fillStyle = CANVAS_FILLSTYLE_ACTIVE_CELLS;
   context.fill();
  }
  else 
  {
   context.fillStyle = CANVAS_FILLSTYLE_INACTIVE_CELLS;
   context.strokeStyle = CANVAS_STROKESTYLE;
   context.fill();
   context.stroke();
  }
  
  context.closePath();
}

function displayGrid()
{
   cells.forEach(function(element, row, array){
       element.forEach(function(element2d, column, array2d){
            draw(element2d);		  
      });
  });
}
	
function updateCells()
{
	generationCount++;
	newGenerationCells = [];
	//clear existing rectangle
	context.clearRect(0, 0, element.width, element.height);
	displayGrid();
	
	if(!isCellsActive()){
	   stopGame();
	   return;
	}
   
    cells.forEach(function(element, row, array){
	  newGenerationCells[row] = [];
	  
	  element.forEach(function(element2d, column, array2d){
 		  
	  var isActive = false;	  
	  var neighbours = countCellsNeighbours(row, column);

	  if (element2d.active)
        isActive = neighbours == (COUNT_NEIGHBOURS_FOR_ACTIVE_CELL - POINT) || neighbours == COUNT_NEIGHBOURS_FOR_ACTIVE_CELL ? true : false;
      else
		isActive = neighbours == COUNT_NEIGHBOURS_FOR_ACTIVE_CELL ? true : false;
      
	  var x = cells[row][column].x;
	  var y = cells[row][column].y;
	  newGenerationCells[row][column] = {x: x, y: y, active: isActive };	  
	});
	document.getElementById("#generation").innerHTML = generationCount;
  });
  
  //copy new results
  cells = newGenerationCells;
}

var isCellsActive = function()
{
  var isActiveCellsExist = cells.some(
                              x=> x.some(cell =>
                                 cell.active == true)); 
  return isActiveCellsExist;
};

function startGame()
{
     timer = setInterval(function(){ 
        updateCells();
	}, 20);
}

function stopGame()
{
	if(timer)
	  clearInterval(timer);
}

function clearGrid()
{
	stopGame();
	init();
}
