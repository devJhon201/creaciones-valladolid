import connectMongoDB from "@/lib/mongoose";
import stripeImp from 'stripe';
import { headers } from 'next/headers'
import { NextResponse } from "next/server";
import Order from "@/models/Order";

const stripe = stripeImp(process.env.STRIPE_SECRET_KEY)

export async function POST(req) {
    await connectMongoDB();

    try {
        const buffer = Buffer.from(await req.arrayBuffer())
        const payload = buffer.toString()
        const headersList = headers();
        const sig = headersList.get('stripe-signature')

        const event = stripe.webhooks.constructEvent(payload, sig, process.env.STRIPE_SIGNING_SECRET);



        if (event?.type === 'checkout.session.completed') {
            const metadata = event.data?.object?.metadata
            const paymentStatus = event.data?.object?.payment_status

            if (metadata?.orderId && paymentStatus === 'paid') {
                await Order.findByIdAndUpdate(metadata.orderId, { paid: true })
            }
        }
    } catch (e) {
        console.log(e)
        console.log(req.body)
        return NextResponse.json({ e }, { status: 500 })
    }

    return NextResponse.json('ok')
}