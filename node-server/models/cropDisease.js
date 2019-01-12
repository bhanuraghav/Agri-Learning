var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
    
userSchema = new Schema({
    cropName: String,
    name: String,
    symptoms : [String],
    diseaseCycle : String,
    fertilizers : [{
        name : String,
        link : String
    }]
});

module.exports = mongoose.model('diseases', userSchema);