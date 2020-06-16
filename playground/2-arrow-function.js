// const square = function (x) {
//     return x * x
// }


// const square = (x) =>  x * x

// const square = (x) => x * x

// console.log(square(2))

const event = {
    name: 'Aniversary',
    printGuestList: () => {
        console.log('Guest list for ' + this.name)
    }
}

event.printGuestList()