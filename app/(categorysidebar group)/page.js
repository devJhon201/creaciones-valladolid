import Product from "@/components/Product";

const getData = async () => {
  const productsData = await fetch(`${process.env.WEBSITE_URL}/api/products`,
    { next: { revalidate: 60 } })

  return productsData.json()
}

export default async function Home() {
  const products = await getData()

  return (
    <div className="container px-4 ms-lg-5 my-5">
      <div className="row">
        {products.map(product => <Product name={product.name} categories={product.categories} price={product.price.$numberDecimal} description={product.description} fabrics={product.fabrics} image={product.image} sizes={product.sizes} key={product._id} id={product._id} />)}
      </div>
    </div>
  )
}
