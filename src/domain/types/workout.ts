// Tipos de dominio para entrenamiento - Single Responsibility Principle
export interface Exercise {
  name: string
  reps_scheme?: number[]
  sets?: number
  reps?: string | number
  duration?: string
  prescription?: string
  reps_options?: number[]
  note?: string
}

export interface ExerciseBlock {
  P?: Exercise[]
  A?: Exercise[]
  F?: Exercise[]
}

export interface WarmupElement {
  exercise: string
  duration?: string
  prescription?: string
  reps?: number
}

export interface GlobalWarmup {
  name: string
  rounds: number
  notes: string
  elements: WarmupElement[]
}

export interface IntensityGuidelines {
  pausas: string
  rir: {
    P: number
    A: number
    F1: string
  }
}

export interface WorkoutDay {
  day_name: string
  day_code: string
  warmup: string
  blocks: ExerciseBlock
}

export interface WorkoutWeek {
  label: string
  days: WorkoutDay[]
}

export interface WorkoutUnits {
  time_sec_symbol: string
  rir_definition: string
}

export interface WorkoutRoutine {
  version: string
  program_name: string
  units: WorkoutUnits
  global_warmup: GlobalWarmup
  intensity_guidelines: IntensityGuidelines
  weeks: WorkoutWeek[]
}

export type BlockType = 'P' | 'A' | 'F' 