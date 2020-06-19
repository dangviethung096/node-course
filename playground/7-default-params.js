const greeter = (name = 'Hung', age = 12) => {
    console.log('Hello ' + name)
    console.log('Age: ' + age)
}

greeter('World')

greeter()