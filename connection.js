const mongoose = require ('mongoose');

// mongoose.set('strictQuery', true);
mongoose.set('strictQuery', false);


const connectionParams = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}

const uri = `mongodb+srv://kshelja:Kamaljit2@webdevelopment.zas5v26.mongodb.net/?retryWrites=true&w=majority`

const connexion = mongoose.connect(uri, connectionParams).then(()=> console.log('connected to cloud atlas'))
.catch((err)=> console.log(err));

module.exports = connexion