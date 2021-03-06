import { Processor, RequestedAction } from '../types'
import { waterProcessor } from './water'

export const lavaProcessor: Processor = (state, point, tick) => {
  if (point.temperature < 1100) {
    return RequestedAction.Freeze
  }
  return waterProcessor(state, {
    ...point,
    temperature: 10,
  }, tick)
}
