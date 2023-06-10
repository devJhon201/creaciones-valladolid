import CategorySidebar from "@/components/CategorySidebar";
import Product from "@/components/Product";

const Category = async ({ params }) => {
  const categoryProductsData = await fetch(
    `${process.env.WEBSITE_URL}/api/categories/${params.categoryName}`
  );
  const categoryProducts = await categoryProductsData.json();
  const categoriesData = await fetch(
    `${process.env.WEBSITE_URL}/api/categories`
  );
  const categories = await categoriesData.json();

  return (
    <main className="d-lg-flex">
      <CategorySidebar categories={categories}/>
      <div className="container px-4 ms-lg-5 my-5">
        <h2 className="text-capitalize">{params.categoryName}</h2>
        <div className="row row-cols-lg-3 row-cols-1">
          {categoryProducts.map((product) => (
            <Product
              name={product.name}
              categories={product.categories}
              price={product.price.$numberDecimal}
              description={product.description}
              fabrics={product.fabrics}
              image={product.image}
              sizes={product.sizes}
              key={product.id}
            />
          ))}
        </div>
      </div>
    </main>
  );
};

export default Category;
