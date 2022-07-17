import { DEFAULT_BASE_TEMP, getOrCreateGameState } from './gameState'
import { setBorders } from './utils/setBorders'
import { startEngine } from './process'
import { SCALE } from './constants'
import { drawInitial } from './draw'
import { initControls } from './controls/initControls'
import { getColor } from './utils/getColor'
import { CONTROLLED_POINT_TYPES, PointType } from './data'

const init = async () => {
  try {
    await navigator.serviceWorker.register(
      new URL('./sw.js', import.meta.url),
      { type: 'module' },
    )
  } catch (err) {
    console.log('Service worker registration failed: ', err)
  }

  const root = document.getElementById('root')
  const controls = document.querySelector('.controls')
  const types = document.querySelector('.types')
  if (!root) {
    throw new Error('Root element not found')
  }
  if (!controls) {
    throw new Error('Controls element not found')
  }
  if (!types) {
    throw new Error('Types element not found')
  }
  const canvas = document.createElement('canvas')
  const setCanvasSize = () => {
    const proportions = {
      width: window.innerWidth - 10,
      height: window.innerHeight - 10,
    }
    canvas.width = proportions.width
    canvas.height = proportions.height
    setBorders(proportions.width / SCALE, proportions.height / SCALE)
    drawInitial(canvas)
  }
  setCanvasSize()
  window.addEventListener('resize', setCanvasSize)
  root.appendChild(canvas)

  const state = getOrCreateGameState()

  const controlTypes = [...CONTROLLED_POINT_TYPES, 'Eraser'] as Array<
    PointType | 'Eraser'
  >
  controlTypes.forEach((type) => {
    const button = document.createElement('button')
    button.classList.add('type')
    if (state.currentType === type) {
      button.classList.add('type--selected')
    }
    button.classList.add(`type--${type}`)
    button.style.backgroundColor = type === 'Eraser' ? 'white' : getColor(type)
    button.innerText = type
    button.addEventListener('click', () => {
      const state = getOrCreateGameState()
      document.querySelectorAll('.type').forEach((control) => {
        control.classList.remove('type--selected')
      })
      button.classList.add('type--selected')
      state.currentType = type
    })
    types.appendChild(button)
  })

  const brushInput = document.createElement('input')
  brushInput.type = 'range'
  brushInput.min = '1'
  brushInput.max = '10'
  brushInput.value = '2'
  brushInput.addEventListener('change', () => {
    const state = getOrCreateGameState()
    state.brushSize = brushInput.valueAsNumber
  })
  controls.appendChild(brushInput)

  const speedInput = document.createElement('input')
  speedInput.type = 'range'
  speedInput.min = '1'
  speedInput.max = '5'
  speedInput.value = '1'
  speedInput.addEventListener('change', () => {
    const state = getOrCreateGameState()
    state.speed = speedInput.valueAsNumber
  })
  controls.appendChild(speedInput)

  const baseTempInput = document.createElement('input')
  baseTempInput.type = 'range'
  baseTempInput.min = '-10'
  baseTempInput.max = '10'
  baseTempInput.value = DEFAULT_BASE_TEMP.toString()
  baseTempInput.addEventListener('change', () => {
    const state = getOrCreateGameState()
    state.baseTemperature = baseTempInput.valueAsNumber
  })
  controls.appendChild(baseTempInput)

  const showTempInput = document.createElement('input')
  showTempInput.type = 'checkbox'
  showTempInput.addEventListener('change', () => {
    const state = getOrCreateGameState()
    state.showTemperature = showTempInput.checked
    drawInitial(canvas)
  })
  controls.appendChild(showTempInput)

  const pauseInput = document.createElement('input')
  pauseInput.type = 'checkbox'
  pauseInput.checked = true
  pauseInput.addEventListener('change', () => {
    const state = getOrCreateGameState()
    state.playing = pauseInput.checked
    drawInitial(canvas)
  })
  controls.appendChild(pauseInput)

  initControls(canvas)

  // @ts-ignore
  window.gameState = state

  drawInitial(canvas)
  startEngine()
}

window.addEventListener('load', init)
