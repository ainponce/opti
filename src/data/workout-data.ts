import { WorkoutRoutine } from '@/domain/types/workout'

// Datos de entrenamiento - Single Responsibility Principle
export const workoutData: WorkoutRoutine = {
  version: "0.1",
  program_name: "Planificación BJJ Equipo Simal Feb-Mar-Abr 2025",
  units: {
    time_sec_symbol: '"',
    rir_definition: "Repeticiones en Reserva (cuántas reps podrías haber hecho antes de fallar)",
  },
  global_warmup: {
    name: "Entrada en Calor Estándar",
    rounds: 2,
    notes: "Realizar sin pausa entre ejercicios.",
    elements: [
      { exercise: "Movilidad Articular", duration: "3min" },
      { exercise: "Plancha", prescription: "15sec" },
      { exercise: "Puentes", prescription: "15/lado" },
      { exercise: "Flexiones", reps: 5 },
      { exercise: "Sentadillas", reps: 5 },
      { exercise: "1er ejercicio de la rutina", prescription: "6-8 (ligero, activación)" },
    ],
  },
  intensity_guidelines: {
    pausas: "3min o según percepción subjetiva (SUBJ).",
    rir: {
      P: 2,
      A: 3,
      F1: "1-0",
    },
  },
  weeks: [
    {
      label: "Mes 1 Semana Tipo",
      days: [
        {
          day_name: "Lunes",
          day_code: "DIA1",
          warmup: "global_warmup",
          blocks: {
            P: [
              { name: "Remo con mancuernas", reps_scheme: [8, 6, 4] },
              { name: "Dominadas", sets: 4, reps: "al fallo -2/3" },
            ],
            A: [
              { name: "Curl invertido con barra", reps_scheme: [10, 8, 6] },
              { name: "Farmer Walks", sets: 4, duration: "25sec" },
            ],
            F: [{ name: "Estocadas", reps_scheme: [10, 8, 6] }],
          },
        },
        {
          day_name: "Martes",
          day_code: "DIA2",
          warmup: "global_warmup",
          blocks: {
            P: [
              { name: "Banco plano", reps_scheme: [8, 6, 4] },
              { name: "Push Press", sets: 4, reps: 5 },
            ],
            A: [
              { name: "Remo al mentón", reps_scheme: [10, 8, 6] },
              { name: "Dead Hangs", sets: 4, reps_options: [12, 15, 20], note: "Elegir dificultad" },
            ],
            F: [{ name: "Camilla isquios", sets: 4, reps: 15 }],
          },
        },
        {
          day_name: "Miércoles",
          day_code: "DIA3",
          warmup: "global_warmup",
          blocks: {
            P: [
              { name: "Sentadillas", reps_scheme: [8, 6, 4] },
              { name: "Banco inclinado", reps_scheme: [10, 8, 6] },
            ],
            A: [
              { name: "Fondos", sets: 4, reps: "al fallo -2/3" },
              { name: "Farmers a 1 brazo", sets: 4, duration: "20sec" },
            ],
            F: [{ name: "PM a 1 Brazo", reps_scheme: [10, 8, 6], note: "Mantener neutro" }],
          },
        },
        {
          day_name: "Jueves",
          day_code: "DIA4",
          warmup: "global_warmup",
          blocks: {
            P: [
              { name: "Press Militar", reps_scheme: [8, 6, 4] },
              { name: "Sentadilla Búlgara", reps_scheme: [10, 8, 6] },
            ],
            A: [
              { name: "Banco Plano 1 brazo", reps_scheme: [10, 8, 6] },
              { name: "Curl alternado", reps_scheme: [12, 10, 8, 6] },
            ],
            F: [{ name: "Extensiones en polea", reps_scheme: [12, 10, 8, 6] }],
          },
        },
        {
          day_name: "Viernes",
          day_code: "DIA5",
          warmup: "global_warmup",
          blocks: {
            P: [
              { name: "Peso Muerto", reps_scheme: [8, 6, 4] },
              { name: "Banco inclinado", reps_scheme: [10, 8, 6] },
            ],
            A: [
              { name: "Vuelos laterales", reps_scheme: [12, 10, 8] },
              { name: "Farmers en rack", sets: 4, duration: "20sec" },
            ],
            F: [{ name: "Remo en polea", reps_scheme: [12, 10, 8, 6] }],
          },
        },
        {
          day_name: "Sábado",
          day_code: "DIA6",
          warmup: "global_warmup",
          blocks: {
            P: [],
            A: [],
            F: [],
          },
        },
        {
          day_name: "Domingo",
          day_code: "DIA7",
          warmup: "global_warmup",
          blocks: {
            P: [],
            A: [],
            F: [],
          },
        },
      ],
    },
  ],
} 