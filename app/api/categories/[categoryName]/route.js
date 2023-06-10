import connectMongoDB from "@/lib/mongoose";
import Product from "@/models/Product";
import { NextResponse } from "next/server";

export async function GET(request, {params}) {
    await connectMongoDB()
    return NextResponse.json(await Product.find({categories: params.categoryName}))
}