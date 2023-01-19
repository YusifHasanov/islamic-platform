const mongoose = require('mongoose');


const dbConnection = async () => {
    try {
        mongoose.set('strictQuery', true);
        await mongoose.connect(process.env.DB_CNN, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

    } catch (error) {
        console.log(error);
    }
}

module.exports = dbConnection

