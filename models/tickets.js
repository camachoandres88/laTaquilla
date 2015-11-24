var mongoose = require('mongoose');

var ticketSchema = new mongoose.Schema({
    created_by: { type: mongoose.Schema.ObjectId, ref: 'User' },
    created_at: {type: Date, default: Date.now},
    modified : {type: Date, default: Date.now},
    code: {
        type: String,
        unique: true,
        required: true
    }
});

mongoose.model('Ticket',ticketSchema);
