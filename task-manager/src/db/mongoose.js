const mongoose = require('mongoose')

mongoose.connect('mongodb+srv://hungdeptrai:hungdeptrai@cluster0.d4mh3.gcp.mongodb.net/task-manager?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
})



