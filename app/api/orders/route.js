import Order from "@/models/Order";
import { NextResponse } from "next/server";

export async function GET(request,) {
    const { searchParams } = new URL(request.url)
    const orderId = searchParams.get('orderId')
    const order = await Order.findById(orderId)

    return NextResponse.json(order)
}