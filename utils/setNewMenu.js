const setNewMenu = (mealsCurrentlyInMenu, newMealsInMenu) => {

    mealsCurrentlyInMenu.forEach(async (meal) => {
        meal.currentlyInMenu = false
        await meal.save()
    })

    newMealsInMenu.forEach(async (meal) => {
        meal.nextWeekInMenu = false
        meal.currentlyInMenu = true
        meal.lastWeekInMenu = new Date()
        await meal.save()
    })

    return newMealsInMenu

}

export default setNewMenu