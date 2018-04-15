/**
 * Don't change these constants!
 */
const DODGER = document.getElementById('dodger')
const GAME = document.getElementById('game')
const GAME_HEIGHT = 400
const GAME_WIDTH = 400
const LEFT_ARROW = 37 // use e.which!
const RIGHT_ARROW = 39 // use e.which!
const ROCKS = []
const START = document.getElementById('start')

var gameInterval = null



function checkCollision(rock) {
 
  const top = positionToInteger(rock.style.top)

  
  if (top > 360) {
    const dodgerLeftEdge = positionToInteger(DODGER.style.left)

    // FIXME: The DODGER is 40 pixels wide -- how do we get the right edge?
    const dodgerRightEdge = dodgerLeftEdge + 40;

    const rockLeftEdge = positionToInteger(rock.style.left)

    
    const rockRightEdge = rockLeftEdge + 40;

    if (rockLeftEdge<= dodgerLeftEdge && rockRightEdge>=dodgerLeftEdge || rockLeftEdge>=dodgerLeftEdge && rockRightEdge<=dodgerRightEdge || rockLeftEdge<=dodgerRightEdge && rockRightEdge>= dodgerRightEdge){ 
        
  
      return true}
    }
  
}

function createRock(x) {
  const rock = document.createElement('div')
game.appendChild(rock)
  rock.className = 'rock'
  rock.style.left = `${x}px`

 var top = 0

  rock.style.top = top

   function step() { 
    rock.style.top = `${top += 2}px`
 
    if (top < 360) {
      window.requestAnimationFrame(step)
    }
  }
 
  window.requestAnimationFrame(step)

  
  



  
  function moveRock() {
   
   if (checkCollision(rock)){
     endGame()
   }
   
   
   
   
  }

 
  ROCKS.push(rock)

  // Finally, return the rock element you've created
  return rock
}

/**
 * End the game by clearing `gameInterval`,
 * removing all ROCKS from the DOM,
 * and removing the `moveDodger` event listener.
 * Finally, alert "YOU LOSE!" to the player.
 */
function endGame() {
clearInterval(gameInterval)
 document.removeEventListener('keydown',moveDodger,true)
 
}

function moveDodger(e) {
  document.addEventListener('keydown',function(e){
    if (e.which ===LEFT_ARROW){
      moveDodgerLeft()
    }
    else if (e.which === RIGHT_ARROW){
      moveDodgerRight()
    }
    else{
      e.preventDefault()
      
    }
  })
  /**
   * This function should call `moveDodgerLeft()`
   * if the left arrow is pressed and `moveDodgerRight()`
   * if the right arrow is pressed. (Check the constants
   * we've declared for you above.)
   * And be sure to use the functions declared below!
   */
}


function moveDodgerLeft() {
  var leftNumbers = DODGER.style.left.replace('px', '')
  var left = parseInt(leftNumbers, 10)
 
  if (left > 0) {
    DODGER.style.left = `${left - 1}px`
  window.requestAnimationFrame(moveDodgerLeft)
    }

  
}

function moveDodgerRight() {
  var leftNumbers = DODGER.style.left.replace('px', '')
  var left = parseInt(leftNumbers, 10)
 
  if (left < 360) {
    DODGER.style.left = `${left + 1}px`
  window.requestAnimationFrame(moveDodgerRight)
    
  }
}
  // implement me!
  /**
   * This function should move DODGER to the right
   * (mabye 4 pixels?). Use window.requestAnimationFrame()!
   */


/**
 * @param {string} p The position property
 * @returns {number} The position as an integer (without 'px')
 */
function positionToInteger(p) {
  return parseInt(p.split('px')[0]) || 0
}

function start() {
  window.addEventListener('keydown', moveDodger)

  START.style.display = 'none'

  gameInterval = setInterval(function() {
    createRock(Math.floor(Math.random() *  (GAME_WIDTH - 20)))
  }, 1000)
}
