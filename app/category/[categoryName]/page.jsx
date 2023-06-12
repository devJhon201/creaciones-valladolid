import CategorySidebar from "@/components/CategorySidebar";
import Product from "@/components/Product";

const getData = async (params) => {
  const categoryProductsData = await fetch(
    `${process.env.WEBSITE_URL}/api/categories/${params.categoryName}`,
    { cache: 'no-store' }
  );

  const categoriesData = await fetch(
    `${process.env.WEBSITE_URL}/api/categories`,
    { cache: 'no-store' }
  );

  return {
    categoryProductsData: categoryProductsData.json(),
    categoriesData: categoriesData.json(),
  };
};

const Category = async ({ params }) => {
  const getDataRes = await getData(params);

  const categoryProducts = await getDataRes.categoryProductsData;

  const categories = await getDataRes.categoriesData;

  return (
    <main className="d-lg-flex">
      <CategorySidebar categories={categories} />
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
              key={product._id}
              id={product._id}
            />
          ))}
        </div>
      </div>
    </main>
  );
};

export default Category;
