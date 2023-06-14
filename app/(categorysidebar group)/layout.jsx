import CategorySidebar from "@/components/CategorySidebar";

const getData = async () => {
  const categoriesData = await fetch(
    `${process.env.WEBSITE_URL}/api/categories`,
    { next: { revalidate: 60 } }
  );

  return categoriesData.json();
};

const CategoryLayout = async ({ children }) => {
  const categories = await getData();
  return (
    <main className="d-lg-flex">
      <CategorySidebar categories={categories} />
      {children}
    </main>
  );
};

export default CategoryLayout;
