import CategorySidebar from "@/components/CategorySidebar";
import Product from "@/components/Product";

const getData = async () => {
  const productsData = await fetch(`${process.env.WEBSITE_URL}/api/products`, { cache: 'no-store' })
  const categoriesData = await fetch(`${process.env.WEBSITE_URL}/api/categories`, { cache: 'no-store' })

  return { productsData: productsData.json(), categoriesData: categoriesData.json() }
}

export default async function Home() {
  const getDataRes = await getData()
  const products = await getDataRes.productsData
  const categories = await getDataRes.categoriesData

  return (
    <main className="d-lg-flex">
      <CategorySidebar categories={categories} />
      <div className="container px-4 ms-lg-5 my-5">
        <div className="row">
          {products.map(product => <Product name={product.name} categories={product.categories} price={product.price.$numberDecimal} description={product.description} fabrics={product.fabrics} image={product.image} sizes={product.sizes} key={product._id} id={product._id} />)}
        </div>
      </div>
    </main>
  )
}
