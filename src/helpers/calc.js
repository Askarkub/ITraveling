export const calcSubPrice = (item) => {
    return item.count * item.place.price
}

export const calcTotalPrice = (places) => {
    let totalPrice = 0;
    places.forEach(item => {
        totalPrice += item.SubPrice
    })
    return totalPrice
}