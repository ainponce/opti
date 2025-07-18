import { Exercise, BlockType, WorkoutRoutine } from '@/domain/types/workout'

// Servicio de entrenamiento - Single Responsibility Principle
export class WorkoutService {
  constructor(private routine: WorkoutRoutine) {}

  // Open/Closed Principle - Extensible sin modificar
  formatExerciseReps(exercise: Exercise): string {
    if (exercise.reps_scheme) {
      return exercise.reps_scheme.join(" → ")
    }
    if (exercise.sets && exercise.reps) {
      return `${exercise.sets} × ${exercise.reps}`
    }
    if (exercise.sets && exercise.duration) {
      return `${exercise.sets} × ${exercise.duration}`
    }
    if (exercise.reps_options) {
      return exercise.reps_options.join(" / ")
    }
    return exercise.reps?.toString() || exercise.duration || exercise.prescription || ""
  }

  getRirValue(blockType: BlockType): string | number | null {
    // Mapear F a F1 para compatibilidad con los datos
    const rirKey = blockType === 'F' ? 'F1' : blockType
    const rir = this.routine.intensity_guidelines.rir[rirKey as keyof typeof this.routine.intensity_guidelines.rir]
    return rir || null
  }

  getCurrentDay(selectedDay: number) {
    const days = this.routine.weeks[0].days
    if (selectedDay >= 0 && selectedDay < days.length) {
      return days[selectedDay]
    }
    // Si el índice está fuera de rango, retornar el primer día como fallback
    return days[0] || null
  }

  getGlobalWarmup() {
    return this.routine.global_warmup
  }

  getIntensityGuidelines() {
    return this.routine.intensity_guidelines
  }

  getUnits() {
    return this.routine.units
  }

  getAllDays() {
    return this.routine.weeks[0].days
  }

  // Dependency Inversion Principle - Depende de abstracciones
  getExerciseById(exerciseId: string): { blockType: BlockType; exerciseIndex: number } | null {
    const [blockType, indexStr] = exerciseId.split('-')
    const exerciseIndex = parseInt(indexStr)
    
    if (!this.isValidBlockType(blockType) || isNaN(exerciseIndex)) {
      return null
    }

    return {
      blockType: blockType as BlockType,
      exerciseIndex
    }
  }

  private isValidBlockType(blockType: string): blockType is BlockType {
    return ['P', 'A', 'F'].includes(blockType)
  }
} 