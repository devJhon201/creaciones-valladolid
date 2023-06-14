// const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
import connectMongoDB from '@/lib/mongoose';
import Order from '@/models/Order';
import Product from '@/models/Product';
import { NextResponse } from 'next/server';
import stripeImp from 'stripe';

const stripe = stripeImp(process.env.STRIPE_SECRET_KEY)

export async function POST(req) {
  await connectMongoDB()

    try {
      const form = await req.formData()
      const name = form.get('name')
      const streetName = form.get('streetName')
      const streetNumber = form.get('streetNumber')
      const city = form.get('city')
      const province = form.get('province')
      const zipCode = form.get('zipCode')
      const phoneNumber = form.get('phoneNumber')
      const additionalAddress = form.get('additionalAddress')
      const selectedProducts = JSON.parse(form.get('products'))
      const ids = selectedProducts.map(({ id }) => id)
      const productsFromDB = await Product.find({ _id: { $in: ids } }).exec()
      let line_items = [];
      let products = []
      let totalPrice = 0;

      for (let index = 0; index < productsFromDB.length; index++) {
        const productFromDB = productsFromDB[index];

        selectedProducts.forEach(selectedProduct => {
          if (selectedProduct.id == productFromDB._id) {
            let price = Number(productFromDB.price);
            let fabricPrice = 0
            let fabricName = ''
            let sizePrice = 0
            let sizeName = ''
            let productName = productFromDB.name

            productFromDB.fabrics.forEach(fabricDB => {
              if (fabricDB.fabricName == selectedProduct.fabric) {
                fabricPrice = Number(fabricDB.plusPrice)
                fabricName = fabricDB.fabricName
              }
            })
            productFromDB.sizes.forEach(sizeDB => {
              if (sizeDB.sizeName == selectedProduct.size) {
                sizePrice = Number(sizeDB.plusPrice)
                sizeName = sizeDB.sizeName
              }
            })

            price = price + fabricPrice + sizePrice;

            totalPrice += (price * selectedProduct.quantity)
            products.push({
              name: productName,
              size: sizeName,
              fabric: fabricName,
              quantity: selectedProduct.quantity,
              description: productFromDB.description,
              unitPrice: price,
              totalPrice,
              image: productFromDB.image,
              idOfProduct: productFromDB._id
            })

            line_items.push({
              quantity: selectedProduct.quantity,
              price_data: {
                currency: 'eur',
                product_data: {
                  name: productFromDB.name,
                },
                unit_amount: price * 100
              }
            })
          }
        })
      }

      const order = await Order.create({
        name, streetName, streetNumber, city, province, zipCode, products, phoneNumber, additionalAddress, totalPrice: totalPrice.toFixed(2), paid: false
      })

      // Create Checkout Sessions from body params.
      const session = await stripe.checkout.sessions.create({
        line_items: line_items,
        mode: 'payment',
        success_url: `${process.env.WEBSITE_URL}/success/?success=true&orderId=${order._id}`,
        cancel_url: `${process.env.WEBSITE_URL}/success/?canceled=true`,
        metadata: {orderId: order._id.toString()}
      });
      return NextResponse.redirect(session.url, { status: 303 });
    } catch (err) {
      return NextResponse.json(err.message, { status: 500 });
    }
}