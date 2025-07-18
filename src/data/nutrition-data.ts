import { NutritionPlan } from '@/domain/types/nutrition'

// Datos de nutrición - Single Responsibility Principle
export const nutritionData: NutritionPlan = {
  metadata: {
    pais: "Argentina",
    criterios: ["barato", "rapido", "rico"],
    version: "1.0.0",
    notas_generales: "Ajustá cantidades según hambre real y objetivos indicados por tu nutricionista. Cociná en batch el finde cuando se marque 'freezar'. Usa vegetales de estación y marcas económicas."
  },
  opciones_generales: {
    desayuno: [
      {
        id: "desayuno_inf_pancake",
        descripcion: "Infusión (té, mate, mate cocido, café con leche) + pancake de avena con huevo + edulcorante/esencia + 1 banana.",
        saciedad: "+++",
        comentarios: "Licuá 1 huevo, 4 cdas avena, chorro leche/agua; plancha antiadherente.",
        calorias: 320,
        ingredientes: [
          { nombre: "Huevo", cantidad: "1 unidad", calorias: 70, proteinas: 6, grasas: 5 },
          { nombre: "Avena", cantidad: "40g", calorias: 150, carbohidratos: 27, proteinas: 5 },
          { nombre: "Banana", cantidad: "1 unidad (120g)", calorias: 105, carbohidratos: 27 },
          { nombre: "Leche descremada", cantidad: "50ml", calorias: 25, proteinas: 2, carbohidratos: 3 }
        ]
      },
      {
        id: "desayuno_tostada_queso",
        descripcion: "Tostada integral o de salvado + queso port salut descremado + mermelada light.",
        saciedad: "++",
        comentarios: "Si querés más proteína agregá 1 huevo revuelto.",
        calorias: 280,
        ingredientes: [
          { nombre: "Pan integral", cantidad: "1 rebanada (30g)", calorias: 80, carbohidratos: 15, proteinas: 3 },
          { nombre: "Queso port salut descremado", cantidad: "30g", calorias: 90, proteinas: 8, grasas: 5 },
          { nombre: "Mermelada light", cantidad: "1 cda (15g)", calorias: 30, carbohidratos: 7 },
          { nombre: "Mantequilla light", cantidad: "1 cda (5g)", calorias: 45, grasas: 5 }
        ]
      },
      {
        id: "desayuno_yogur_fruta",
        descripcion: "Yogur descremado + fruta picada + 1 cda semillas (opcional).",
        saciedad: "++",
        comentarios: "Elegí yogur natural o sin azúcar agregada.",
        calorias: 220,
        ingredientes: [
          { nombre: "Yogur descremado", cantidad: "200g", calorias: 120, proteinas: 12, carbohidratos: 8 },
          { nombre: "Fruta picada", cantidad: "1 taza (150g)", calorias: 80, carbohidratos: 20 },
          { nombre: "Semillas mixtas", cantidad: "1 cda (10g)", calorias: 60, grasas: 5, proteinas: 2 }
        ]
      }
    ],
    merienda: [
      {
        id: "merienda_inf_pancake",
        descripcion: "Infusión (té, mate, café con leche) + mini pancake de avena y huevo + banana o manzana.",
        saciedad: "+++",
        comentarios: "Podés hacer varios y freezar.",
        calorias: 280,
        ingredientes: [
          { nombre: "Huevo", cantidad: "1 unidad", calorias: 70, proteinas: 6, grasas: 5 },
          { nombre: "Avena", cantidad: "30g", calorias: 110, carbohidratos: 20, proteinas: 4 },
          { nombre: "Banana/Manzana", cantidad: "1 unidad (120g)", calorias: 100, carbohidratos: 25 }
        ]
      },
      {
        id: "merienda_tostada_queso",
        descripcion: "Tostada integral/salvado + queso port salut + mermelada light.",
        saciedad: "++",
        comentarios: "Sumá 1 huevo si necesitás más saciedad.",
        calorias: 240,
        ingredientes: [
          { nombre: "Pan integral", cantidad: "1 rebanada (30g)", calorias: 80, carbohidratos: 15, proteinas: 3 },
          { nombre: "Queso port salut descremado", cantidad: "25g", calorias: 75, proteinas: 7, grasas: 4 },
          { nombre: "Mermelada light", cantidad: "1 cda (15g)", calorias: 30, carbohidratos: 7 },
          { nombre: "Mantequilla light", cantidad: "1 cda (5g)", calorias: 45, grasas: 5 }
        ]
      },
      {
        id: "merienda_yogur_fruta",
        descripcion: "Yogur descremado + fruta (estación) + 1 cda semillas.",
        saciedad: "++",
        comentarios: "Opción fresca post-entreno.",
        calorias: 180,
        ingredientes: [
          { nombre: "Yogur descremado", cantidad: "150g", calorias: 90, proteinas: 9, carbohidratos: 6 },
          { nombre: "Fruta de estación", cantidad: "1 unidad (120g)", calorias: 70, carbohidratos: 18 },
          { nombre: "Semillas mixtas", cantidad: "1 cda (10g)", calorias: 60, grasas: 5, proteinas: 2 }
        ]
      }
    ]
  },
  referencias_seleccionadas: {
    "pastel_carne_papa_zapallo": "Pastel de carne picada, papa y zapallo. Porción ~10x10 cm. Ensalada a elección.",
    "tarta_verduras_port": "Tarta de verduras con queso port salut y mix de semillas. Ensalada a elección.",
    "tacos_pollo_queso": "Tacos de pollo, queso y verduras salteadas.",
    "wok_veg_arroz_pollo": "Wok de vegetales y fideos/arroz + pollo.",
    "milanesa_pollo_avena": "Milanesa de pollo empanada con avena. Ensalada a elección.",
    "sandwich_integral_atun": "Sándwich con pan integral de atún, queso untable y zanahoria rallada (hacer pasta con el relleno). Ensalada a elección.",
    "hamburguesa_lentejas": "Hamburguesa vegetal (lentejas) con queso port salut y ensalada a elección.",
    "carne_estofada_arroz": "Carne estofada con arroz y brócoli.",
    "ensalada_atun_arroz": "Ensalada de atún, arroz, lechuga, zanahoria y tomate.",
    "pizza_espinaca_verd": "Pizza casera con cobertura de espinaca/morrón/tomate o verduras grilladas.",
    "wrap_zapallo_morron": "Wrap de zapallo y morrón al horno, hojas verdes y pollo (opcional).",
    "tarta_pollo": "Tarta de pollo con vegetales. Ensalada a elección.",
    "sandwich_pollo_port": "Sándwich de pollo, queso port salut y tomate. Ensalada a elección.",
    "omelette_espinaca_port": "Omelette de 2 huevos con espinaca y queso port salut. Ensalada a elección."
  },
  plan_semanal: {
    lunes: {
      desayuno: "desayuno_tostada_queso",
      almuerzo: {
        ref: "pastel_carne_papa_zapallo",
        prep_batch_freezar: true,
        nota: "Hacé el finde y freezá porciones. Recalentá micro/horno.",
        calorias: 650,
        ingredientes: [
          { nombre: "Carne picada", cantidad: "150g", calorias: 300, proteinas: 30, grasas: 18 },
          { nombre: "Papa", cantidad: "200g", calorias: 160, carbohidratos: 36, proteinas: 4 },
          { nombre: "Zapallo", cantidad: "100g", calorias: 40, carbohidratos: 10, proteinas: 1 },
          { nombre: "Cebolla", cantidad: "50g", calorias: 20, carbohidratos: 5 },
          { nombre: "Aceite", cantidad: "1 cda (10g)", calorias: 90, grasas: 10 },
          { nombre: "Huevo", cantidad: "1 unidad", calorias: 70, proteinas: 6, grasas: 5 }
        ]
      },
      merienda: "merienda_inf_pancake",
      cena: {
        ref: "tarta_verduras_port",
        sobras_ok: true,
        nota: "Comprá tapas económicas; relleno con acelga/zapallo/espinaca segun oferta.",
        calorias: 420,
        ingredientes: [
          { nombre: "Tapa de tarta", cantidad: "1 unidad", calorias: 200, carbohidratos: 35, proteinas: 5 },
          { nombre: "Acelga/Espinaca", cantidad: "200g", calorias: 40, carbohidratos: 8, proteinas: 4 },
          { nombre: "Queso port salut", cantidad: "60g", calorias: 180, proteinas: 12, grasas: 12 },
          { nombre: "Huevo", cantidad: "1 unidad", calorias: 70, proteinas: 6, grasas: 5 },
          { nombre: "Cebolla", cantidad: "30g", calorias: 12, carbohidratos: 3 }
        ]
      }
    },
    martes: {
      desayuno: "desayuno_inf_pancake",
      almuerzo: {
        ref: "wok_veg_arroz_pollo",
        nota: "Usá pollo en oferta (muslo deshuesado) + verduras de estación congeladas.",
        calorias: 580,
        ingredientes: [
          { nombre: "Arroz blanco cocido", cantidad: "150g", calorias: 180, carbohidratos: 40 },
          { nombre: "Pollo (muslo deshuesado)", cantidad: "120g", calorias: 180, proteinas: 22, grasas: 8 },
          { nombre: "Verduras salteadas", cantidad: "120g", calorias: 50, carbohidratos: 10 },
          { nombre: "Aceite mezcla", cantidad: "1 cda (10g)", calorias: 90, grasas: 10 },
          { nombre: "Salsa de soja light", cantidad: "1 cda (15ml)", calorias: 10 },
          { nombre: "Semillas (opcional)", cantidad: "10g", calorias: 30, grasas: 3 }
        ]
      },
      merienda: "merienda_tostada_queso",
      cena: {
        ref: "tacos_pollo_queso",
        nota: "Tortillas rapiditas; rinde con sobras del wok.",
        calorias: 480,
        ingredientes: [
          { nombre: "Tortilla de trigo", cantidad: "2 unidades (60g)", calorias: 160, carbohidratos: 32 },
          { nombre: "Pechuga de pollo", cantidad: "80g", calorias: 120, proteinas: 20, grasas: 2 },
          { nombre: "Queso port salut", cantidad: "30g", calorias: 90, proteinas: 7, grasas: 5 },
          { nombre: "Verduras salteadas", cantidad: "80g", calorias: 40, carbohidratos: 8 },
          { nombre: "Aceite", cantidad: "1 cdita (5g)", calorias: 45, grasas: 5 }
        ]
      }
    },
    miercoles: {
      desayuno: "desayuno_yogur_fruta",
      almuerzo: {
        ref: "milanesa_pollo_avena",
        prep_batch_freezar: true,
        nota: "Empaná varias pechugas/muslo molido + avena molida; horneá y freezá.",
        calorias: 520,
        ingredientes: [
          { nombre: "Pechuga de pollo", cantidad: "100g", calorias: 120, proteinas: 22, grasas: 2 },
          { nombre: "Avena molida", cantidad: "30g", calorias: 110, carbohidratos: 20, proteinas: 4 },
          { nombre: "Huevo", cantidad: "1 unidad", calorias: 70, proteinas: 6, grasas: 5 },
          { nombre: "Aceite", cantidad: "1 cda (10g)", calorias: 90, grasas: 10 },
          { nombre: "Ensalada mixta", cantidad: "150g", calorias: 40, carbohidratos: 8 }
        ]
      },
      merienda: "merienda_inf_pancake",
      cena: {
        ref: "sandwich_integral_atun",
        nota: "Atún en lata al natural (marca económica); mezcla con zanahoria rallada.",
        calorias: 380,
        ingredientes: [
          { nombre: "Pan integral", cantidad: "2 rebanadas (60g)", calorias: 160, carbohidratos: 30, proteinas: 6 },
          { nombre: "Atún al natural", cantidad: "1 lata (80g)", calorias: 90, proteinas: 18, grasas: 1 },
          { nombre: "Queso untable descremado", cantidad: "20g", calorias: 30, proteinas: 2, grasas: 2 },
          { nombre: "Zanahoria rallada", cantidad: "40g", calorias: 15, carbohidratos: 3 },
          { nombre: "Ensalada verde", cantidad: "80g", calorias: 20, carbohidratos: 4 }
        ]
      }
    },
    jueves: {
      desayuno: "desayuno_tostada_queso",
      almuerzo: {
        ref: "hamburguesa_lentejas",
        prep_batch_freezar: true,
        nota: "Usá lentejas secas (baratas); hacé medallones y freezá.",
        calorias: 450,
        ingredientes: [
          { nombre: "Lentejas cocidas", cantidad: "120g", calorias: 140, carbohidratos: 24, proteinas: 9 },
          { nombre: "Queso port salut", cantidad: "30g", calorias: 90, proteinas: 7, grasas: 5 },
          { nombre: "Pan integral", cantidad: "1 unidad (40g)", calorias: 100, carbohidratos: 20, proteinas: 3 },
          { nombre: "Ensalada mixta", cantidad: "100g", calorias: 30, carbohidratos: 6 },
          { nombre: "Aceite", cantidad: "1 cdita (5g)", calorias: 45, grasas: 5 },
          { nombre: "Semillas (opcional)", cantidad: "10g", calorias: 30, grasas: 3 }
        ]
      },
      merienda: "merienda_yogur_fruta",
      cena: {
        ref: "omelette_espinaca_port",
        nota: "Espinaca congelada o acelga salteada; listo en 10 min.",
        calorias: 340,
        ingredientes: [
          { nombre: "Huevo", cantidad: "2 unidades", calorias: 140, proteinas: 12, grasas: 10 },
          { nombre: "Espinaca cocida", cantidad: "100g", calorias: 30, carbohidratos: 4, proteinas: 3 },
          { nombre: "Queso port salut", cantidad: "30g", calorias: 90, proteinas: 7, grasas: 5 },
          { nombre: "Aceite", cantidad: "1 cdita (5g)", calorias: 45, grasas: 5 },
          { nombre: "Ensalada verde", cantidad: "80g", calorias: 20, carbohidratos: 4 }
        ]
      }
    },
    viernes: {
      desayuno: "desayuno_inf_pancake",
      almuerzo: {
        ref: "carne_estofada_arroz",
        prep_batch_freezar: true,
        nota: "Usá corte económico (paleta, roast beef) a cocción lenta. Rinde varios días.",
        calorias: 720,
        ingredientes: [
          { nombre: "Carne vacuna", cantidad: "150g", calorias: 250, proteinas: 28, grasas: 14 },
          { nombre: "Arroz blanco cocido", cantidad: "150g", calorias: 180, carbohidratos: 40 },
          { nombre: "Brócoli cocido", cantidad: "100g", calorias: 30, carbohidratos: 6, proteinas: 3 },
          { nombre: "Zanahoria", cantidad: "50g", calorias: 20, carbohidratos: 5 },
          { nombre: "Aceite", cantidad: "1 cda (10g)", calorias: 90, grasas: 10 },
          { nombre: "Salsa de tomate", cantidad: "50g", calorias: 20, carbohidratos: 4 }
        ]
      },
      merienda: "merienda_tostada_queso",
      cena: {
        ref: "ensalada_atun_arroz",
        nota: "Usá arroz ya hecho (sobras del estofado) + atún lata.",
        calorias: 320,
        ingredientes: [
          { nombre: "Arroz blanco cocido", cantidad: "100g", calorias: 120, carbohidratos: 26 },
          { nombre: "Atún al natural", cantidad: "1 lata (80g)", calorias: 90, proteinas: 18, grasas: 1 },
          { nombre: "Lechuga", cantidad: "50g", calorias: 10, carbohidratos: 2 },
          { nombre: "Zanahoria", cantidad: "30g", calorias: 12, carbohidratos: 3 },
          { nombre: "Tomate", cantidad: "50g", calorias: 10, carbohidratos: 2 },
          { nombre: "Aceite", cantidad: "1 cdita (5g)", calorias: 45, grasas: 5 }
        ]
      }
    },
    sabado: {
      desayuno: "desayuno_yogur_fruta",
      almuerzo: {
        ref: "pizza_espinaca_verd",
        nota: "Masa casera o prepizza barata. Cubrí con verduras asadas de estación.",
        calorias: 680,
        ingredientes: [
          { nombre: "Prepizza o masa casera", cantidad: "1 porción (120g)", calorias: 300, carbohidratos: 60, proteinas: 8 },
          { nombre: "Queso port salut", cantidad: "50g", calorias: 150, proteinas: 12, grasas: 8 },
          { nombre: "Espinaca/Morrón/Tomate asado", cantidad: "100g", calorias: 40, carbohidratos: 8 },
          { nombre: "Aceite de oliva", cantidad: "1 cdita (5g)", calorias: 45, grasas: 5 },
          { nombre: "Salsa de tomate", cantidad: "40g", calorias: 15, carbohidratos: 3 },
          { nombre: "Orégano", cantidad: "1 pizca", calorias: 0 }
        ]
      },
      merienda: "merienda_inf_pancake",
      cena: {
        ref: "wrap_zapallo_morron",
        nota: "Horneá zapallo y morrón junto con prepizza para ahorrar gas.",
        calorias: 360,
        ingredientes: [
          { nombre: "Tortilla de trigo integral", cantidad: "1 unidad (40g)", calorias: 110, carbohidratos: 22 },
          { nombre: "Zapallo asado", cantidad: "100g", calorias: 40, carbohidratos: 10 },
          { nombre: "Morrón asado", cantidad: "50g", calorias: 15, carbohidratos: 3 },
          { nombre: "Pollo cocido (opcional)", cantidad: "50g", calorias: 60, proteinas: 10, grasas: 1 },
          { nombre: "Hojas verdes", cantidad: "30g", calorias: 8, carbohidratos: 2 },
          { nombre: "Aceite", cantidad: "1 cdita (5g)", calorias: 45, grasas: 5 }
        ]
      }
    },
    domingo: {
      desayuno: "desayuno_tostada_queso",
      almuerzo: {
        ref: "tarta_pollo",
        prep_batch_freezar: true,
        nota: "Hacé 2 tartas; usá sobras de pollo o muslo hervido. Congelá porciones.",
        calorias: 540,
        ingredientes: [
          { nombre: "Tapa de tarta", cantidad: "1 unidad", calorias: 200, carbohidratos: 35, proteinas: 5 },
          { nombre: "Pollo cocido", cantidad: "80g", calorias: 100, proteinas: 18, grasas: 2 },
          { nombre: "Verduras varias (acelga, zanahoria, cebolla)", cantidad: "100g", calorias: 40, carbohidratos: 8 },
          { nombre: "Queso port salut", cantidad: "30g", calorias: 90, proteinas: 7, grasas: 5 },
          { nombre: "Huevo", cantidad: "1 unidad", calorias: 70, proteinas: 6, grasas: 5 }
        ]
      },
      merienda: "merienda_yogur_fruta",
      cena: {
        ref: "sandwich_pollo_port",
        nota: "Usá pollo cocido de la tarta; cena liviana. Prepará batch cocción para semana.",
        calorias: 420,
        ingredientes: [
          { nombre: "Pan integral", cantidad: "2 rebanadas (60g)", calorias: 160, carbohidratos: 30, proteinas: 6 },
          { nombre: "Pollo cocido", cantidad: "60g", calorias: 75, proteinas: 13, grasas: 1 },
          { nombre: "Queso port salut", cantidad: "20g", calorias: 60, proteinas: 5, grasas: 3 },
          { nombre: "Tomate", cantidad: "40g", calorias: 8, carbohidratos: 2 },
          { nombre: "Ensalada verde", cantidad: "60g", calorias: 15, carbohidratos: 3 }
        ]
      }
    }
  },
  listas_compras_basicas: {
    secos: [
      { nombre: "Avena a granel", cantidad_semanal: "300g", cantidad_mensual: "1.2kg" },
      { nombre: "Arroz largo fino o doble carolina (según oferta)", cantidad_semanal: "250g", cantidad_mensual: "1kg" },
      { nombre: "Lentejas secas", cantidad_semanal: "150g", cantidad_mensual: "600g" },
      { nombre: "Harina + levadura seca (masa pizza)", cantidad_semanal: "100g + 1 sobre", cantidad_mensual: "400g + 4 sobres" },
      { nombre: "Tortillas rapiditas o tapas para tarta económicas", cantidad_semanal: "4 unidades", cantidad_mensual: "16 unidades" },
      { nombre: "Semillas surtidas (opcional)", cantidad_semanal: "30g", cantidad_mensual: "120g" }
    ],
    proteinas: [
      { nombre: "Huevos", cantidad_semanal: "12 unidades", cantidad_mensual: "48 unidades" },
      { nombre: "Pollo (muslo/contramuslo, pollo entero)", cantidad_semanal: "1.5kg", cantidad_mensual: "6kg" },
      { nombre: "Carne económica para estofar (paleta, roast beef, roast beef molido)", cantidad_semanal: "1.5kg", cantidad_mensual: "6kg" },
      { nombre: "Atún en lata al natural", cantidad_semanal: "1 lata", cantidad_mensual: "4 latas" },
      { nombre: "Queso port salut descremado en horma o feteado económico", cantidad_semanal: "100g", cantidad_mensual: "400g" }
    ],
    lacteos: [
      { nombre: "Leche o bebida vegetal económica", cantidad_semanal: "1 litro", cantidad_mensual: "4 litros" },
      { nombre: "Yogur descremado sin azúcar (pack grande)", cantidad_semanal: "1 paquete", cantidad_mensual: "4 paquetes" }
    ],
    verduras_frutas_estacion: [
      { nombre: "Cebolla", cantidad_semanal: "1 cabeza", cantidad_mensual: "4 cabezas" },
      { nombre: "Zanahoria", cantidad_semanal: "1 kg", cantidad_mensual: "4 kg" },
      { nombre: "Zapallo anco o calabaza", cantidad_semanal: "1 unidad", cantidad_mensual: "4 unidades" },
      { nombre: "Papa", cantidad_semanal: "1 kg", cantidad_mensual: "4 kg" },
      { nombre: "Acelga o espinaca (según precio)", cantidad_semanal: "1 kg", cantidad_mensual: "4 kg" },
      { nombre: "Morrón (cuando esté en oferta)", cantidad_semanal: "1 unidad", cantidad_mensual: "4 unidades" },
      { nombre: "Tomate", cantidad_semanal: "1 kg", cantidad_mensual: "4 kg" },
      { nombre: "Lechuga/hojas verdes mixtas", cantidad_semanal: "1 kg", cantidad_mensual: "4 kg" },
      { nombre: "Brócoli congelado (opcional/oferta)", cantidad_semanal: "1 kg", cantidad_mensual: "4 kg" },
      { nombre: "Bananas", cantidad_semanal: "2 unidades", cantidad_mensual: "8 unidades" },
      { nombre: "Fruta de estación (manzana, naranja, etc.)", cantidad_semanal: "1 unidad", cantidad_mensual: "4 unidades" }
    ],
    despensa_extra: [
      { nombre: "Mermelada light", cantidad_semanal: "1 taza", cantidad_mensual: "4 tazas" },
      { nombre: "Edulcorante", cantidad_semanal: "1 sobre", cantidad_mensual: "4 sobres" },
      { nombre: "Aceite mezcla/girasol", cantidad_semanal: "1 botella", cantidad_mensual: "4 botellas" },
      { nombre: "Especias (pimentón, ajo en polvo, orégano)", cantidad_semanal: "1 sobre", cantidad_mensual: "4 sobres" },
      { nombre: "Salsa de tomate o puré de tomate económico", cantidad_semanal: "1 taza", cantidad_mensual: "4 tazas" }
    ]
  }
} 