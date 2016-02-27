var mongoose = require('mongoose');

var countrySchema = new Schema({
    name: String,
    population: String
});

var citySchema = new Schema({
    name: String,
    country: { type: Schema.ObjectId, ref: 'Country'}
});

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
    header_image : {
        type: String
    },
    background_color: {
        type: String
    },
    acent_color: {
        type: String
    },
    location : {type: [Number], index: '2d'},
    category : { type: mongoose.Schema.ObjectId, ref: 'Category' },
    owner: { type: mongoose.Schema.ObjectId, ref: 'User' },
    value :[{
        tittle : {type:String},
        description : {type:String},
        value_without_tax: { type : Number, required: true},
        tiket_service: { type : Number, required: true},
        quantity : {type: Number}
    }],
    keywords : [{type: String}],
    country :  { type: mongoose.Schema.ObjectId, ref: 'Country' },
    city :   { type: mongoose.Schema.ObjectId, ref: 'City' },
    address = {
        type: String
    },
    date: { type: Date, default: Date.now },
});

mongoose.model('Country',countrySchema);
mongoose.model('City',citySchema);
mongoose.model('Category',categorySchema);
mongoose.model('Event',eventSchema);