import { Button } from '@/components/ui/button';
import { DialogClose, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { DeleteModalProps } from '@/models/delete-model';
import { Trash2 } from 'lucide-react';


/**
 * Delete data component
 * @param message - Message to be displayed
 * @param handleDelete - Function to handle the delete
 * @returns 
 */
const DeleteModal = ({ message, handleDelete }: DeleteModalProps) => {

    return (
        <>
            <DialogHeader>
                <DialogTitle className='flex items-center gap-2 justify-center'>
                    <div className="relative flex items-center justify-center w-18 h-18 bg-red-50 rounded-full">
                        <div className="w-12 h-12 p-2 bg-red-200 rounded-full flex items-center justify-center shadow-lg transition duration-400 text-red-600">
                            <Trash2 size={32} />
                        </div>
                    </div>

                </DialogTitle>
            </DialogHeader>
            <div className='text-center text-sm text-gray-500'>{message}</div>
            <DialogFooter>
                <DialogClose asChild>
                    <Button variant="outline" className='w-1/2'>Cancel</Button>
                </DialogClose>
                <Button variant="destructive" className='w-1/2' onClick={handleDelete}>Yes, Delete</Button>
            </DialogFooter>
        </>
    )
}

export default DeleteModal;