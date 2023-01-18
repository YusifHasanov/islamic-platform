const mongoose = require('mongoose');


const dbConnection = async () => {
    try {
        mongoose.set('strictQuery', true);
        await mongoose.connect("mongodb+srv://yusif:yusif123@database.uc0npof.mongodb.net/?retryWrites=true&w=majority", {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

    } catch (error) {
        console.log(error);
    }
}

module.exports = dbConnection

