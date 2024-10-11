'use client'
import React, {useState} from 'react'
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover"
import { HiDotsHorizontal } from "react-icons/hi";
import { IoEyeOutline } from "react-icons/io5";
import { MdDeleteOutline } from "react-icons/md";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger} from "@/components/ui/dialog"
import Link from 'next/link';
import { useSingleProductsQuery } from '@/app/ui/utils/slices/usersApiSlice';
import Loader from '@/app/ui/utils/Loader';
import ProductDetailsPage from './ProductDetailsPage';
import VendorSingleDetails from './VendorSingleDetails';
import EditProduct from './EditProduct';
import { useDeleteProductMutation } from '@/app/ui/utils/slices/usersApiSlice';
import { useToast } from '@/components/ui/use-toast';
import { useRouter} from 'next/navigation'
import DeleteProductDialog from './DeleteProductDialog';

const ProductActions = ({userId}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const {data, isLoading, error} = useSingleProductsQuery(userId, {skip: !isOpen})
  const [deleteProduct] = useDeleteProductMutation()
  const {toast} = useToast()
  const router = useRouter()

  const handleEdit = (product) => {
    setSelectedProduct(product); // Set the product to be edited
    setIsEditDialogOpen(true); // Open the edit dialog
  };

  // Function to open the details dialog and ensure the edit dialog is closed
const openDetailsDialog = (open) => {
  setIsOpen(open);
  if (open) setIsEditDialogOpen(false);
};

// Function to open the edit dialog and ensure the details dialog is closed
const openEditDialog = (open) => {
  setIsEditDialogOpen(open);
  if (open) setIsOpen(false);
};

const handleDeleteProduct = async () =>{
  try{
    const response = await deleteProduct(userId)
  
    toast({
      description:'product has been deleted successfully'
    })
    router.push('/vendor-products')
  }catch(error){
    const errorMessage = error?.data?.message || 'There was an error deleting this product'
    toast({
      description:errorMessage,
      variant:"destructive"
    })
  }
}
  return (
 
    <div>
    <Dialog open={isOpen} onOpenChange={openDetailsDialog}>
      <DialogTrigger asChild>
        <Button variant='outline'><HiDotsHorizontal /></Button>
      </DialogTrigger>
      <DialogContent className="w-full sm:max-w-full max-w-[90vw] lg:max-w-[60vw] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
              Product Details
          </DialogTitle>
          <DialogDescription>
            Detailed Information about the selected product.
          </DialogDescription>
        </DialogHeader>
        {isLoading ? (
          <Loader />
        ) : error ? (
          <p className='text-red-500 font-semibold'>{error?.data?.message}</p>
        ):(
          <div className='bg-white rounded-lg p-2'>
            {/* <ProductDetailsPage data={data?.data?.user?.productDetails} decodeHtml={decodeHtml}/> */}
            <VendorSingleDetails data={data?.data?.user} />

            {/* <Button variant="destructive" className='mt-4' onClick={() => handleEdit(data?.data?.user)}>
                Edit
            </Button> */}
            <Button 
              variant="destructive" 
              className='mt-4' 
              onClick={() => {
                handleEdit(data?.data?.user); // Prepare the product data
                openEditDialog(true);         // Open the edit dialog
              }}
            >
            Edit
          </Button>
          {/* <Button variant='outline' className='ml-4'>
            Delete
          </Button> */}
          <span className='ml-4'>
            <DeleteProductDialog handleDelete ={handleDeleteProduct}  />
          </span>
          
          </div>

        )}
      </DialogContent>

    </Dialog>

    {selectedProduct && (
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="w-full sm:max-w-full lg:max-w-[60vw] max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Edit Product</DialogTitle>
            </DialogHeader>
            
            {/* Pass selected product as props to EditProduct form */}
            <EditProduct product={selectedProduct} />
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}

export default ProductActions