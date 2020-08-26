const config = {
    production:{
        SECRET: process.env.SECRET,
        DATABASE: process.env.MONGODB_URI
    },
    default:{
        SECRET: 'SUPERSECRETPASSWORD123',
        // DATABASE: 'mongodb://localhost:27017/impdet'
        DATABASE: 'mongodb://root:abegunde24@127.0.0.1:27017/impdet?authSource=admin'
    }
}

// not neccesary
// const mongoURI = 'mongodb://root:abegunde24@127.0.0.1:27017/impdet'
// const db = mongoose.connect(mongoURI, {
//     useNewUrlParser: true
// })

exports.get = function get(env){
    return config[env] || config.default
} 