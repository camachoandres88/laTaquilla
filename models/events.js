var mongoose = require('mongoose');

var categorySchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: true
    }	
});

var eventSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description : {
        type: String,
        required: true
    },
    category : { type: mongoose.Schema.ObjectId, ref: 'Category' },
    owner: { type: mongoose.Schema.ObjectId, ref: 'User' },
    value :{
        value_without_tax: { type : Number, required: true},
        tiket_service: { type : Number, required: true}
    },
    keywords : [{type: String}]
});

mongoose.model('Category',categorySchema);
mongoose.model('Event',eventSchema);