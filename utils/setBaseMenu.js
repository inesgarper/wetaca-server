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
                case 'meat':
                    baseMenu.meals.perCategory.meat++
                    break
                case 'chicken':
                    baseMenu.meals.perCategory.chicken++
                    break
                case 'fish':
                    baseMenu.meals.perCategory.fish++
                    break
                case 'pasta':
                    baseMenu.meals.perCategory.pasta++
                    break
                case 'gratinated':
                    baseMenu.meals.perCategory.gratinated++
                    break
                case 'rice':
                    baseMenu.meals.perCategory.rice++
                    break
                case 'legume':
                    baseMenu.meals.perCategory.legume++
                    break
                case 'international':
                    baseMenu.meals.perCategory.international++
                    break
                case 'veggie':
                    baseMenu.meals.perCategory.veggie++
                    break
                case 'starter':
                    baseMenu.meals.perCategory.starter++
                    break
                case 'full':
                    baseMenu.meals.perCategory.full++
                    break
                case 'light':
                    baseMenu.meals.perCategory.light++
                    break
                case 'dessert':
                    baseMenu.meals.perCategory.dessert++
                    break
            }
        }
    })

    return baseMenu
}

export default setBaseMenu