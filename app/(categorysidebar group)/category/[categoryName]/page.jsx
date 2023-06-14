import Product from "@/components/Product";

const getData = async (params) => {
  const categoryProductsData = await fetch(
    `${process.env.WEBSITE_URL}/api/categories/${params.categoryName}`,
    { next: { revalidate: 60 } }
  );

  return categoryProductsData.json()
};

const Category = async ({ params }) => {

  const categoryProducts = await getData(params);

  return (
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
  );
};

export default Category;
