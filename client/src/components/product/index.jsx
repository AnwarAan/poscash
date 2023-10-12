import { useQuery } from "@tanstack/react-query"
import { getAPI } from "@/repositories/api"
import Category from "./Category"
import ProductList from "./ProductList"

const Product = () => {
  const { data: categories, isFetched } = useQuery(
    ["categories"],
    async () => {
      const res = await getAPI(`category`)
      return res.data
    }
    // { refetchInterval: 5000 }
  )

  return (
    <div className="h-full flex flex-col space-y-4">
      <div className="flex justify-center">
        <Category category="All" />
        {isFetched &&
          categories.map((category, i) => (
            <Category key={i} category={category.name} />
          ))}
      </div>
      <div className="flex-grow overflow-hidden">
        <ProductList />
      </div>
    </div>
  )
}

export default Product