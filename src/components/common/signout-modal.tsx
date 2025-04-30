import { Button } from '@/components/ui/button';
import { DialogClose, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { SignOutModalProps } from '@/models/signout-modal'; // Update the props interface for sign-out modal
import { t } from 'i18next';
import { LogOut } from 'lucide-react';

/**
 * Sign Out Confirmation Modal
 * @param message - Message to be displayed
 * @param handleSignOut - Function to handle the sign-out action
 * @returns 
 */
const SignOutModal = ({ message, handleSignOut }: SignOutModalProps) => {
    return (
        <>
            <DialogHeader>
                <DialogTitle className='flex items-center gap-2 justify-center'>
                    <div className="relative flex items-center justify-center w-18 h-18 bg-blue-50 rounded-full">
                        <div className="w-12 h-12 p-2 bg-blue-200 rounded-full flex items-center justify-center shadow-lg transition duration-400 text-blue-600">
                            <LogOut size={32} />
                        </div>
                    </div>
                </DialogTitle>
            </DialogHeader>
            <div className='text-center text-sm text-gray-500 pb-3'>{message}</div>
            <DialogFooter>
                <DialogClose asChild>
                    <Button variant="outline" className='w-1/2 cursor-pointer'>{t('MODAL.CANCEL')}</Button>
                </DialogClose>
                <Button variant="primary" className='w-1/2 cursor-pointer' onClick={handleSignOut}>{t('MODAL.CONFIRM_SIGNOUT')}</Button>
            </DialogFooter>
        </>
    );
};

export default SignOutModal;