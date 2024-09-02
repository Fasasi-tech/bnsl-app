import {AlertDialog,AlertDialogAction,AlertDialogCancel,AlertDialogContent,AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger,} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"

const DeleteDialog = ({handleDelete}) => {
  return (
    <AlertDialog>
        <AlertDialogTrigger asChild>
            <Button variant="outline">Delete</Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
            <AlertDialogHeader>
                <AlertDialogTitle>
                    Are you absolutely sure?
                </AlertDialogTitle>
                <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete vendor and remove data from the server
                </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleDelete}>Continue</AlertDialogAction>
            </AlertDialogFooter>   
        </AlertDialogContent>
    </AlertDialog>
  )
}

export default DeleteDialog