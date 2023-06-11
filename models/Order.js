import { Schema, model, models } from 'mongoose';

const { Decimal128, String, Number, Boolean } = Schema.Types

const productsSchema = new Schema({
    name: String,
    size: String,
    fabric: String,
    quantity: Number,
    unitPrice: Decimal128

})

const OrderSchema = new Schema({
    name: String,
    streetName: String,
    streetNumber: String,
    city: String,
    province: String,
    zipCode: String,
    phoneNumber: String,
    products: [productsSchema],
    totalPrice: Decimal128,
    paid: Boolean
}, { timestamps: true })

const Order = models?.Order || model('Order', OrderSchema);

export default Order;