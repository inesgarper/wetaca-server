const calculatePortionNutritionalValues = (meal) => {

    const nutritionalValuesPerPortion = {}
    const nutritionalValuesPer100g = Object.entries(meal.nutritionalValues)

    nutritionalValuesPer100g.forEach(([key, value]) => {
        nutritionalValuesPerPortion[key] = parseFloat((value * (meal.weight / 100)).toFixed(2))
    })

    return nutritionalValuesPerPortion

}

export default calculatePortionNutritionalValues