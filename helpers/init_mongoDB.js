const mongoose = require('mongoose');

//eastablishing mongoose connection
mongoose.connect('mongodb://127.0.0.1:27017', {
  dbName: 'fresh_api',
  useNewUrlParser: true,
  useUnifiedTopology: true,
  // useFindAndModify: false,
  // useCreateIndex: true
})    
.then(()=>{
    console.log('mongodb connected')
})
.catch((err)=> console.log(err.message));

mongoose.connection
.on('connected', ()=>{   //when mongoose connected
    console.log('Mongoose connected to db')
})
.on('error', (err)=>{    //on mongoose connection error
    console.log(err.message)
})
.on('disconnected', ()=>{    //on mongoose disconnection
    console.log('Mongoose connection is disconnected')
});

process.on('SIGINT', async()=>{
    await mongoose.connection.close();
    process.exit(0)
});