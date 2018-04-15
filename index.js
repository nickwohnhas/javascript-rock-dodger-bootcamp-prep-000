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
  GAME.appendChild(rock)
  rock.className = 'rock'
  rock.style.left = `${x}px`
  var top = 0
  rock.style.top = top

  function moveRock() {
    if (checkCollision(rock)){
      endGame()
    } else {
      rock.style.top = `${top += 2}px`
      if (top < 360) {
        window.requestAnimationFrame(moveRock)
      }
      else {
        rock.remove() 
      }
    }
  }
  window.requestAnimationFrame(moveRock)
  ROCKS.push(rock)
  return rock
}

function endGame() {
  clearInterval(gameInterval)
  for (var i =0;i<ROCKS.length;i++){
    ROCKS.shift()
  }
 window.removeEventListener('keydown',moveDodger)
}

function moveDodger(e) {
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
