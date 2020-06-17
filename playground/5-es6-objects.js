

// const name = 'Johanson'
// const userAge = 27

// const user = {
//     name,
//     userAge,
//     location: 'Ha Noi',
// }

// console.log(user)

// Object destructuring

const product = {
    label: 'Red notebook',
    price: 3,
    stock: 201,
    salePrice: undefined,
    owner: {
        name: 'Hung',
        age: 23
    }, 
    rating: 4.2
}


// const label = product.label
// const stock = product.stock

// const {label: productLabel, owner, rating = 5} = product

// console.log(productLabel)
// console.log(rating)

const { age = 10 } = product

console.log(age)

// const transaction = (type, { label, stock }) => {
//     console.log(type, label, stock)
// }

// transaction('order', product) 