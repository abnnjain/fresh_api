const mongoose = require('mongoose');
const { buffer } = require('stream/consumers');

try {
//eastablishing mongoose connection
mongoose.connect('mongodb://127.0.0.1:27017', {
  dbName: 'fresh_api',
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 30000,
  // useFindAndModify: false,
  // useCreateIndex: true
})    
} catch (error) {
    console.error('Error connecting to MongoDB:', error);
}
// .then(()=>{
//     console.log('mongodb connected')
// })
// .catch((err)=> console.log(err.message));

//when mongoose connected
mongoose.connection.on('connected', ()=>{
    console.log('Mongoose connected to db')
});

//on mongoose connection error
mongoose.connection.on('error', (err)=>{
    console.log(err.message)
});

//on mongoose disconnection
mongoose.connection.on('disconnected', ()=>{
    console.log('Mongoose connection is disconnected')
});
process.on('SIGINT', async()=>{
    await mongoose.connection.close();
    process.exit(0)
});