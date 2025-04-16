import { Button } from '@/components/ui/button';
import { DialogClose, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { PasswordChangeModalProps } from '@/models/password-change-modal';
import { useTranslation } from 'react-i18next';

/**
 * Password Change Modal
 * @param message - Message to be displayed
 * @param handlePasswordChange - Function to handle the Password Change
 * @returns 
 */
const PasswordChangeModal = ({ message, handlePasswordChange }: PasswordChangeModalProps) => {
  const { t } = useTranslation();

  return (
    <>
      <DialogHeader>
        <DialogTitle className="flex items-center gap-2 justify-center">
          <div className="relative flex items-center justify-center w-18 h-18 bg-red-50 rounded-full">
            <div className="w-12 h-12 p-2 bg-red-200 rounded-full flex items-center justify-center shadow-lg transition duration-400 text-red-600">              
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#F81E1E"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-key-round"
              >
                <path d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z" />
                <circle cx="16.5" cy="7.5" r=".5" fill="#F81E1E" />
              </svg>
            </div>
          </div>
        </DialogTitle>
      </DialogHeader>
      <div className="text-center text-sm text-gray-500">{message}</div>
      <DialogFooter>
        <DialogClose asChild>
          <Button variant="outline" className="w-1/2 cursor-pointer">
            {t('MODAL.CANCEL')}
          </Button>
        </DialogClose>
        <Button
          variant="destructive"
          className="w-1/2 cursor-pointer"
          onClick={handlePasswordChange}
        >
          {t('MODAL.CONFIRM_PASSWORD_CHANGE')}
        </Button>
      </DialogFooter>
    </>
  );
};

export default PasswordChangeModal;