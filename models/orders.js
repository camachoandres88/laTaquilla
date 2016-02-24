var mongoose = require('mongoose');

var cartDetailSchema = new mongoose.Schema({
    cart: { type: mongoose.Schema.ObjectId, ref: 'Cart' },    
    event: { type: mongoose.Schema.ObjectId, ref: 'Event' },
    ticket: { type: mongoose.Schema.ObjectId, ref: 'Ticket' },
    created_at: {type: Date, default: Date.now},
    modified_at : {type: Date, default: Date.now},
    quantity : {type: Number, required: true},
    claimants : [{
        identification: { type: String, required: true},
        name : { type: String, required: true}
    }],
    value :{
        without_tax: { type : Number, required: true},
        tiket_service: { type : Number, required: true},
        tax: { type : Number, required: true}
    },
    owner: { type: mongoose.Schema.ObjectId, ref: 'User' }
});

cartDetailSchema.virtual('total_amount')
    .get(function () {
        return this.value.without_tax + this.value.tiket_service + this.value.tax;
});

var cartSchema = new mongoose.Schema({   
    created_at: {type: Date, default: Date.now},
    modified_at : {type: Date, default: Date.now},
    total_amount : {type: Number},
    client :{ type: mongoose.Schema.ObjectId, ref: 'User' },
    detail: [cartDetailSchema],
    order:  { type: mongoose.Schema.ObjectId, ref: 'Order' },
});

var orderStatusSchema = new mongoose.Schema({   
    created_at: {type: Date, default: Date.now},
    modified_at : {type: Date, default: Date.now},
    name: {type: String,unique: true,required: true} 
});

var ticketStatusSchema = new mongoose.Schema({   
    created_at: {type: Date, default: Date.now},
    modified_at : {type: Date, default: Date.now},
    name: {type: String,unique: true,required: true} 
});

var claimantsSchema =  new mongoose.Schema({   
    code:{ type: String, required: true},
    identification: { type: String, required: true},
    name : { type: String, required: true},
    status : { type: mongoose.Schema.ObjectId, ref: 'TicketStatus'}
});

var ticketSchema = new mongoose.Schema({
    event: { type: mongoose.Schema.ObjectId, ref: 'Event' },
    order: { type: mongoose.Schema.ObjectId, ref: 'Order' },
    created_at: { type: Date, default: Date.now},
    modified_at : { type: Date, default: Date.now},    
    quantity : {type: Number, required: true},
    claimants : [claimantsSchema],
    value :{
        without_tax: { type : Number, required: true},
        tiket_service: { type : Number, required: true},
        tax: { type : Number, required: true}
    },
    owner: { type: mongoose.Schema.ObjectId, ref: 'User' }
});

ticketSchema.virtual('total_amount')
    .get(function () {
        return this.value.without_tax + this.value.tiket_service + this.value.tax;
});

var orderSchema = new mongoose.Schema({   
    created_at: {type: Date, default: Date.now},
    modified_at : {type: Date, default: Date.now},
    total_amount : {type: Number},
    client :{ type: mongoose.Schema.ObjectId, ref: 'User' },
    orderStatus : { type: mongoose.Schema.ObjectId, ref: 'OrderStatus' },
    orderStatusHistory : [{ type: mongoose.Schema.Types.ObjectId, ref: 'OrderStatus' }],
    tikets: [ticketSchema],
});


mongoose.model('Cart', cartSchema);
mongoose.model('CartDetail', cartDetailSchema);
mongoose.model('OrderStatus', orderStatusSchema);
mongoose.model('Order', orderSchema);
mongoose.model('TicketStatus', ticketStatusSchema);
mongoose.model('Claimant', claimantsSchema);
mongoose.model('Ticket', ticketSchema);
