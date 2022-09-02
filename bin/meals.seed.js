import mongoose from 'mongoose'
import Meal from './../models/Meal.js'

mongoose
    .connect('mongodb://localhost/wetaca')
    .then((x) => {
        console.log(
            `Connected to Mongo JEJE! Database name: "${x.connections[0].name}"`
        );
    })
    .catch((err) => {
        console.error("Error connecting to mongo: ", err);
    });


const meals = [
    {
        name: 'MERLUZA CON ALLADA GALLEGA, PANADERAS, CHAMPIÑONES Y CEBOLLITAS',
        type: 'Platos Únicos',
        ingredients: 'Merluza (32.1%) con allada (fumet blanco (agua, espina de pescado, cebolla, puerro, vino blanco, aceite de oliva, sal), Oloroso, vino blanco, aceite de oliva virgen extra, pan de picos, ajo, sal, pimentón dulce, goma de maíz y laurel), patatas panaderas (20.5%), cebollitas francesas (10.3%), champiñones (10.3%), aceite de oliva, ajo, orégano, pimienta negra y laurel.',
        category: 'Pescado',
        weight: 560,
        price: 7.45,
        images: {
            finals: ['https://static.wetaca.com/products/872/detail/merluza-con-allada-gallega-panaderas-champinones-y-cebollitas_A.jpg',
                'https://static.wetaca.com/products/872/detail/merluza-con-allada-gallega-panaderas-champinones-y-cebollitas_B.jpg'],
            wip: ['https://static.wetaca.com/products/872/gallery/merluza-con-allada-gallega-panaderas-champinones-y-cebollitas_A.jpg',
                'https://static.wetaca.com/products/872/gallery/merluza-con-allada-gallega-panaderas-champinones-y-cebollitas_B.jpg',
                'https://static.wetaca.com/products/872/gallery/merluza-con-allada-gallega-panaderas-champinones-y-cebollitas_C.jpg'],
        },
        description: 'Para la base de la allada partimos de nuestro caldo de pescados hecho a partir de espinas, vino blanco, pimentón, ajo y aceite de oliva. Cocinamos la merluza a baja temperatura dentro de la salsa para que quede jugosa. Para rematar acompañamos con unas patatas panaderas y un mix de verduras.',
        allergens: {
            celery: false,
            gluten: true,
            crustaceans: false,
            eggs: false,
            fish: true,
            lupin: false,
            milk: false,
            molluscs: false,
            mustard: false,
            peanuts: false,
            sesame: false,
            soybeans: false,
            sulphurDioxide: false,
            sulphites: false,
        },
        nutritionalValues: {
            calories: 120.00,
            totalFats: 6.90,
            saturatedFat: 1.00,
            carbs: 7.80,
            protein: 5.30,
            sugar: 2.00,
            fiber: 1.40,
            sodium: 0.50
        },
        lastWeekInMenu: new Date(),
        popularity: {
            averageRating: 3,
            timesOrdered: 17
        }
    },
    {
        name: 'TACOS DE COCHINITA PIBIL',
        type: 'Platos Únicos',
        ingredients: 'Aguja de cerdo, tortillas mexicanas de trigo, cebolla morada, zumo de naranja, zumo de lima, manteca de cerdo ibérico, pasta de achiote, sofrito de cebolla, caldo de cerdo (agua, espinazo freso, cebolla, zanahoria, aceite de oliva, ajo, sal), cebolla encurtida (cebolla morada, vinagre de vino, azúcar blanco, agua), aceite de oliva, vinagre de vino, sal, ajo confitado, cilantro, pimienta negra, cayena, comino y coriandro.',
        category: 'Internacional',
        weight: 395,
        price: 6.95,
        images: {
            finals: ['https://static.wetaca.com/products/128/detail/tacos-de-cochinita-pibil_B.jpg',
                'https://static.wetaca.com/products/128/detail/tacos-de-cochinita-pibil_A.jpg'],
            wip: ['https://static.wetaca.com/products/128/gallery/tacos-de-cochinita-pibil_A.jpg',
                'https://static.wetaca.com/products/128/gallery/tacos-de-cochinita-pibil_B.jpg',
                'https://static.wetaca.com/products/128/gallery/tacos-de-cochinita-pibil_C.jpg']
        },
        description: 'Cocinamos aguja de cerdo a baja temperatura, lo desmigamos y mezclamos con nuestra pasta de achiote casera. Agregamos cilantro y cebolla morada encurtida. Lo acompañamos con tacos para una experiencia completa.',
        allergens: {
            celery: false,
            gluten: true,
            crustaceans: false,
            eggs: false,
            fish: false,
            lupin: false,
            milk: false,
            molluscs: false,
            mustard: false,
            peanuts: false,
            sesame: false,
            soybeans: false,
            sulphurDioxide: false,
            sulphites: false,
        },
        nutritionalValues: {
            calories: 254.00,
            totalFats: 16.00,
            saturatedFat: 7.00,
            carbs: 15.00,
            protein: 13.00,
            sugar: 4.00,
            fiber: 1.00,
            sodium: 1.00
        },
        lastWeekInMenu: new Date(),
        popularity: {
            averageRating: 3.9,
            timesOrdered: 25
        }
    },
    {
        name: 'ARROZ DE TERNERA Y SETAS',
        type: 'Platos Únicos',
        ingredients: 'Caldo de ternera (agua, huesos de rodilla, cebolla, zanahoria, morcillo, pie de ternera, puerro, apio, aceite de oliva, ajo, pasta de tomate, sal y laurel), arroz carnarolli (22%), morcillo (16%), sofrito casero (setas variadas (15%), sofrito de cebolla, vino blanco, oloroso, ajo, aceite de oliva, agua, laurel, ñoras, sal, pimienta negra, pimentón dulce) y mantequilla.',
        category: 'Arroz',
        weight: 450,
        price: 6.95,
        images: {
            finals: ['https://static.wetaca.com/products/227/detail/arroz-de-ternera-y-setas_A.jpg',
                'https://static.wetaca.com/products/227/detail/arroz-de-ternera-y-setas_B.jpg'],
            wip: ['https://static.wetaca.com/products/227/gallery/arroz-de-ternera-y-setas_A.jpg',
                'https://static.wetaca.com/products/227/gallery/arroz-de-ternera-y-setas_B.jpg',
                'https://static.wetaca.com/products/227/gallery/arroz-de-ternera-y-setas_C.jpg']
        },
        description: 'Cocinamos morcillo de vacuno a baja temperatura hasta que la carne queda melosa. Sofreímos ajo, cebolla, setas y pimiento rojo. Mojamos el arroz con caldo de ternera. Lo terminamos con la carne desmigada, mantequilla y cebollino.',
        allergens: {
            celery: true,
            gluten: false,
            crustaceans: false,
            eggs: false,
            fish: false,
            lupin: false,
            milk: true,
            molluscs: false,
            mustard: false,
            peanuts: false,
            sesame: false,
            soybeans: false,
            sulphurDioxide: false,
            sulphites: false,
        },
        nutritionalValues: {
            calories: 170.70,
            totalFats: 6.90,
            saturatedFat: 2.10,
            carbs: 20.20,
            protein: 6.90,
            sugar: 1.40,
            fiber: 0.90,
            sodium: 0.90
        },
        lastWeekInMenu: new Date(),
        popularity: {
            averageRating: 4.4,
            timesOrdered: 37
        }
    },
    {
        name: 'SPAGHETTI CACIO E PEPE',
        type: 'Platos Únicos',
        ingredients: 'Espaguetis de trigo (58,8%), salsa (agua de pasta, parmesano (con leche pasteurizada), aceite de oliva, sal, pimienta negra) y queso de oveja curado (con leche pasteurizada).',
        category: 'Pasta',
        weight: 510,
        price: 5.95,
        images: {
            finals: ['https://static.wetaca.com/products/398/detail/spaghetti-cacio-e-pepe_A.jpg',
                'https://static.wetaca.com/products/398/detail/spaghetti-cacio-e-pepe_B.jpg'],
            wip: ['https://static.wetaca.com/products/398/gallery/spaghetti-cacio-e-pepe_A.jpg',
                'https://static.wetaca.com/products/398/gallery/spaghetti-cacio-e-pepe_B.jpg',
                'https://static.wetaca.com/products/398/gallery/spaghetti-cacio-e-pepe_C.jpg']
        },
        description: 'Para hacer la salsa de este clásico romano utilizamos el agua de cocción de la pasta, que debe llevar bastante sal, a la que incorporamos abundante queso de oveja curado, aceite de oliva y pimienta negra. Destaca por su simpleza, pero debe tener la textura justa para poder envolver y adherirse a los spaghetti, pasta utilizada tradicionalmente.',
        allergens: {
            celery: false,
            gluten: true,
            crustaceans: false,
            eggs: false,
            fish: false,
            lupin: false,
            milk: true,
            molluscs: false,
            mustard: false,
            peanuts: false,
            sesame: false,
            soybeans: false,
            sulphurDioxide: false,
            sulphites: false,
        },
        nutritionalValues: {
            calories: 185.70,
            totalFats: 5.30,
            saturatedFat: 2.30,
            carbs: 26.40,
            protein: 7.50,
            sugar: 2.10,
            fiber: 1.40,
            sodium: 0.60
        },
        lastWeekInMenu: new Date(),
        popularity: {
            averageRating: 4.1,
            timesOrdered: 28
        }
    },
    {
        name: 'CAZUELA DE FIDEOS',
        type: 'Platos Únicos',
        ingredients: 'Caldo de verduras (agua, cebolla, zanahoria, puerro, apio, champiñones, perejil fresco, ajo pelado, aceite de oliva, jengibre fresco, sal y laurel), caldo de jamón (hueso de jamón y agua), fideo (25%), sofrito de cebolla, piquillo, jamón serrano, ajo asado, ñoras, aceite de oliva, espinacas y sal.',
        category: 'Arroz',
        weight: 450,
        price: 6.45,
        images: {
            finals: ['https://static.wetaca.com/products/642/detail/cazuela-de-fideos_A.jpg',
                'https://static.wetaca.com/products/642/detail/cazuela-de-fideos_B.jpg'],
            wip: ['https://static.wetaca.com/products/642/gallery/cazuela-de-fideos_A.jpg',
                'https://static.wetaca.com/products/642/gallery/cazuela-de-fideos_B.jpg',
                'https://static.wetaca.com/products/642/gallery/cazuela-de-fideos_C.jpg']
        },
        description: 'Para la base de estos fideos comenzamos sofriendo jamón junto con ajo asado y piquillo. Tostamos los fideos para evitar que se pasen. Mojamos a partes iguales con nuestros caldos caseros de jamón y verduras. Cuando faltan apenas unos minutos para terminar incorporamos espinacas frescas que terminan de redondear el sabor equilibrado del plato.',
        allergens: {
            celery: true,
            gluten: true,
            crustaceans: false,
            eggs: false,
            fish: false,
            lupin: false,
            milk: false,
            molluscs: false,
            mustard: false,
            peanuts: false,
            sesame: false,
            soybeans: false,
            sulphurDioxide: false,
            sulphites: false,
        },
        nutritionalValues: {
            calories: 131.40,
            totalFats: 3.80,
            saturatedFat: 0.80,
            carbs: 19.30,
            protein: 4.80,
            sugar: 1.80,
            fiber: 0.90,
            sodium: 0.40
        },
        lastWeekInMenu: new Date(),
        popularity: {
            averageRating: 4.3,
            timesOrdered: 22
        }
    },
    {
        name: 'ALBÓNDIGAS AL POMODORO',
        type: 'Platos Únicos',
        ingredients: 'Albóndigas (carne picada de ternera, pan de molde, leche entera, aceite de oliva, ajo, sal, huevo, harina de trigo y proteína de soja) (25%), salsa de tomate casera (tomate, cebolla, aceite de oliva, agua, ajo, azúcar, pimienta y sal) y tagliatelle (de trigo).',
        category: 'Pasta',
        weight: 500,
        price: 6.75,
        images: {
            finals: ['https://static.wetaca.com/products/140/detail/albondigas-al-pomodoro_A.jpg',
                'https://static.wetaca.com/products/140/detail/albondigas-al-pomodoro_B.jpg'],
            wip: ['https://static.wetaca.com/products/140/gallery/albondigas-al-pomodoro_A.jpg',
                'https://static.wetaca.com/products/140/gallery/albondigas-al-pomodoro_B.jpg',
                'https://static.wetaca.com/products/140/gallery/albondigas-al-pomodoro_C.jpg']
        },
        description: 'Guisamos lentamente unas jugosas albóndigas 100% vacuno en nuestra salsa de tomate artesana. La refrescamos con albahaca y acompañamos de tagliatelle al dente.',
        allergens: {
            celery: false,
            gluten: true,
            crustaceans: false,
            eggs: true,
            fish: false,
            lupin: false,
            milk: true,
            molluscs: false,
            mustard: false,
            peanuts: false,
            sesame: false,
            soybeans: true,
            sulphurDioxide: false,
            sulphites: false,
        },
        nutritionalValues: {
            calories: 150.60,
            totalFats: 4.60,
            saturatedFat: 1.80,
            carbs: 19.60,
            protein: 7.00,
            sugar: 4.40,
            fiber: 1.40,
            sodium: 1.40
        },
        lastWeekInMenu: new Date(),
        popularity: {
            averageRating: 3.7,
            timesOrdered: 27
        }
    },
    {
        name: 'LASAGNA AL TONNO',
        type: 'Platos Únicos',
        ingredients: 'Bechamel casera (leche entera, mantequilla, harina de trigo, sal, nuez moscada y pimienta negra), tomate, atún, pasta de lasagna (de trigo), sofrito de cebolla, pasta de tomate, Grana Padano (con leche no pasteurizada), albahaca, sal y orégano.',
        category: 'Gratinado',
        weight: 450,
        price: 6.45,
        images: {
            finals: ['https://static.wetaca.com/products/191/detail/lasagna-al-tonno_A.jpg',
                'https://static.wetaca.com/products/191/detail/lasagna-al-tonno_B.jpg'],
            wip: ['https://static.wetaca.com/products/191/gallery/lasagna-al-tonno_A.jpg',
                'https://static.wetaca.com/products/191/gallery/lasagna-al-tonno_B.jpg',
                'https://static.wetaca.com/products/191/gallery/lasagna-al-tonno_C.jpg']
        },
        description: 'Partimos de una salsa artesana de tomate, añadimos atún, hierbas y montamos capa a capa con pasta fresca al huevo. Terminamos con una capa de nuestra bechamel de leche gallega y Grana Padano.',
        allergens: {
            celery: false,
            gluten: true,
            crustaceans: false,
            eggs: false,
            fish: true,
            lupin: false,
            milk: true,
            molluscs: false,
            mustard: false,
            peanuts: false,
            sesame: false,
            soybeans: false,
            sulphurDioxide: false,
            sulphites: false,
        },
        nutritionalValues: {
            calories: 187.90,
            totalFats: 7.90,
            saturatedFat: 3.90,
            carbs: 19.40,
            protein: 9.70,
            sugar: 5.60,
            fiber: 1.40,
            sodium: 0.70
        },
        lastWeekInMenu: new Date(),
        popularity: {
            averageRating: 4.6,
            timesOrdered: 43
        }
    },
    {
        name: 'REDONDO CON SALSA DE CHAMPIÑONES A LA CREMA Y VERDURAS',
        type: 'Platos Únicos',
        ingredients: 'Verduras (patatas, brócoli, cebollitas francesas, aceite de oliva, ajo, pimienta negra, romero y sal) (50%), salsa (caldo de cerdo tostado (agua, espinazo fresco, cebolla, zanahoria, aceite de oliva, ajo pelado y sal), champiñones (4,6%), nata (4,4%), sofrito de cebolla, Oloroso, vino blanco, vermut rojo, maicena, ajo, sal, pimentón dulce, pimienta negra y laurel) y redondo de ternera (24%). ',
        category: 'Carne',
        weight: 500,
        price: 6.95,
        images: {
            finals: ['https://static.wetaca.com/products/818/detail/redondo-con-salsa-de-champinones-a-la-crema-y-verduras_A.jpg',
                'https://static.wetaca.com/products/818/detail/redondo-con-salsa-de-champinones-a-la-crema-y-verduras_B.jpg'],
            wip: ['https://static.wetaca.com/products/818/gallery/redondo-con-salsa-de-champinones-a-la-crema-y-verduras_A.jpg',
                'https://static.wetaca.com/products/818/gallery/redondo-con-salsa-de-champinones-a-la-crema-y-verduras_B.jpg',
                'https://static.wetaca.com/products/818/gallery/redondo-con-salsa-de-champinones-a-la-crema-y-verduras_C.jpg']
        },
        description: 'Cocinamos el redondo a baja temperatura asegurándonos que quede perfectamente cocido y jugoso. Para la salsa comenzamos sofriendo lentamente cebolla junto con ajo y champiñones. Mojamos con vermut rojo y nuestro caldo casero. Para acompañar rematamos con un mix de patatas asadas, brócoli y cebollitas francesas.',
        allergens: {
            celery: false,
            gluten: false,
            crustaceans: false,
            eggs: false,
            fish: false,
            lupin: false,
            milk: true,
            molluscs: false,
            mustard: false,
            peanuts: false,
            sesame: false,
            soybeans: false,
            sulphurDioxide: false,
            sulphites: false,
        },
        nutritionalValues: {
            calories: 118.30,
            totalFats: 4.90,
            saturatedFat: 2.40,
            carbs: 10.00,
            protein: 12.90,
            sugar: 2.90,
            fiber: 2.30,
            sodium: 0.60
        },
        lastWeekInMenu: new Date(),
        popularity: {
            averageRating: 3.6,
            timesOrdered: 31
        }
    },
    {
        name: 'SOLOMILLO A LA PIMIENTA',
        type: 'Platos Únicos',
        ingredients: 'Solomillo de cerdo (24%), patatas, caldo de cerdo tostado (agua, espinazo fresco, cebolla, zanahoria, aceite de oliva, ajo pelado, sal), sofrito de cebolla, nata, ajo, harina de trigo, mantequilla, vino tinto, oloroso río viejo, ajo, aceite de oliva, laurel, miel, sal, pimienta verde (0,26%) y pimienta negra (0,07%).',
        category: 'Carne',
        weight: 500,
        price: 6.95,
        images: {
            finals: ['https://static.wetaca.com/products/485/detail/solomillo-a-la-pimienta_A.jpg',
                'https://static.wetaca.com/products/485/detail/solomillo-a-la-pimienta_B.jpg'],
            wip: ['https://static.wetaca.com/products/485/gallery/solomillo-a-la-pimienta_A.jpg',
                'https://static.wetaca.com/products/485/gallery/solomillo-a-la-pimienta_B.jpg',
                'https://static.wetaca.com/products/485/gallery/solomillo-a-la-pimienta_C.jpg']
        },
        description: 'Cocinamos el solomillo a baja temperatura para asegurarnos que quede perfectamente en su punto. Luego lo marcamos en la plancha para obtener esa caramelización exterior tan agradable. Para la salsa doramos un mix de pimienta verde y negra a las que incorporamos vino, caldo de cerdo y un toque de nata.',
        allergens: {
            celery: false,
            gluten: true,
            crustaceans: false,
            eggs: false,
            fish: false,
            lupin: false,
            milk: true,
            molluscs: false,
            mustard: false,
            peanuts: false,
            sesame: false,
            soybeans: false,
            sulphurDioxide: false,
            sulphites: false,
        },
        nutritionalValues: {
            calories: 144.90,
            totalFats: 6.00,
            saturatedFat: 2.30,
            carbs: 12.80,
            protein: 9.60,
            sugar: 2.80,
            fiber: 1.30,
            sodium: 0.50
        },
        lastWeekInMenu: new Date(),
        popularity: {
            averageRating: 4.1,
            timesOrdered: 33
        }
    },
    {
        name: 'GARBANZOS CON BUTIFARRA Y SETAS',
        type: 'Platos Únicos',
        ingredients: 'Caldo de pollo tostado (agua, carcasa de pollo, alitas de pollo, zanahoria, cebolla, aceite de oliva, ajo pelado, laurel y sal), garbanzos, sofrito de cebolla, butifarra blanca (6%), champiñones, setas variadas (8%), vino blanco, oloroso, tomate, perejil fresco, sal, chipotles, pimentón dulce, pimienta negra, laurel y comino.',
        category: 'Legumbres',
        weight: 450,
        price: 6.45,
        images: {
            finals: ['https://static.wetaca.com/products/355/detail/garbanzos-con-butifarra-y-setas_A.jpg',
                'https://static.wetaca.com/products/355/detail/garbanzos-con-butifarra-y-setas_B.jpg'],
            wip: ['https://static.wetaca.com/products/355/gallery/garbanzos-con-butifarra-y-setas_A.jpg',
                'https://static.wetaca.com/products/355/gallery/garbanzos-con-butifarra-y-setas_B.jpg',
                'https://static.wetaca.com/products/355/gallery/garbanzos-con-butifarra-y-setas_C.jpg']
        },
        description: 'Sofreímos las verduras a fuego suave junto con los champiñones previamente dorados, trituramos esta base en la que guisaremos los garbanzos junto con la butifarra.',
        allergens: {
            celery: false,
            gluten: false,
            crustaceans: false,
            eggs: false,
            fish: false,
            lupin: false,
            milk: false,
            molluscs: false,
            mustard: false,
            peanuts: false,
            sesame: false,
            soybeans: false,
            sulphurDioxide: false,
            sulphites: false,
        },
        nutritionalValues: {
            calories: 147.70,
            totalFats: 7.10,
            saturatedFat: 1.30,
            carbs: 13.10,
            protein: 6.20,
            sugar: 3.00,
            fiber: 3.80,
            sodium: 1.20
        },
        lastWeekInMenu: new Date(),
        popularity: {
            averageRating: 4.2,
            timesOrdered: 26
        }
    },
    {
        name: 'AGUJA CON SALSA MORUNA, COUS COUS Y VERDURA JULIANA',
        type: 'Platos Únicos',
        ingredients: 'Aguja de cerdo (33%), cous cous (25%), verduras (pimiento rojo, pimiento amarillo, cebolla morada, judías verdes, aceite de oliva, sal y pimienta negra) (25%) y salsa (caldo de cerdo tostado (agua, espinazo fresco, cebolla, zanahoria, aceite de oliva, ajo pelado y sal), cilantro, zumo de limón, ajo, sofrito de cebolla, maicena, ras al hanout (nuez moscada, comino, sal, pimentón dulce, canela, curcuma, pimienta negra, coriandro, jengibre, cacao, romero, cayena y ajo), salsa de soja, jengibre, sal y aceite de oliva).',
        category: 'Carne',
        weight: 460,
        price: 6.45,
        images: {
            finals: ['https://static.wetaca.com/products/810/detail/aguja-con-salsa-moruna-cous-cous-y-verdura-juliana_A.jpg',
                'https://static.wetaca.com/products/810/detail/aguja-con-salsa-moruna-cous-cous-y-verdura-juliana_B.jpg'],
            wip: ['https://static.wetaca.com/products/810/gallery/aguja-con-salsa-moruna-cous-cous-y-verdura-juliana_A.jpg',
                'https://static.wetaca.com/products/810/gallery/aguja-con-salsa-moruna-cous-cous-y-verdura-juliana_B.jpg',
                'https://static.wetaca.com/products/810/gallery/aguja-con-salsa-moruna-cous-cous-y-verdura-juliana_C.jpg']
        },
        description: 'Cocinamos la aguja a baja temperatura obteniendo una textura muy melosa. Para la salsa sofreímos lentamente ajo, cebolla y especias, incorporamos el cilantro y el zumo de limón. Como guarnición en este caso tenemos un equilibrio entre cous cous y verduras.',
        allergens: {
            celery: false,
            gluten: true,
            crustaceans: false,
            eggs: false,
            fish: false,
            lupin: false,
            milk: false,
            molluscs: false,
            mustard: false,
            peanuts: false,
            sesame: false,
            soybeans: true,
            sulphurDioxide: false,
            sulphites: false,
        },
        nutritionalValues: {
            calories: 149.20,
            totalFats: 6.70,
            saturatedFat: 2.50,
            carbs: 13.90,
            protein: 8.40,
            sugar: 2.20,
            fiber: 2.50,
            sodium: 0.70
        },
        lastWeekInMenu: new Date(),
        popularity: {
            averageRating: 3.8,
            timesOrdered: 28
        }
    },
    {
        // hay que arreglar los alergenos de frutos secos
        name: 'CURRY VERDE DE POLLO',
        type: 'Platos Únicos',
        ingredients: 'Pechuga de pollo (34%), arroz (con aceite de oliva, ajo, sal y pimienta), pasta de curry verde (1%), leche coco infusionada (leche de coco, jengibre fresco, lemongrass y hoja lima-kaffir), sofrito de cebolla, zumo de limón, ajo confitado, salsa de soja, fish sauce (anchoa, sal y azúcar), albahaca, cilantro, caldo de pollo (agua, carcasa de pollo, alitas de pollo, zanahoria, cebolla, aceite de oliva, ajo pelado, laurel, sal), avellana tostada y espinacas.',
        category: 'Arroz',
        weight: 500,
        price: 6.45,
        images: {
            finals: ['https://static.wetaca.com/products/187/detail/curry-verde-de-pollo_A.jpg',
                'https://static.wetaca.com/products/187/detail/curry-verde-de-pollo_B.jpg'],
            wip: ['https://static.wetaca.com/products/187/gallery/curry-verde-de-pollo_A.jpg',
                'https://static.wetaca.com/products/187/gallery/curry-verde-de-pollo_B.jpg',
                'https://static.wetaca.com/products/187/gallery/curry-verde-de-pollo_C.jpg']
        },
        description: 'Pollo guisado y desmigado con nuestra pasta casera de curry verde, verduritas y leche de coco, terminado con cacahuetes y acompañado por arroz aromático.',
        allergens: {
            celery: false,
            gluten: true,
            crustaceans: false,
            eggs: false,
            fish: true,
            lupin: false,
            milk: false,
            molluscs: false,
            mustard: false,
            peanuts: true,
            sesame: false,
            soybeans: true,
            sulphurDioxide: false,
            sulphites: false,
        },
        nutritionalValues: {
            calories: 171.40,
            totalFats: 6.70,
            saturatedFat: 2.20,
            carbs: 18.60,
            protein: 9.80,
            sugar: 0.73,
            fiber: 0.29,
            sodium: 0.30
        },
        lastWeekInMenu: new Date(),
        popularity: {
            averageRating: 4.2,
            timesOrdered: 21
        }
    },
    {
        name: 'POLLO CON SALSA DE OLOROSO',
        type: 'Platos Únicos',
        ingredients: 'Contramuslo de pollo (30%), salsa (pasta de curry rojo, levadura de cerveza, caldo de cerdo tostado (agua, espinazo fresco, cebolla, zanahoria, aceite de oliva, ajo pelado y sal), sofrito de cebolla, jengibre, cayena, ciruelas pasas, vino tinto, roux (mantequilla y harina), ajo confitado, Oloroso Río Viejo, laurel, sal y pimienta negra) (21%), cebolla pochada y patatas asadas (aceite de oliva, ajo asado, sal, pimienta negra y romero).',
        category: 'Pollo',
        weight: 570,
        price: 6.45,
        images: {
            finals: ['https://static.wetaca.com/products/539/detail/pollo-con-salsa-de-oloroso_A.jpg',
                'https://static.wetaca.com/products/539/detail/pollo-con-salsa-de-oloroso_B.jpg'],
            wip: ['https://static.wetaca.com/products/539/gallery/pollo-con-salsa-de-oloroso_A.jpg',
                'https://static.wetaca.com/products/539/gallery/pollo-con-salsa-de-oloroso_B.jpg',
                'https://static.wetaca.com/products/539/gallery/pollo-con-salsa-de-oloroso_C.jpg']
        },
        description: 'Para esta salsa comenzamos sofriendo lentamente cebolla, ajo y ciruelas pasas. Incorporamos vino oloroso y nuestro caldo de cerdo. Dejamos que reduzca para lograr una textura justa. El pollo lo asamos a alta temperatura pa lograr un bonito color y asegurarnos que quede jugoso.',
        allergens: {
            celery: false,
            gluten: true,
            crustaceans: false,
            eggs: false,
            fish: false,
            lupin: false,
            milk: true,
            molluscs: false,
            mustard: false,
            peanuts: false,
            sesame: false,
            soybeans: false,
            sulphurDioxide: false,
            sulphites: false,
        },
        nutritionalValues: {
            calories: 131.54,
            totalFats: 4.71,
            saturatedFat: 1.27,
            carbs: 12.30,
            protein: 9.59,
            sugar: 2.73,
            fiber: 1.50,
            sodium: 0.60
        },
        lastWeekInMenu: new Date(),
        popularity: {
            averageRating: 3.5,
            timesOrdered: 36
        }
    },
    {
        name: 'CANELONES DE PISTO',
        type: 'Platos Únicos',
        ingredients: 'Pasta de canelones (9%), bechamel (leche entera, mantequilla, harina de trigo, sal, pimienta negra, nuez moscada), pisto (calabacín, pimiento verde, pimiento rojo, tomate reducido, sofrito de cebolla, pasta de tomate, vino blanco, oloroso, aceite de oliva, laurel, ajo asado, pimentón dulce, pimienta negra y comino) (48%) y queso de oveja curado (con leche pasteurizada).',
        category: 'Gratinado',
        weight: 475,
        price: 6.45,
        images: {
            finals: ['https://static.wetaca.com/products/487/detail/canelones-de-pisto_A.jpg',
                'https://static.wetaca.com/products/487/detail/canelones-de-pisto_B.jpg'],
            wip: ['https://static.wetaca.com/products/487/gallery/canelones-de-pisto_A.jpg',
                'https://static.wetaca.com/products/487/gallery/canelones-de-pisto_B.jpg',
                'https://static.wetaca.com/products/487/gallery/canelones-de-pisto_C.jpg']
        },
        description: 'Comenzamos sofriendo lentamente pimientos rojos y verdes junto con cebolla lenta y previamente sofreída. Incorporamos el calabacín y cocinamos lentamente hasta que obtenemos la textura tan característica de pisto. Rellenamos los canelones manualmente y los cubrimos con nuestra bechamel. Para gratinar incorporamos queso manchego.',
        allergens: {
            celery: false,
            gluten: true,
            crustaceans: false,
            eggs: false,
            fish: false,
            lupin: false,
            milk: true,
            molluscs: false,
            mustard: false,
            peanuts: false,
            sesame: false,
            soybeans: false,
            sulphurDioxide: false,
            sulphites: false,
        },
        nutritionalValues: {
            calories: 149.3,
            totalFats: 7.60,
            saturatedFat: 1.30,
            carbs: 14.40,
            protein: 5.50,
            sugar: 3.00,
            fiber: 1.00,
            sodium: 0.30
        },
        lastWeekInMenu: new Date(),
        popularity: {
            averageRating: 3.7,
            timesOrdered: 34
        }
    },
    {
        name: 'RIGATONI ALLA NORMA',
        type: 'Platos Únicos',
        ingredients: 'Pasta rigatoni (55%) y salsa (tomate reducido 70%, berenjena, sofrito de cebolla, caldo de verduras (agua, cebolla, zanahoria, puerro, apio, champiñones, perejil fresco, ajo pelado, aceite de oliva, jengibre fresco, sal y laurel), pimiento rojo, pasta de tomate, queso de oveja curado (con leche pasteurizada), ajo asado, salsa de soja, albahaca, vino blanco, oloroso, sal, pimienta negra, orégano y cayena).',
        category: 'Gratinado',
        weight: 550,
        price: 6.45,
        images: {
            finals: ['https://static.wetaca.com/products/474/detail/rigatoni-alla-norma_A.jpg',
                'https://static.wetaca.com/products/474/detail/rigatoni-alla-norma_B.jpg'],
            wip: ['https://static.wetaca.com/products/474/gallery/rigatoni-alla-norma_A.jpg',
                'https://static.wetaca.com/products/474/gallery/rigatoni-alla-norma_B.jpg',
                'https://static.wetaca.com/products/474/gallery/rigatoni-alla-norma_C.jpg']
        },
        description: 'Para esta salsa clásica italiana comenzamos asando berenjenas que incorporaremos a un sofrito de cebolla, ajos asados y albahaca que cocinamos lentamente. Incorporamos queso de oveja curado que da potencia y profundidad de sabores. La pasta adecuada son los rigatoni.',
        allergens: {
            celery: true,
            gluten: true,
            crustaceans: false,
            eggs: false,
            fish: false,
            lupin: false,
            milk: true,
            molluscs: false,
            mustard: false,
            peanuts: false,
            sesame: false,
            soybeans: true,
            sulphurDioxide: false,
            sulphites: false,
        },
        nutritionalValues: {
            calories: 140.80,
            totalFats: 2.80,
            saturatedFat: 0.70,
            carbs: 24.50,
            protein: 4.60,
            sugar: 3.10,
            fiber: 2.00,
            sodium: 0.40
        },
        lastWeekInMenu: new Date(),
        popularity: {
            averageRating: 4.4,
            timesOrdered: 30
        }
    },
    {
        name: 'SALMÓN CON PATATAS ASADAS',
        type: 'Platos Únicos',
        ingredients: 'Patatas asadas (patatas, aceite de oliva, ajo, sal, pimienta negra y romero) (54%), salmón (37%) y salsa (fumet tostado (agua, espina de pescado, cebolla, zanahoria, vino blanco, apio, vermut rojo, aceite de oliva, ajo pelado, perejil fresco, katsuobushi y sal), vino blanco, oloroso, ajo asado, sal, perejil fresco, laurel, pimienta negra y goma de maíz).',
        category: 'Pescado',
        weight: 460,
        price: 7.25,
        images: {
            finals: ['https://static.wetaca.com/products/718/detail/salmon-con-patatas-asadas_A.jpg',
                'https://static.wetaca.com/products/718/detail/salmon-con-patatas-asadas_B.jpg'],
            wip: ['https://static.wetaca.com/products/718/gallery/salmon-con-patatas-asadas_A.jpg',
                'https://static.wetaca.com/products/718/gallery/salmon-con-patatas-asadas_B.jpg',
                'https://static.wetaca.com/products/718/gallery/salmon-con-patatas-asadas_C.jpg']
        },
        description: 'Cocinamos el salmón a baja temperatura asegurándonos que quede cocido y a la vez jugoso. Acompañamos con una salsa ligera hecha a partir de espinas de pescado. Para rematar acompañamos con unas patatas aliñadas asadas.',
        allergens: {
            celery: true,
            gluten: false,
            crustaceans: false,
            eggs: false,
            fish: true,
            lupin: false,
            milk: false,
            molluscs: false,
            mustard: false,
            peanuts: false,
            sesame: false,
            soybeans: false,
            sulphurDioxide: false,
            sulphites: false,
        },
        nutritionalValues: {
            calories: 148.50,
            totalFats: 6.40,
            saturatedFat: 1.10,
            carbs: 11.00,
            protein: 11.30,
            sugar: 1.80,
            fiber: 1.30,
            sodium: 0.40
        },
        lastWeekInMenu: new Date(),
        popularity: {
            averageRating: 4.3,
            timesOrdered: 27
        }
    },
    {
        // frutos secos
        name: 'AJÍ DE POLLO CON ARROZ',
        type: 'Platos Únicos',
        ingredients: 'Pechuga de pollo (22%), salsa (sofrito de cebolla, caldo de pollo tostado (agua, carcasa de pollo, alitas de pollo, zanahoria, cebolla, aceite de oliva, ajo pelado, laurel y sal) leche entera, aceitunas negras pan de picos, queso grana padano (con leche no pasteurizada), almendra, pasta ají amarillo, sal y azafrán), aceitunas negras y arroz (con aceite de oliva, ajo, sal y pimienta) (46%).',
        category: 'Arroz',
        weight: 545,
        price: 6.45,
        images: {
            finals: ['https://static.wetaca.com/products/237/detail/aji-de-pollo-con-arroz_A.jpg',
                'https://static.wetaca.com/products/237/detail/aji-de-pollo-con-arroz_B.jpg'],
            wip: ['https://static.wetaca.com/products/237/gallery/aji-de-pollo-con-arroz_A.jpg',
                'https://static.wetaca.com/products/237/gallery/aji-de-pollo-con-arroz_B.jpg',
                'https://static.wetaca.com/products/237/gallery/aji-de-pollo-con-arroz_C.jpg']
        },
        description: 'Para este emblemático guiso peruano arrancamos la salsa sofriendo ajo, cebolla y pasta de ají amarillo con almendras. Añadimos leche, miga de pan, caldo de pollo y trituramos. Agregamos las pechugas de pollo y las guisamos para luego desmigarlas. Terminamos con una crema de aceitunas negras.',
        allergens: {
            celery: false,
            gluten: true,
            crustaceans: false,
            eggs: false,
            fish: false,
            lupin: false,
            milk: true,
            molluscs: false,
            mustard: false,
            peanuts: true,
            sesame: false,
            soybeans: false,
            sulphurDioxide: false,
            sulphites: false,
        },
        nutritionalValues: {
            calories: 160.90,
            totalFats: 5.90,
            saturatedFat: 1.10,
            carbs: 18.60,
            protein: 9.30,
            sugar: 0.60,
            fiber: 0.70,
            sodium: 0.60
        },
        lastWeekInMenu: new Date(),
        popularity: {
            averageRating: 3.2,
            timesOrdered: 21
        }
    },
    {
        name: 'POLLO CON SALSA BRAVA',
        type: 'Platos Únicos',
        ingredients: 'Contramuslo de pollo (31%), salsa (cebolla morada, caldo de jamón (hueso de jamón y agua), caldo de pollo tostado (agua, carcasa de pollo, alitas de pollo, zanahoria, cebolla, aceite de oliva, ajo pelado, laurel y sal), manteca de cerdo ibérico, jamón serrano, ajo confitado, sofrito de cebolla, vino blanco, oloroso, maicena, sal, pimentón dulce, pimentón picante y cayena) y patatas (patatas, aceite de oliva, ajo, sal, pimienta negra y romero).',
        category: 'Pollo',
        weight: 540,
        price: 6.45,
        images: {
            finals: ['https://static.wetaca.com/products/674/detail/pollo-con-salsa-brava_A.jpg',
                'https://static.wetaca.com/products/674/detail/pollo-con-salsa-brava_B.jpg'],
            wip: ['https://static.wetaca.com/products/674/gallery/pollo-con-salsa-brava_A.jpg',
                'https://static.wetaca.com/products/674/gallery/pollo-con-salsa-brava_B.jpg',
                'https://static.wetaca.com/products/674/gallery/pollo-con-salsa-brava_C.jpg']
        },
        description: 'Para esta salsa tan típica y tradicional comenzamos sofriendo jamón junto con cebolla y ajo confitado. incorporamos un poco de pimentón dulce y picante y una pizca de cayena para dar un extra de alegría. Cocinamos los contramuslos a alta temperatura en el horno asegurándonos que queden perfectamente cocidos y a la vez jugosos.',
        allergens: {
            celery: false,
            gluten: false,
            crustaceans: false,
            eggs: false,
            fish: false,
            lupin: false,
            milk: false,
            molluscs: false,
            mustard: false,
            peanuts: false,
            sesame: false,
            soybeans: false,
            sulphurDioxide: false,
            sulphites: false,
        },
        nutritionalValues: {
            calories: 149.70,
            totalFats: 6.50,
            saturatedFat: 1.90,
            carbs: 11.80,
            protein: 10.20,
            sugar: 2.10,
            fiber: 1.40,
            sodium: 0.40
        },
        lastWeekInMenu: new Date(),
        popularity: {
            averageRating: 3.7,
            timesOrdered: 25
        }
    },
    {
        name: 'PAVO CON ROMESCU VERDE, PATATAS ASADAS Y VERDURAS',
        type: 'Platos Únicos',
        ingredients: 'Pechuga de pavo (32,6%) con salsa romescu (pimiento verde, sofrito de cebolla, avellana, almendra, caldo de verduras (agua, cebolla, zanahoria, puerro, apio, champiñones, perejil, ajo, aceite de oliva, jengibre y laurel), aceite de oliva, perejil, ajo confitado, vinagre de manzana, miel, sal, pimienta negra y comino), patatas (25%), cebolla morada, zanahoria, puerro, judias verdes, pimiento rojo, pimiento amarillo, pimiento verde, aceite de oliva, ajo, pimienta negra y romero.',
        category: 'Pollo',
        weight: 460,
        price: 6.49,
        images: {
            finals: ['https://static.wetaca.com/products/793/detail/pavo-con-romescu-verde-patatas-asadas-y-verduras_A.jpg',
                'https://static.wetaca.com/products/793/detail/pavo-con-romescu-verde-patatas-asadas-y-verduras_B.jpg'],
            wip: ['https://static.wetaca.com/products/793/gallery/pavo-con-romescu-verde-patatas-asadas-y-verduras_A.jpg',
                'https://static.wetaca.com/products/793/gallery/pavo-con-romescu-verde-patatas-asadas-y-verduras_B.jpg',
                'https://static.wetaca.com/products/793/gallery/pavo-con-romescu-verde-patatas-asadas-y-verduras_C.jpg']
        },
        description: 'Cocinamos las pechugas de pavo a baja temperatura asegurándonos que queden jugosas. Para esta salsa tan particular comenzamos dorando los frutos secos a los que incorporamos perejil, pimiento verde asado y un golpe de vinagre. Para rematar el conjunto acompañamos con patatas asadas y un mix de verduras.',
        allergens: {
            celery: true,
            gluten: false,
            crustaceans: false,
            eggs: false,
            fish: false,
            lupin: false,
            milk: false,
            molluscs: false,
            mustard: false,
            peanuts: true,
            sesame: false,
            soybeans: false,
            sulphurDioxide: false,
            sulphites: false,
        },
        nutritionalValues: {
            calories: 125.10,
            totalFats: 5.50,
            saturatedFat: 0.60,
            carbs: 9.70,
            protein: 9.30,
            sugar: 3.10,
            fiber: 2.20,
            sodium: 0.50
        },
        lastWeekInMenu: new Date(),
        popularity: {
            averageRating: 3.7,
            timesOrdered: 25
        }
    },
    {
        name: 'PECHUGA MORUNA CON COUSCOUS',
        type: 'Platos Únicos',
        ingredients: 'Pechuga de pollo (43%), caldo de pollo tostado (agua, carcasa de pollo, alitas de pollo, zanahoria, cebolla, aceite de oliva, ajo pelado, laurel y sal), cous cous (25%), aceite de oliva, sal, especias morunas (cayena, comino, cúrcuma, jengibre, coriandro, canela, sal y pimienta) y menta.',
        category: 'Pollo',
        weight: 490,
        price: 6.49,
        images: {
            finals: ['https://static.wetaca.com/products/312/detail/pechuga-moruna-con-couscous_A.jpg',
                'https://static.wetaca.com/products/312/detail/pechuga-moruna-con-couscous_B.jpg'],
            wip: ['https://static.wetaca.com/products/312/gallery/pechuga-moruna-con-couscous_A.jpg',
                'https://static.wetaca.com/products/312/gallery/pechuga-moruna-con-couscous_B.jpg',
                'https://static.wetaca.com/products/312/gallery/pechuga-moruna-con-couscous_C.jpg']
        },
        description: 'Hacemos una mezcla de 18 especias y pasamos el pollo por ellas. Lo marcamos en plancha y termiamos en horno para asegurarnos un centro jugoso. Salseamos con caldo de pollo reducido infusionado con hierbabuena. Acompañamos con couscous.',
        allergens: {
            celery: false,
            gluten: true,
            crustaceans: false,
            eggs: false,
            fish: false,
            lupin: false,
            milk: false,
            molluscs: false,
            mustard: false,
            peanuts: false,
            sesame: false,
            soybeans: false,
            sulphurDioxide: false,
            sulphites: false,
        },
        nutritionalValues: {
            calories: 189.52,
            totalFats: 6.89,
            saturatedFat: 1.25,
            carbs: 17.98,
            protein: 13.76,
            sugar: 1.70,
            fiber: 1.54,
            sodium: 1.49
        },
        lastWeekInMenu: new Date(),
        popularity: {
            averageRating: 2.3,
            timesOrdered: 11
        }
    },
    {
        name: 'ARROZ MELOSO DE MARISCO',
        type: 'Platos Únicos',
        ingredients: 'Caldo de pescado roca (agua, cabezas de alistado, whisky, oloroso, pasta de tomate, ñoras, pimienta negra, laurel y eneldo), fumet blanco (agua, espina de pescado, cebolla, puerro, vino blanco, aceite de oliva, sal), sofrito (cebolla, pimiento rojo, puerro, pulpo, vino blanco, pasta de tomate, ajo confitado, ñoras, aceite de oliva, sal, cayena, pimienta negra), arroz carnarolli (35%), mejillones (46%), almejas (12%) y gambón (0,2%).',
        category: 'Arroz',
        weight: 480,
        price: 6.95,
        images: {
            finals: ['https://static.wetaca.com/products/404/detail/arroz-meloso-de-marisco_A.jpg',
                'https://static.wetaca.com/products/404/detail/arroz-meloso-de-marisco_B.jpg'],
            wip: ['https://static.wetaca.com/products/404/gallery/arroz-meloso-de-marisco_A.jpg',
                'https://static.wetaca.com/products/404/gallery/arroz-meloso-de-marisco_B.jpg',
                'https://static.wetaca.com/products/404/gallery/arroz-meloso-de-marisco_C.jpg']
        },
        description: 'Para el sofrito de este arroz cocinamos lentamente cebolla, pimientos rojos, ajo, pulpo y un poco de cayena para darle alegría. Incorporamos el arroz y mojamos con una mezcla de caldos hechos a base de espinas de pescado y cabezas de gambas. A último momento incorporamos mejillones, almejas y gambón para que sea una explosión de mar.',
        allergens: {
            celery: false,
            gluten: false,
            crustaceans: true,
            eggs: false,
            fish: true,
            lupin: false,
            milk: false,
            molluscs: true,
            mustard: false,
            peanuts: false,
            sesame: false,
            soybeans: false,
            sulphurDioxide: false,
            sulphites: false,
        },
        nutritionalValues: {
            calories: 138.80,
            totalFats: 3.90,
            saturatedFat: 0.70,
            carbs: 20.40,
            protein: 5.10,
            sugar: 1.20,
            fiber: 0.50,
            sodium: 1.10
        },
        lastWeekInMenu: new Date(),
        popularity: {
            averageRating: 4.6,
            timesOrdered: 48
        }
    },
    {
        name: 'TACOS DE VERDURAS',
        type: 'Platos Únicos',
        ingredients: 'Verduras (puerro, pimiento rojo, apio nabo, zanahoria) (62%), demi-glace vegetal (agua, hinojo, coliflor, zanahoria, shitake, champiñones, cebolla, remolacha, apionabo, brócoli, pasta de tomate, aceite de oliva, ajo pelado, apio, alga kombu) sofrito de cebolla, fior di latte (con leche no pasteurizada), pasta de tomate, pasta de soja amarilla, chipotles, sal, pimienta negra, comino y tortillas de trigo.',
        category: 'Internacional',
        weight: 435,
        price: 6.49,
        images: {
            finals: ['https://static.wetaca.com/products/371/detail/tacos-de-verduras_A.jpg',
                'https://static.wetaca.com/products/371/detail/tacos-de-verduras_B.jpg'],
            wip: ['https://static.wetaca.com/products/371/gallery/tacos-de-verduras_A.jpg',
                'https://static.wetaca.com/products/371/gallery/tacos-de-verduras_B.jpg',
                'https://static.wetaca.com/products/371/gallery/tacos-de-verduras_C.jpg']
        },
        description: 'Versionamos este plato típico de carne. Cocinamos las verduras cortadas muy finamente en un guiso de tomates y chipotle. Para completar este clásico de la cocina mexicana agregamos queso fundido. Acompañamos con tortillas de trigo.',
        allergens: {
            celery: true,
            gluten: true,
            crustaceans: false,
            eggs: false,
            fish: false,
            lupin: false,
            milk: true,
            molluscs: false,
            mustard: false,
            peanuts: false,
            sesame: false,
            soybeans: true,
            sulphurDioxide: false,
            sulphites: false,
        },
        nutritionalValues: {
            calories: 120.10,
            totalFats: 4.90,
            saturatedFat: 1.70,
            carbs: 15.70,
            protein: 3.70,
            sugar: 2.90,
            fiber: 1.40,
            sodium: 0.90
        },
        lastWeekInMenu: new Date(),
        popularity: {
            averageRating: 4.6,
            timesOrdered: 48
        }
    },
    {
        name: 'TACOS DE VERDURAS',
        type: 'Platos Únicos',
        ingredients: 'Verduras (puerro, pimiento rojo, apio nabo, zanahoria) (62%), demi-glace vegetal (agua, hinojo, coliflor, zanahoria, shitake, champiñones, cebolla, remolacha, apionabo, brócoli, pasta de tomate, aceite de oliva, ajo pelado, apio, alga kombu) sofrito de cebolla, fior di latte (con leche no pasteurizada), pasta de tomate, pasta de soja amarilla, chipotles, sal, pimienta negra, comino y tortillas de trigo.',
        category: 'Internacional',
        weight: 435,
        price: 6.49,
        images: {
            finals: ['https://static.wetaca.com/products/371/detail/tacos-de-verduras_A.jpg',
                'https://static.wetaca.com/products/371/detail/tacos-de-verduras_B.jpg'],
            wip: ['https://static.wetaca.com/products/371/gallery/tacos-de-verduras_A.jpg',
                'https://static.wetaca.com/products/371/gallery/tacos-de-verduras_B.jpg',
                'https://static.wetaca.com/products/371/gallery/tacos-de-verduras_C.jpg']
        },
        description: 'Versionamos este plato típico de carne. Cocinamos las verduras cortadas muy finamente en un guiso de tomates y chipotle. Para completar este clásico de la cocina mexicana agregamos queso fundido. Acompañamos con tortillas de trigo.',
        allergens: {
            celery: true,
            gluten: true,
            crustaceans: false,
            eggs: false,
            fish: false,
            lupin: false,
            milk: true,
            molluscs: false,
            mustard: false,
            peanuts: false,
            sesame: false,
            soybeans: true,
            sulphurDioxide: false,
            sulphites: false,
        },
        nutritionalValues: {
            calories: 120.10,
            totalFats: 4.90,
            saturatedFat: 1.70,
            carbs: 15.70,
            protein: 3.70,
            sugar: 2.90,
            fiber: 1.40,
            sodium: 0.90
        },
        lastWeekInMenu: new Date(),
        popularity: {
            averageRating: 4.6,
            timesOrdered: 48
        }
    },
    {
        name: 'ESTOFADO DE TERNERA AL VINO TINTO',
        type: 'Platos Únicos',
        ingredients: 'Morcillo de ternera (21,4%), zanahoria, champiñones, salsa (caldo de ternera (agua, huesos de ternera, morcillo, cebolla, zanahoria, puerro, aceite de oliva, apio, pasta de tomate, sal y laurel), vino tinto (5,6%), champiñones, ajo asado, grasa de vacuno, harina de trigo, pasta de tomate, vino oporto de bandeira (0,7%), sal, pimienta negra, romero y tomillo) y parmentier casero (patatas, leche entera, mantequilla y sal).',
        category: 'Carne',
        weight: 560,
        price: 6.75,
        images: {
            finals: ['https://static.wetaca.com/products/129/detail/estofado-de-ternera-al-vino-tinto_A.jpg',
                'https://static.wetaca.com/products/129/detail/estofado-de-ternera-al-vino-tinto_B.jpg'],
            wip: ['https://static.wetaca.com/products/129/gallery/estofado-de-ternera-al-vino-tinto_A.jpg',
                'https://static.wetaca.com/products/129/gallery/estofado-de-ternera-al-vino-tinto_B.jpg',
                'https://static.wetaca.com/products/129/gallery/estofado-de-ternera-al-vino-tinto_C.jpg']
        },
        description: 'Cortamos en dados jarrete de vaca y lo doramos hasta que coge color. Después lo estofamos durante más de 5 horas con verduras frescas hasta que quede súper tierno. Acompañamos con nuestra crema de patata y cítricos.',
        allergens: {
            celery: true,
            gluten: true,
            crustaceans: false,
            eggs: false,
            fish: false,
            lupin: false,
            milk: true,
            molluscs: false,
            mustard: false,
            peanuts: false,
            sesame: false,
            soybeans: false,
            sulphurDioxide: false,
            sulphites: false,
        },
        nutritionalValues: {
            calories: 127.90,
            totalFats: 6.40,
            saturatedFat: 3.50,
            carbs: 6.30,
            protein: 7.90,
            sugar: 1.60,
            fiber: 0.80,
            sodium: 0.30
        },
        lastWeekInMenu: new Date(),
        popularity: {
            averageRating: 4.6,
            timesOrdered: 48
        }
    },
    {
        name: 'ARROZ MELOSO DE PATO Y GORGONZOLA',
        type: 'Platos Únicos',
        ingredients: 'Caldo de pollo (agua, carcasa de pollo, alitas de pollo, zanahoria, cebolla, aceite de oliva, ajo pelado, laurel, sal), arroz carnarolli (41%), confit de pato (7%), setas en proporción variable: Seta de cardo, shitake, pholiota nameko, champiñón, vino blanco, oloroso, nata, pimientos del piquillo, sofrito de cebolla, grasa de pato, ajo tostado, queso emmental (con leche pasteurizada), queso gorgonzola (2%) (con leche pasteurizada), sal y romero.',
        category: 'Arroz',
        weight: 450,
        price: 6.95,
        images: {
            finals: ['https://static.wetaca.com/products/305/detail/arroz-meloso-de-pato-y-gorgonzola_A.jpg',
                'https://static.wetaca.com/products/305/detail/arroz-meloso-de-pato-y-gorgonzola_B.jpg'],
            wip: ['https://static.wetaca.com/products/305/gallery/arroz-meloso-de-pato-y-gorgonzola_A.jpg',
                'https://static.wetaca.com/products/305/gallery/arroz-meloso-de-pato-y-gorgonzola_B.jpg',
                'https://static.wetaca.com/products/305/gallery/arroz-meloso-de-pato-y-gorgonzola_C.jpg']
        },
        description: 'Empleamos la grasa del pato para el sofrito, al que agregamos ajos asados, setas y vino blanco. Agregamos hierbas, el confit desmigado y mojamos con caldo de ave. Para terminar añadimos pimientos del piquillo y crema de emmental y gorgonzola.',
        allergens: {
            celery: false,
            gluten: false,
            crustaceans: false,
            eggs: false,
            fish: false,
            lupin: false,
            milk: true,
            molluscs: false,
            mustard: false,
            peanuts: false,
            sesame: false,
            soybeans: false,
            sulphurDioxide: false,
            sulphites: false,
        },
        nutritionalValues: {
            calories: 210.50,
            totalFats: 10.84,
            saturatedFat: 2.78,
            carbs: 23.61,
            protein: 5.09,
            sugar: 2.87,
            fiber: 1.38,
            sodium: 0.81
        },
        lastWeekInMenu: new Date(),
        popularity: {
            averageRating: 4.6,
            timesOrdered: 48
        }
    },
    {
        name: 'GEMELLI CON SALSA SORRENTINA',
        type: 'Platos Únicos',
        ingredients: 'Pasta gemelli (48%) y salsa (tomate reducido 70%, tomates cherry, sofrito de cebolla, caldo de verduras (agua, cebolla, zanahoria, puerro, apio, champiñones, perejil fresco, ajo pelado, aceite de oliva, jengibre fresco, sal y laurel), pasta de tomate, queso parmesano (con leche pasteurizada), leche entera, fior di latte (con leche no pasteurizada), vino blanco, oloroso, ajo confitado, albahaca, sal y pimienta negra).',
        category: 'Pasta',
        weight: 515,
        price: 6.49,
        images: {
            finals: ['https://static.wetaca.com/products/519/detail/gemelli-con-salsa-sorrentina_A.jpg',
                'https://static.wetaca.com/products/519/detail/gemelli-con-salsa-sorrentina_B.jpg'],
            wip: ['https://static.wetaca.com/products/519/gallery/gemelli-con-salsa-sorrentina_A.jpg',
                'https://static.wetaca.com/products/519/gallery/gemelli-con-salsa-sorrentina_B.jpg',
                'https://static.wetaca.com/products/519/gallery/gemelli-con-salsa-sorrentina_C.jpg']
        },
        description: 'Para este clásico italiano sofreímos lentamente tomate junto con vino, ajo y albahaca. Los tomates cherrys aportan un contraste de textura. Hemos seleccionado una pasta que permite recoger una buena proporción de salsa en cada bocado.',
        allergens: {
            celery: true,
            gluten: true,
            crustaceans: false,
            eggs: false,
            fish: false,
            lupin: false,
            milk: true,
            molluscs: false,
            mustard: false,
            peanuts: false,
            sesame: false,
            soybeans: false,
            sulphurDioxide: false,
            sulphites: false,
        },
        nutritionalValues: {
            calories: 128.00,
            totalFats: 3.90,
            saturatedFat: 1.00,
            carbs: 19.60,
            protein: 3.60,
            sugar: 1.50,
            fiber: 0.30,
            sodium: 0.40
        },
        lastWeekInMenu: new Date(),
        popularity: {
            averageRating: 4.6,
            timesOrdered: 48
        }
    },
    {
        name: 'ALBÓNDIGAS SUECAS',
        type: 'Platos Únicos',
        ingredients: 'Albóndigas (carne picada de ternera, pan de molde, leche entera, aceite de oliva, ajo, sal, huevo, harina de trigo y proteína de soja) (22%), caldo de ternera (agua, huesos de ternera, morcillo, cebolla, zanahoria, puerro, aceite de oliva, apio, tomate, sal y laurel), mantequilla, harina de trigo, nata, salsa de soja, salsa perrins (vinagre de malta (cebada), vinagre de alcohol, melaza, azúcar, sal, anchoas, tamarindo, cebolla, ajo y especias), pimienta negra y crema de patata (patatas, leche entera, mantequilla, sal).',
        category: 'Carne',
        weight: 550,
        price: 6.75,
        images: {
            finals: ['https://static.wetaca.com/products/475/detail/albondigas-suecas_A.jpg',
                'https://static.wetaca.com/products/475/detail/albondigas-suecas_B.jpg'],
            wip: ['https://static.wetaca.com/products/475/gallery/albondigas-suecas_A.jpg',
                'https://static.wetaca.com/products/475/gallery/albondigas-suecas_B.jpg',
                'https://static.wetaca.com/products/475/gallery/albondigas-suecas_C.jpg']
        },
        description: 'Partimos haciendo una salsa con caldo reducido de ternera, nata y salsa Perrins en la que guisamos nuestras albóndigas de vacuno 100% artesanales. Para acompañar nada mejor que crema de patata.',
        allergens: {
            celery: true,
            gluten: true,
            crustaceans: false,
            eggs: true,
            fish: true,
            lupin: false,
            milk: true,
            molluscs: false,
            mustard: false,
            peanuts: false,
            sesame: false,
            soybeans: true,
            sulphurDioxide: false,
            sulphites: false,
        },
        nutritionalValues: {
            calories: 134.70,
            totalFats: 9.40,
            saturatedFat: 5.60,
            carbs: 6.80,
            protein: 5.30,
            sugar: 1.10,
            fiber: 0.30,
            sodium: 1.00
        },
        lastWeekInMenu: new Date(),
        popularity: {
            averageRating: 4.6,
            timesOrdered: 48
        }
    },
    {
        name: 'SOLOMILLO CON SALSA DE QUESO',
        type: 'Platos Únicos',
        ingredients: 'Solomillo de cerdo (29%), salsa (caldo de verduras (agua, cebolla, zanahoria, puerro, apio, champiñones, perejil fresco, ajo, aceite de oliva, jengibre, sal, laurel), queso parmesano (con leche pasteurizada) (3,2%), queso crema (con leche no pasteurizada) (2,5%), grana padano (con leche no pasteurizada) (2%), scamorza afumicatto (con leche pasteurizada) (1,1%), emmental (con leche pasteurizada) (1,1%), gorgonzola (con leche pasteurizada) (0,7%), queso azul (con leche no pasteurizada) (0,7%), vino blanco, pan de picos, estragón y pimienta negra) y patatas panadera (aceite de oliva, sal, ajo confitado, pimienta negra, orégano).',
        category: 'Carne',
        weight: 450,
        price: 7.45,
        images: {
            finals: ['https://static.wetaca.com/products/396/detail/solomillo-con-salsa-de-queso_A.jpg',
                'https://static.wetaca.com/products/396/detail/solomillo-con-salsa-de-queso_B.jpg'],
            wip: ['https://static.wetaca.com/products/396/gallery/solomillo-con-salsa-de-queso_A.jpg',
                'https://static.wetaca.com/products/396/gallery/solomillo-con-salsa-de-queso_B.jpg',
                'https://static.wetaca.com/products/396/gallery/solomillo-con-salsa-de-queso_C.jpg']
        },
        description: 'Cocinamos el lomo a baja temperatura para que quede jugoso. A partir de una mezcla 6 quesos hacemos una salsa a la que le incorporamos caldo de verduras para hacerlo más ligero. Incorporamos un poco de estragón que encaja perfectamente con el cerdo y el queso.',
        allergens: {
            celery: true,
            gluten: true,
            crustaceans: false,
            eggs: false,
            fish: false,
            lupin: false,
            milk: true,
            molluscs: false,
            mustard: false,
            peanuts: false,
            sesame: false,
            soybeans: false,
            sulphurDioxide: false,
            sulphites: false,
        },
        nutritionalValues: {
            calories: 152.40,
            totalFats: 5.50,
            saturatedFat: 2.20,
            carbs: 13.00,
            protein: 12.40,
            sugar: 2.30,
            fiber: 1.40,
            sodium: 0.70
        },
        lastWeekInMenu: new Date(),
        popularity: {
            averageRating: 4.6,
            timesOrdered: 48
        }
    },
    {
        name: 'MAGRO CON TOMATE',
        type: 'Platos Únicos',
        ingredients: 'Aguja de cerdo, patatas, tomate (12%), sofrito de cebolla, pimiento rojo, ñoras, ajo, aceite de oliva, agua, laurel, romero, azúcar blanco, sal, pimentón dulce, pimienta negra y orégano.',
        category: 'Carne',
        weight: 490,
        price: 7.25,
        images: {
            finals: ['https://static.wetaca.com/products/527/detail/magro-con-tomate_A.jpg',
                'https://static.wetaca.com/products/527/detail/magro-con-tomate_B.jpg'],
            wip: ['https://static.wetaca.com/products/527/gallery/magro-con-tomate_A.jpg',
                'https://static.wetaca.com/products/527/gallery/magro-con-tomate_B.jpg',
                'https://static.wetaca.com/products/527/gallery/magro-con-tomate_C.jpg']
        },
        description: 'Cocinamos el lomo de cerdo a baja temperatura para asegurarnos que quede perfectamente jugoso y en su punto. Para la salsa comenzamos sofriendo lentamente cebolla junto con pimiento rojo, ñoras y ajo. Infusionamos con romero, orégano y laurel.',
        allergens: {
            celery: false,
            gluten: false,
            crustaceans: false,
            eggs: false,
            fish: false,
            lupin: false,
            milk: false,
            molluscs: false,
            mustard: false,
            peanuts: false,
            sesame: false,
            soybeans: false,
            sulphurDioxide: false,
            sulphites: false,
        },
        nutritionalValues: {
            calories: 176.80,
            totalFats: 10.90,
            saturatedFat: 4.20,
            carbs: 8.40,
            protein: 11.40,
            sugar: 0.90,
            fiber: 0.10,
            sodium: 0.30
        },
        lastWeekInMenu: new Date(),
        popularity: {
            averageRating: 4.6,
            timesOrdered: 48
        }
    },
    {
        name: 'GRATINADO DE CARNE Y PATATA',
        type: 'Platos Únicos',
        ingredients: 'Puré de patata (patatas, leche entera, nata 36%, mantequilla, ajo asado, panko, sal, pimienta negra, nuez moscada) (55%), salsa (tomate reducido, carne picada de ternera (22%), sofrito de cebolla, zanahoria, vino tinto, apio, ajo confitado, laurel) (41%), panko, salsa perrins (vinagre de malta, vinagre de alcohol, melaza, azúcar, sal, anchoas, extracto de tamarindo, cebolla, ajo, especias), salsa de soja, sal, cayena, comino, pimienta negra, cheddar (con leche pasteurizada) y fior di latte (con leche no pasteurizada).',
        category: 'Gratinado',
        weight: 460,
        price: 6.49,
        images: {
            finals: ['https://static.wetaca.com/products/356/detail/gratinado-de-carne-y-patata_A.jpg',
                'https://static.wetaca.com/products/356/detail/gratinado-de-carne-y-patata_B.jpg'],
            wip: ['https://static.wetaca.com/products/356/gallery/gratinado-de-carne-y-patata_A.jpg',
                'https://static.wetaca.com/products/356/gallery/gratinado-de-carne-y-patata_B.jpg',
                'https://static.wetaca.com/products/356/gallery/gratinado-de-carne-y-patata_C.jpg']
        },
        description: 'Receta tradicional británica. Partimos de una base de carne picada con tomate cocinada a fuego lento, que se cubre de puré de patata y queso cheddar, gratinamos en el horno.',
        allergens: {
            celery: true,
            gluten: true,
            crustaceans: false,
            eggs: false,
            fish: true,
            lupin: false,
            milk: true,
            molluscs: false,
            mustard: false,
            peanuts: false,
            sesame: false,
            soybeans: true,
            sulphurDioxide: false,
            sulphites: false,
        },
        nutritionalValues: {
            calories: 151.90,
            totalFats: 5.70,
            saturatedFat: 2.50,
            carbs: 15.90,
            protein: 8.20,
            sugar: 4.70,
            fiber: 1.70,
            sodium: 1.30
        },
        lastWeekInMenu: new Date(),
        popularity: {
            averageRating: 4.6,
            timesOrdered: 48
        }
    },
    {
        name: 'LENTEJAS ESTOFADAS CON CHORIZO',
        type: 'Platos Únicos',
        ingredients: 'Puré de patata (patatas, leche entera, nata 36%, mantequilla, ajo asado, panko, sal, pimienta negra, nuez moscada) (55%), salsa (tomate reducido, carne picada de ternera (22%), sofrito de cebolla, zanahoria, vino tinto, apio, ajo confitado, laurel) (41%), panko, salsa perrins (vinagre de malta, vinagre de alcohol, melaza, azúcar, sal, anchoas, extracto de tamarindo, cebolla, ajo, especias), salsa de soja, sal, cayena, comino, pimienta negra, cheddar (con leche pasteurizada) y fior di latte (con leche no pasteurizada).',
        category: 'Legumbres',
        weight: 500,
        price: 5.95,
        images: {
            finals: ['https://static.wetaca.com/products/119/detail/lentejas-estofadas-con-chorizo_A.jpg',
                'https://static.wetaca.com/products/119/detail/lentejas-estofadas-con-chorizo_B.jpg'],
            wip: ['https://static.wetaca.com/products/119/gallery/lentejas-estofadas-con-chorizo_A.jpg',
                'https://static.wetaca.com/products/119/gallery/lentejas-estofadas-con-chorizo_B.jpg',
                'https://static.wetaca.com/products/119/gallery/lentejas-estofadas-con-chorizo_C.jpg']
        },
        description: 'Uno de nuestros clásicos. Partimos de un sofrito que trabajamos lentamente durante hora y media, añadimos chorizo de sarta previamente desgrasado y estofamos al “chup chup" las lentejas más de 4 horas. Súper melosas.',
        allergens: {
            celery: false,
            gluten: true,
            crustaceans: false,
            eggs: false,
            fish: false,
            lupin: false,
            milk: false,
            molluscs: false,
            mustard: false,
            peanuts: false,
            sesame: false,
            soybeans: false,
            sulphurDioxide: false,
            sulphites: true,
        },
        nutritionalValues: {
            calories: 128.41,
            totalFats: 5.22,
            saturatedFat: 0.41,
            carbs: 12.17,
            protein: 7.98,
            sugar: 1.30,
            fiber: 2.53,
            sodium: 1.18
        },
        lastWeekInMenu: new Date(),
        popularity: {
            averageRating: 4.6,
            timesOrdered: 48
        }
    },
    {
        name: 'POLLO ASADO A LA PERUANA',
        type: 'Platos Únicos',
        ingredients: 'Puré de patata (patatas, leche entera, nata 36%, mantequilla, ajo asado, panko, sal, pimienta negra, nuez moscada) (55%), salsa (tomate reducido, carne picada de ternera (22%), sofrito de cebolla, zanahoria, vino tinto, apio, ajo confitado, laurel) (41%), panko, salsa perrins (vinagre de malta, vinagre de alcohol, melaza, azúcar, sal, anchoas, extracto de tamarindo, cebolla, ajo, especias), salsa de soja, sal, cayena, comino, pimienta negra, cheddar (con leche pasteurizada) y fior di latte (con leche no pasteurizada).',
        category: 'Pollo',
        weight: 450,
        price: 6.95,
        images: {
            finals: ['https://static.wetaca.com/products/640/detail/pollo-asado-a-la-peruana_A.jpg',
                'https://static.wetaca.com/products/640/detail/pollo-asado-a-la-peruana_B.jpg'],
            wip: ['https://static.wetaca.com/products/640/gallery/pollo-asado-a-la-peruana_A.jpg',
                'https://static.wetaca.com/products/640/gallery/pollo-asado-a-la-peruana_B.jpg',
                'https://static.wetaca.com/products/640/gallery/pollo-asado-a-la-peruana_C.jpg']
        },
        description: 'Marinamos los muslos de pollo con una mezcla hecha a partir de ají panca, jengibre y especias. Cocinamos hasta que quede dorado y a la vez cocido y jugoso. Para las patatas hacemos un aderezo partiendo de la salsa huancaína, que en el conjunto logra un balance muy bueno.',
        allergens: {
            celery: false,
            gluten: true,
            crustaceans: false,
            eggs: false,
            fish: false,
            lupin: false,
            milk: true,
            molluscs: false,
            mustard: true,
            peanuts: false,
            sesame: false,
            soybeans: true,
            sulphurDioxide: false,
            sulphites: false,
        },
        nutritionalValues: {
            calories: 174.70,
            totalFats: 7.60,
            saturatedFat: 2.10,
            carbs: 13.10,
            protein: 12.60,
            sugar: 3.50,
            fiber: 1.30,
            sodium: 1.90
        },
        lastWeekInMenu: new Date(),
        popularity: {
            averageRating: 4.6,
            timesOrdered: 48
        }
    },
    {
        name: 'PASTA ALLA GRICIA',
        type: 'Platos Únicos',
        ingredients: 'Puré de patata (patatas, leche entera, nata 36%, mantequilla, ajo asado, panko, sal, pimienta negra, nuez moscada) (55%), salsa (tomate reducido, carne picada de ternera (22%), sofrito de cebolla, zanahoria, vino tinto, apio, ajo confitado, laurel) (41%), panko, salsa perrins (vinagre de malta, vinagre de alcohol, melaza, azúcar, sal, anchoas, extracto de tamarindo, cebolla, ajo, especias), salsa de soja, sal, cayena, comino, pimienta negra, cheddar (con leche pasteurizada) y fior di latte (con leche no pasteurizada).',
        category: 'Pasta',
        weight: 510,
        price: 6.49,
        images: {
            finals: ['https://static.wetaca.com/products/492/detail/pasta-alla-gricia_A.jpg',
                'https://static.wetaca.com/products/492/detail/pasta-alla-gricia_B.jpg'],
            wip: ['https://static.wetaca.com/products/492/gallery/pasta-alla-gricia_A.jpg',
                'https://static.wetaca.com/products/492/gallery/pasta-alla-gricia_B.jpg',
                'https://static.wetaca.com/products/492/gallery/pasta-alla-gricia_C.jpg']
        },
        description: 'Para esta salsa clásica de la zona del Lazio, comenzamos horneando bacón hasta que quede crujiente. Partiendo de agua de cocción de pasta, incorporamos abundante queso de oveja curado, el bacon horneado y pimienta negra.',
        allergens: {
            celery: false,
            gluten: true,
            crustaceans: false,
            eggs: false,
            fish: false,
            lupin: false,
            milk: true,
            molluscs: false,
            mustard: false,
            peanuts: false,
            sesame: false,
            soybeans: false,
            sulphurDioxide: false,
            sulphites: false,
        },
        nutritionalValues: {
            calories: 219.60,
            totalFats: 8.80,
            saturatedFat: 4.10,
            carbs: 27.00,
            protein: 7.50,
            sugar: 1.40,
            fiber: 1.40,
            sodium: 0.60
        },
        lastWeekInMenu: new Date(),
        popularity: {
            averageRating: 4.6,
            timesOrdered: 48
        }
    },
    {
        name: 'SALMÓN CON HUMMUS',
        type: 'Platos Únicos',
        ingredients: 'Hummus (garbanzos, agua, sofrito de cebolla, aceite de oliva, zumo de limón, ajo, sal, tahini, cilantro, comino y pimentón dulce) (54%), salmón (37%) y salsa (fumet tostado (agua, espina de pescado, cebolla, zanahoria, vino blanco, apio, vermut rojo, aceite de oliva, ajo pelado, perejil fresco, katsuobushi y sal), vino blanco, oloroso, ajo asado, sal, perejil fresco, laurel, pimienta negra y goma de maíz).',
        category: 'Pescado',
        weight: 460,
        price: 7.45,
        images: {
            finals: ['https://static.wetaca.com/products/553/detail/salmon-con-hummus_A.jpg',
                'https://static.wetaca.com/products/553/detail/salmon-con-hummus_B.jpg'],
            wip: ['https://static.wetaca.com/products/553/gallery/salmon-con-hummus_A.jpg',
                'https://static.wetaca.com/products/553/gallery/salmon-con-hummus_B.jpg',
                'https://static.wetaca.com/products/553/gallery/salmon-con-hummus_C.jpg']
        },
        description: 'Cocinamos el salmón a baja temperatura asegurándonos que quede perfectamente cocido y la a vez jugoso, incorporamos una salsa ligera hecha a partir de espinas de pescado y verduras. Para acompañar, en este caso, nuestro clásico hummus.',
        allergens: {
            celery: true,
            gluten: false,
            crustaceans: false,
            eggs: false,
            fish: true,
            lupin: false,
            milk: false,
            molluscs: false,
            mustard: false,
            peanuts: false,
            sesame: true,
            soybeans: false,
            sulphurDioxide: false,
            sulphites: false,
        },
        nutritionalValues: {
            calories: 166.70,
            totalFats: 10.10,
            saturatedFat: 1.70,
            carbs: 6.10,
            protein: 12.20,
            sugar: 1.00,
            fiber: 1.80,
            sodium: 0.90
        },
        lastWeekInMenu: new Date(),
        popularity: {
            averageRating: 4.6,
            timesOrdered: 48
        }
    },
    {
        name: 'MERLUZA EN SALSA VERDE',
        type: 'Platos Únicos',
        ingredients: 'Merluza (31%), patatas (aceite de oliva, sal, ajo confitado, pimienta negra y orégano) y salsa (fumet blanco (agua, espina de pescado, cebolla, puerro, vino blanco, aceite de oliva, sal), aceite de oliva, vino blanco, oloroso río viejo, perejil, ajo confitado, sal, laurel, goma de maíz y cayena).',
        category: 'Pescado',
        weight: 470,
        price: 7.45,
        images: {
            finals: ['https://static.wetaca.com/products/248/detail/merluza-en-salsa-verde_A.jpg',
                'https://static.wetaca.com/products/248/detail/merluza-en-salsa-verde_B.jpg'],
            wip: ['https://static.wetaca.com/products/248/gallery/merluza-en-salsa-verde_A.jpg',
                'https://static.wetaca.com/products/248/gallery/merluza-en-salsa-verde_B.jpg',
                'https://static.wetaca.com/products/248/gallery/merluza-en-salsa-verde_C.jpg']
        },
        description: 'Un lomo de merluza, limpio de espinas y listo para comer, cocinado a baja temperatura, acompañado de patatas y una salsa verde de su fumet. Terminamos con perejil fresco y un chorrito de aceite de oliva.',
        allergens: {
            celery: false,
            gluten: false,
            crustaceans: false,
            eggs: false,
            fish: true,
            lupin: false,
            milk: false,
            molluscs: false,
            mustard: false,
            peanuts: false,
            sesame: false,
            soybeans: false,
            sulphurDioxide: false,
            sulphites: false,
        },
        nutritionalValues: {
            calories: 147.20,
            totalFats: 7.90,
            saturatedFat: 1.40,
            carbs: 11.20,
            protein: 6.20,
            sugar: 1.90,
            fiber: 1.40,
            sodium: 0.50
        },
        lastWeekInMenu: new Date(),
        popularity: {
            averageRating: 4.6,
            timesOrdered: 48
        }
    },
    {
        name: 'ALBÓNDIGAS THAI DE POLLO',
        type: 'Platos Únicos',
        ingredients: 'Albóndigas de pollo (pollo (67%), agua, pan rallado, harina de trigo, clara de huevo y leche) (21,4%), caldo de pollo tostado (agua, carcasa de pollo, alitas de pollo, zanahoria, cebolla, aceite de oliva, ajo pelado, laurel y sal) , batata, curry (leche coco infusionada (leche de coco, jengibre fresco, lemongrass, hoja lima-kaffir), zumo de limón, ajo confitado, salsa de soja, fish sauce, albahaca, cilantro y sal), puerro, sofrito de cebolla, pimiento verde, ajo asado, aceite de oliva, pieles de pollo, pasta de curry verde, avellana, aceite de sésamo y arroz (arroz, aceite de oliva, agua, ajo confitado, sal y pimienta negra).',
        category: 'Pollo',
        weight: 560,
        price: 6.95,
        images: {
            finals: ['https://static.wetaca.com/products/690/detail/albondigas-thai-de-pollo_A.jpg',
                'https://static.wetaca.com/products/690/detail/albondigas-thai-de-pollo_B.jpg'],
            wip: ['https://static.wetaca.com/products/690/gallery/albondigas-thai-de-pollo_A.jpg',
                'https://static.wetaca.com/products/690/gallery/albondigas-thai-de-pollo_B.jpg',
                'https://static.wetaca.com/products/690/gallery/albondigas-thai-de-pollo_C.jpg']
        },
        description: 'Para la base de estas albóndigas comenzamos sofriendo lentamente puerro junto con pimientos y boniato. Incorporamos pasta de curry verde, avellanas y mojamos con leche de coco. Para potenciar el sabor usamos nuestro caldo de pollo tostado. Cocinamos las albóndigas dentro de esta salsa para que se empapen de todo el sabor. Para rematar unas verduras cocidas al vapor y arroz largo.',
        allergens: {
            celery: false,
            gluten: true,
            crustaceans: false,
            eggs: true,
            fish: true,
            lupin: false,
            milk: true,
            molluscs: false,
            mustard: false,
            peanuts: true,
            sesame: true,
            soybeans: true,
            sulphurDioxide: false,
            sulphites: false,
        },
        nutritionalValues: {
            calories: 150.00,
            totalFats: 5.10,
            saturatedFat: 1.10,
            carbs: 20.90,
            protein: 5.90,
            sugar: 1.50,
            fiber: 0.90,
            sodium: 0.50
        },
        lastWeekInMenu: new Date(),
        popularity: {
            averageRating: 4.6,
            timesOrdered: 48
        }
    },
    {
        name: 'POLLO EN SALMOREJO CANARIO',
        type: 'Platos Únicos',
        ingredients: 'Contramuslo de pollo (31%), salsa (caldo de pollo tostado (agua, carcasa de pollo, zanahoria, cebolla, alitas de pollo, aceite de oliva, ajo, laurel y sal), sofrito de cebolla, vino blanco, oloroso, pan de picos, pimienta negra, orégano, pimentón dulce, tomillo, comino y cayena) y verduras (batata, calabaza, zanahoria, sofrito de cebolla, caldo de verdura (agua, cebolla, zanahoria, puerro, apio, champiñones, perejil fresco, ajo pelado, aceite de oliva, jengibre fresco, sal, laurel), ajo confitado, aceite de oliva, sal orégano y pimienta negra).',
        category: 'Pollo',
        weight: 540,
        price: 6.49,
        images: {
            finals: ['https://static.wetaca.com/products/524/detail/pollo-en-salmorejo-canario_A.jpg',
                'https://static.wetaca.com/products/524/detail/pollo-en-salmorejo-canario_B.jpg'],
            wip: ['https://static.wetaca.com/products/524/gallery/pollo-en-salmorejo-canario_A.jpg',
                'https://static.wetaca.com/products/524/gallery/pollo-en-salmorejo-canario_B.jpg',
                'https://static.wetaca.com/products/524/gallery/pollo-en-salmorejo-canario_C.jpg']
        },
        description: 'Para este clásico de la cocina canaria, comenzamos cocinando el pollo a alta temperatura asegurándonos que quede dorado, cocido y jugoso. Para la salsa sofreímos lentamente cebolla junto con ajo confitado, tomillo, comino y pimentón. Mojamos con caldo de pollo.',
        allergens: {
            celery: true,
            gluten: true,
            crustaceans: false,
            eggs: false,
            fish: false,
            lupin: false,
            milk: false,
            molluscs: false,
            mustard: false,
            peanuts: false,
            sesame: false,
            soybeans: false,
            sulphurDioxide: false,
            sulphites: false,
        },
        nutritionalValues: {
            calories: 125.00,
            totalFats: 4.50,
            saturatedFat: 1.20,
            carbs: 10.50,
            protein: 9.70,
            sugar: 3.50,
            fiber: 2.20,
            sodium: 0.70
        },
        lastWeekInMenu: new Date(),
        popularity: {
            averageRating: 4.6,
            timesOrdered: 48
        }
    }
]

Meal.create(meals)
    .then(mealsFromDB => {
        console.log(`He creado ${mealsFromDB.length} pelis`)
        mongoose.connection.close()
    })
    .catch(err => console.log(`An error occurred while creating books from the DB: ${err}`))