const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URL || 'mongodb+srv://sachingurh:sachin1203@cluster0.9gmddot.mongodb.net/?retryWrites=true&w=majority', {
    // useNewUrlParser: true,
    // useCreateIndex: true, 
    // useFindAndModify: false,
    // useUnifiedTopology: true
});
