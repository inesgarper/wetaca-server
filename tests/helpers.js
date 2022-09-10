const user = {
    role: "ADMIN",
    name: "Test",
    lastName: "User",
    email: "testuser@gmail.com",
    password: "$2a$10$4U6JBdyhmwmvZfd3Qq9IfOtJM5lFCt7rEe6DrzS7Lj4yoiXNxs69K",
    phoneNumber: 123456789,
    birthDate: "11-11-1111",
}

const initialMeals = [
    {
        name: 'QUESADA PASIEGA',
        type: 'Postres',
        ingredients: 'Requesón (con leche pasteurizada), azúcar blanco, huevo, mantequilla, yema, harina de trigo, yogur, limón, impulsor y canela.',
        category: 'dessert',
        weight: '180',
        price: 2.99,
        images: {
            finals: ['https://static.wetaca.com/products/518/detail/quesada-pasiega_A.jpg',
                'https://static.wetaca.com/products/518/detail/quesada-pasiega_B.jpg'],
            wip: ['https://static.wetaca.com/products/518/gallery/quesada-pasiega_A.jpg',
                'https://static.wetaca.com/products/518/gallery/quesada-pasiega_B.jpg',
                'https://static.wetaca.com/products/518/gallery/quesada-pasiega_C.jpg'],
        },
        description: 'Para este tradicional postre cántabro trituramos el huevo junto con el azúcar. Incorporamos el requesón y perfumamos con ron, piel de limón y canela. Horneamos hasta obtener un bonito color dorado.',
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
            soybeans: false,
            sulphurDioxide: false,
            sulphites: false,
        },
        nutritionalValues: {
            calories: 253.90,
            totalFats: 14.90,
            saturatedFat: 8.60,
            carbs: 22.50,
            protein: 8.70,
            sugar: 21.80,
            fiber: 0.10,
            sodium: 0.10
        },
        lastWeekInMenu: new Date(),
        averageRating: 3
    },
    {
        name: 'NATILLAS CASERAS',
        type: 'Postres',
        ingredients: 'Leche entera, yema de huevo, azúcar, maicena, limón, naranja, canela en rama, sal y hojas de gelatina.',
        category: 'dessert',
        weight: '215',
        price: 3.75,
        images: {
            finals: ['https://static.wetaca.com/products/385/detail/natillas-caseras_A.jpg',
                'https://static.wetaca.com/products/385/detail/natillas-caseras_B.jpg'],
            wip: ['https://static.wetaca.com/products/385/gallery/natillas-caseras_A.jpg',
                'https://static.wetaca.com/products/385/gallery/natillas-caseras_B.jpg',
                'https://static.wetaca.com/products/385/gallery/natillas-caseras_C.jpg'],
        },
        description: 'Fusionamos durante toda la noche la leche con piel de naranja, piel de limón y rama de canela. Cocinamos a fuego suave la leche infusionada con yemas de huevo y un poco de maicena hasta lograr la textura perfecta.',
        allergens: {
            celery: false,
            gluten: false,
            crustaceans: false,
            eggs: true,
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
            calories: 155.60,
            totalFats: 7.40,
            saturatedFat: 3.10,
            carbs: 17.20,
            protein: 4.80,
            sugar: 14.70,
            fiber: 0.10,
            sodium: 0.20
        },
        lastWeekInMenu: new Date(),
        averageRating: 3
    }
]

module.exports = { user, initialMeals }

// Al crear el usuario, hay que update el role a admin, y guardar su id en una variable para pasarla al ctx