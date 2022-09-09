const calculateDeliveryDate = (deliveryWeekDay) => {

    if (deliveryWeekDay === 0) deliveryWeekDay = 7

    const todayDate = new Date()
    const todayWeekDay = todayDate.getDay()

    let daysToDeliver = deliveryWeekDay - todayWeekDay

    if (daysToDeliver < 0) daysToDeliver = 7 + daysToDeliver

    return new Date(todayDate.setDate(todayDate.getDate() + daysToDeliver))

}

export default calculateDeliveryDate