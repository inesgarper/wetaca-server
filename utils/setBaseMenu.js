const setBaseMenu = (order) => {

    const baseMenu = {
        meals: {
            total: 0,
            perCategory: {
                meat: 0,
                chicken: 0,
                fish: 0,
                pasta: 0,
                rice: 0,
                gratinated: 0,
                legume: 0,
                international: 0,
                veggie: 0,
                starter: 0,
                full: 0,
                light: 0,
                dessert: 0
            }
        },
        maxPrice: order.price
    }

    order.meals.forEach(meal => {

        baseMenu.meals.total += meal.quantity

        for (let i = 0; i < meal.quantity; i++) {

            switch (meal.mealID.category) {
                case 'Carne':
                    baseMenu.meals.perCategory.meat++
                    break
                case 'Pollo':
                    baseMenu.meals.perCategory.chicken++
                    break
                case 'Pescado':
                    baseMenu.meals.perCategory.fish++
                    break
                case 'Pasta':
                    baseMenu.meals.perCategory.pasta++
                    break
                case 'Gratinado':
                    baseMenu.meals.perCategory.gratinated++
                    break
                case 'Arroz':
                    baseMenu.meals.perCategory.rice++
                    break
                case 'Legumbres':
                    baseMenu.meals.perCategory.legume++
                    break
                case 'Internacional':
                    baseMenu.meals.perCategory.international++
                    break
                case 'Veggie':
                    baseMenu.meals.perCategory.veggie++
                    break
                case 'Entrante':
                    baseMenu.meals.perCategory.starter++
                    break
                case 'Completo':
                    baseMenu.meals.perCategory.full++
                    break
                case 'Ligero':
                    baseMenu.meals.perCategory.light++
                    break
                case 'Postre':
                    baseMenu.meals.perCategory.dessert++
                    break
            }
        }
    })

    return baseMenu
}

export default setBaseMenu