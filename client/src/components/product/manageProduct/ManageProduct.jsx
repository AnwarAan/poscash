import {
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import Form from "./ProductForm"
import PropTypes from "prop-types"

const ManageProduct = ({ product, action }) => {
  return (
    <div className="w-full overflow-hidden">
      <DialogHeader>
        <DialogTitle>
          {product ? `Edit Product Id : ${product.id}` : `Create product`}
        </DialogTitle>
        <DialogDescription>
          {product
            ? "Make changes to your product here."
            : "Create a new product"}
        </DialogDescription>
      </DialogHeader>
      <div className="my-4">
        <Form action={action} product={product} />
      </div>
    </div>
  )
}

ManageProduct.propTypes = {
  action: PropTypes.any.isRequired,
}

export default ManageProduct
