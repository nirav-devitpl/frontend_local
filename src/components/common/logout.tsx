import { useState } from "react";
import { useNavigate } from "react-router";
import { Button } from "../custom/button";
import { SignoutIcon } from "./icon"; // Import the new icon for collapsed state
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip";
import { Dialog, DialogContent, DialogOverlay } from "@radix-ui/react-dialog";
import { t } from "i18next";

interface LogoutButtonProps {
  isCollapsed: boolean;
}

const LogoutButton: React.FC<LogoutButtonProps> = ({ isCollapsed }) => {
  const navigate = useNavigate();
  const [openLogoutModal, setOpenLogoutModal] = useState(false);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/auth/sign-in");
  };

  return (
    <>
      <TooltipProvider delayDuration={0}>
        {isCollapsed ? (
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                className={`cursor-pointer group relative flex mb-2 w-11 h-11 justify-between p-3 ml-1 rounded-full bg-slate-50 border border-slate-200 hover:border-[#e64560] hover:text-[#e64560] hover:bg-muted transition-colors`}
                onClick={() => setOpenLogoutModal(true)}
                type="button"
                variant="icon"
              >
                <SignoutIcon className="h-12 w-12" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right" className="flex items-center gap-4">
              Sign out
            </TooltipContent>
          </Tooltip>
        ) : (
            <nav className="grid gap-1 group-[[data-collapsed=true]]:justify-center group-[[data-collapsed=true]]:px-2">
              <button
                type="button"
                className="inline-flex items-center whitespace-nowrap transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 text-[#475569] hover:text-[#e64560] h-10 justify-start text-wrap rounded-none px-5 font-poppins font-normal text-base leading-6 tracking-normal cursor-pointer"
                onClick={() => setOpenLogoutModal(true)}
              >
                <div className="mr-2 p-1">
                  <SignoutIcon className="h-4 w-4" />
                </div>                
                  Sign out                
              </button>
            </nav>
        )}
      </TooltipProvider>

      {/* Logout Confirmation Modal */}
      
      <Dialog open={openLogoutModal} onOpenChange={setOpenLogoutModal}>
        <DialogOverlay className="fixed inset-0 bg-black/50 z-40" />
        <DialogContent
          className="fixed z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg p-6 w-[400px] shadow-lg"
        >
          <div className="text-center justify-between items-center flex flex-col">
            <div className="w-12 h-12 p-2 bg-red-200 rounded-full flex items-center justify-center shadow-lg transition duration-400 text-red-600">
              <SignoutIcon className="h-6 w-6" />
            </div>
            <p className="mt-2 text-sm text-gray-600">
              Are you sure you want to sign out?
            </p>
            <div className="mt-4 flex justify-center gap-4">
              <Button variant="outline"
                className='w-1/3 cursor-pointer' 
                onClick={() => setOpenLogoutModal(false)}>              
                {t('MODAL.CANCEL')}
              </Button>
              <Button
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 cursor-pointer"
                onClick={handleLogout}
              >
                {t('MODAL.CONFIRM_SIGNOUT')}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default LogoutButton;