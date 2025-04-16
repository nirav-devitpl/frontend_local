import { Button } from '@/components/ui/button';
import { DialogClose, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { ActivateModalProps } from '@/models/activate-model';
import { useTranslation } from 'react-i18next';

/**
 * activate data component
 * @param message - Message to be displayed
 * @param handleeactivate - Function to handle the deactivate
 * @returns 
 */
const ActivateModal = ({ message, handleActivate }: ActivateModalProps) => {
  const { t } = useTranslation();

  return (
    <>
      <DialogHeader>
        <DialogTitle className="flex items-center gap-2 justify-center">
          <div className="relative flex items-center justify-center w-18 h-18 bg-red-50 rounded-full">
            <div className="w-12 h-12 p-2 bg-red-200 rounded-full flex items-center justify-center shadow-lg transition duration-400 text-red-600">
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10 18.3327V14.166M7.5 6.66602V1.66602M12.5 6.66602V1.66602M15 6.66602V10.8327C15 11.7167 14.6488 12.5646 14.0237 13.1897C13.3986 13.8148 12.5507 14.166 11.6667 14.166H8.33333C7.44928 14.166 6.60143 13.8148 5.97631 13.1897C5.35119 12.5646 5 11.7167 5 10.8327V6.66602H15Z"
                  stroke="#F81E1E"
                  strokeWidth="1.3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
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
          onClick={handleActivate}
        >
          {t('MODAL.CONFIRM_DEACTIVATE')}
        </Button>
      </DialogFooter>
    </>
  );
};

export default ActivateModal;