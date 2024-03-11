let brightnessLevel = 100
let brightnessDirection = 1
const playButton = document.querySelector(".playButton");
const app = document.querySelector('#container')

const validInput = () => {
  let input = prompt("Enter a number between 4 and 100", '16')
  if (!Number(input) || Number(input) > 100 || Number(input) < 4) {
    if (confirm("Not a valid number. Please try again")) {
        return validInput();
    }
  }
  app.innerHTML = '';
  createGrid(Number(input));
}
playButton.addEventListener("click", validInput);

const container = document.getElementById('container')

const chooseRandomRGB = () => {
  return Math.floor(Math.random() * 255)
}


const createGrid = (num) => {
  app.innerHTML = '';

  const grid = document.createElement('div')
  grid.style.display = 'flex'
  grid.style.flexWrap = 'column'

  for (let row = 0; row < num; row++) {
    const rowDiv = document.createElement('div')
    rowDiv.style.display = 'flex'
    rowDiv.style.flexDirection = 'row'
  
    for (let col = 0; col < num; col++) {
      const cell = document.createElement('div')
      cell.style.width = "".concat(840 / num, "px")
      cell.style.height = "".concat(840 / num, "px")
      cell.style.border = '1px solid rgb(240, 240, 240)'
      cell.style.backgroundColor = 'white'

      cell.addEventListener('mouseover', (event) => {
        if (!cell.classList.contains('activated')) {
          event.target.style.backgroundColor = "rgb(".concat(chooseRandomRGB(), ', ').concat(chooseRandomRGB(), ', ').concat(chooseRandomRGB(), ')')
          event.target.style.filter = 'brightness('.concat(brightnessLevel, '%)')
          if (brightnessDirection === 1) {
            brightnessLevel -= 10
            if (brightnessLevel === 0) {
              brightnessDirection = 0
            }
          } else {
            brightnessLevel += 10
            if (brightnessLevel === 100) {
              brightnessDirection = 1
            }
          }
          cell.classList.add('activated')
        }
      })
      rowDiv.appendChild(cell)
    }
    grid.appendChild(rowDiv)
  }
  container.appendChild(grid)
}

createGrid(16);

