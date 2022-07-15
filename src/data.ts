import { PointData } from "./gameState"

export enum PointType {
  Sand = 'Sand',
  Water = 'Water',
  Ice = 'Ice',
  Fire = 'Fire',
  BFire = 'BFire',
  IceFire = 'IceFire',
  Acid = 'Acid',
  Fuel = 'Fuel',
  Tree = 'Tree',
  Steam = 'Steam',
  Lava = 'Lava',
  Stone = 'Stone',
  StaticGlass = 'StaticGlass',
  MeltedGlass = 'MeltedGlass',
  Hot = 'Hot',
  Cold = 'Cold',
  Void = 'Void',
  Clone = 'Clone',
  Virus = 'Virus',
  Metal = 'Metal',
  NonExistentElement = 'NonExistentElement',
}

export const COLORS: Record<PointType, string> = {
  [PointType.Sand]: '#ffd800',
  [PointType.Water]: '#00adff',
  [PointType.Ice]: '#c9eeff',
  [PointType.Steam]: '#efefef',
  [PointType.Lava]: '#ff642e',
  [PointType.Fire]: '#ff992e',
  [PointType.BFire]: '#8ddaff',
  [PointType.IceFire]: '#8ddaff',
  [PointType.Stone]: '#a7a7a7',
  [PointType.StaticGlass]: '#f2f4ff',
  [PointType.MeltedGlass]: '#ffe6d3',
  [PointType.Fuel]: '#2eff5e',
  [PointType.Acid]: '#60ff2e',
  [PointType.Hot]: '#c53300',
  [PointType.Cold]: '#0078af',
  [PointType.Void]: '#000000',
  [PointType.Clone]: '#00a927',
  [PointType.Virus]: '#d900ff',
  [PointType.Metal]: '#e5e5e5',
  [PointType.Tree]: '#60b400',
  [PointType.NonExistentElement]: '#ffffff',
}

export const FREEZE_MAP: Partial<Record<PointType, PointType>> = {
  [PointType.Water]: PointType.Ice,
  [PointType.Steam]: PointType.Water,
  [PointType.Lava]: PointType.Stone,
  [PointType.MeltedGlass]: PointType.StaticGlass,
}

export const MELT_MAP: Partial<Record<PointType, PointType>> = {
  [PointType.Ice]: PointType.Water,
  [PointType.Water]: PointType.Steam,
  [PointType.Stone]: PointType.Lava,
  [PointType.Sand]: PointType.MeltedGlass,
  [PointType.StaticGlass]: PointType.MeltedGlass,
  [PointType.Fuel]: PointType.Fire,
  [PointType.Tree]: PointType.Fire,
}

export const POINT_INITIAL_DATA: Partial<Record<PointType, Partial<PointData>>> = {
  [PointType.Ice]: {
    temperature: -200,
  },
  [PointType.Water]: {
    temperature: 5,
    humidity: 100,
  },
  [PointType.Steam]: {
    temperature: 95,
  },
  [PointType.Lava]: {
    temperature: 300,
  },
  [PointType.Fire]: {
    temperature: 700,
  },
  [PointType.BFire]: {
    temperature: 4000,
  },
  [PointType.IceFire]: {
    temperature: -2000,
  },
  [PointType.Hot]: {
    temperature: 1200,
    fixedTemperature: true,
  },
  [PointType.Cold]: {
    temperature: -700,
    fixedTemperature: true,
  },
}

export const FLUIDS = [
  PointType.Water,
  PointType.MeltedGlass,
  PointType.Steam,
  PointType.Lava,
  PointType.Fuel,
  PointType.Fire,
  PointType.BFire,
  PointType.IceFire,
]

export const POWDERS = [PointType.Sand, PointType.Stone, PointType.Virus]

export const IGNORE_MAP: Partial<Record<PointType, PointType[]>> = {
  [PointType.Steam]: [...POWDERS, ...FLUIDS],
  [PointType.Sand]: FLUIDS,
  [PointType.Stone]: FLUIDS,
  [PointType.Lava]: FLUIDS,
  [PointType.Water]: [PointType.Fuel],
}

export const CONTROLLED_POINT_TYPES = [
  PointType.Sand,
  PointType.Water,
  PointType.Ice,
  PointType.Steam,
  PointType.Lava,
  PointType.Fire,
  PointType.BFire,
  PointType.IceFire,
  PointType.Fuel,
  PointType.Acid,
  PointType.Stone,
  PointType.Metal,
  PointType.Hot,
  PointType.Cold,
  PointType.Virus,
  PointType.Void,
  PointType.Clone,
]