import connectMongoDB from "@/lib/mongoose";
import Product from "@/models/Product";
import { NextResponse } from "next/server";

export async function GET() {
    await connectMongoDB()
    const products = await Product.find().exec();

    const categoriesNames = [...new Set(products.map(product => product.categories).join().split(','))];

    return NextResponse.json(categoriesNames)
}