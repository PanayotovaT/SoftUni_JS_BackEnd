const {Schema, model} =  require('mongoose');

const carSchema = new Schema({
    name: { type: String, required: [true, 'Car Listing must have a name!'] },
    price: {
        type: Number,
        default: 1000,
        //min: [0, 'Price cannot be negative!']
        // validate: {
        //     validator: function (value) {
        //         return value >= 0;
        //     },
        //     message: 'Price cannot be negative!Attempted to set price {VALUE}!'
        // }
    }
});

carSchema.methods.startEngine = function () {
    console.log(`${this.name} goes Vroom!`);
}

carSchema.virtual('VAT').get(function () {
    return this.price * 0.2;
});

carSchema.path('price').validate({
    validator(value){
        return value >= 0
    },
    message: 'Message'
});

const Car = model('Car', carSchema);

module.exports = Car;