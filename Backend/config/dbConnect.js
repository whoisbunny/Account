const mongoose = require('mongoose');
const url = process.env.MONGODB_STRING;


module.exports.dbConnect = ()=>{
    mongoose.connect(url).then(()=>{
        console.log("Connect success");
    }).catch(err=>{
        console.log(err);
    });
}
