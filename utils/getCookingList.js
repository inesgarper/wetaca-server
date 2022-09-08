export const getCookingList = (orders) => {

    const cookingList = []

    orders.forEach(order => {
        order.meals.forEach(meal => {

            const mealInCookingList = cookingList.find(elm => elm.meal.name === meal.mealID.name)

            if (mealInCookingList) {
                mealInCookingList.quantity += meal.quantity
            } else {
                cookingList.push({
                    meal: meal.mealID,
                    quantity: meal.quantity
                })
            }
        })
    })

    return cookingList
}