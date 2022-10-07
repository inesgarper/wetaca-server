const formatMealsByType = (meals) => {

    const sortedMeals = {
        unique: [],
        light: [],
        full: [],
        veggie: [],
        starter: [],
        dessert: []
    }

    meals.forEach(meal => {
        switch (meal.type) {
            case 'Platos Únicos':
                sortedMeals.unique.push(meal)
                break
            case 'Platos Ligeros':
                sortedMeals.light.push(meal)
                break
            case 'Platos Completos':
                sortedMeals.full.push(meal)
                break
            case 'Veggie':
                sortedMeals.veggie.push(meal)
                break
            case 'Entrantes':
                sortedMeals.starter.push(meal)
                break
            case 'Postres':
                sortedMeals.dessert.push(meal)
                break
        }
    })

    return sortedMeals
}

export default formatMealsByType