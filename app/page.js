import CategorySidebar from "@/components/CategorySidebar";
import Product from "@/components/Product";

export default async function Home() {

  const productsData = await fetch(`${process.env.WEBSITE_URL}/api/products`, { next: { revalidate: 60 } })
  const products = await productsData.json()

  const categoriesData = await fetch(`${process.env.WEBSITE_URL}/api/categories`, { next: { revalidate: 60 } })
  const categories = await categoriesData.json()

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
