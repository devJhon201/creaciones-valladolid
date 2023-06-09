import {Schema, model, models } from 'mongoose';

const {Decimal128, String, Array} = Schema.Types

const sizesSchema = new Schema({
    sizeName: String,
    plusPrice: Decimal128
})
const fabricsSchema = new Schema({
    fabricName: String,
    plusPrice: Decimal128
})

const ProductSchema = new Schema( {
    name: String,
    description: String,
    price: Decimal128,
    categories: Array,
    sizes: [sizesSchema],
    image: String,
    fabrics: [fabricsSchema]

})

const Product = models?.Product || model('Product', ProductSchema);

export default Product;