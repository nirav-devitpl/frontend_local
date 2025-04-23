import { LanguageChange } from "@/components/common/language-change";
import ResetPasswordForm from "./components/reset-password-form";


/**
 * @function ResetPasswordPage
 * @description This function is used to render the reset password page
 * @returns Reset password page component
 */
function ResetPasswordPage() {
    return (
      <div className="relative flex min-h-screen bg-white">
        <div className="absolute top-0 left-0 right-0 flex items-center justify-between p-4 bg-white shadow-md h-[80px]">
          <div className="flex items-center h-full">
            <img src="/category.png" alt="Logo" className="ml-[20px]" />
          </div>
          <div className="flex items-center space-x-2">
            <LanguageChange />
          </div>
        </div>
        <div className="flex flex-1 flex-col md:grid md:grid-cols-2">
          <div className="hidden md:flex flex-1 items-center justify-center p-6 bg-white">
            <div className="relative">
              <img
                src="/booking-logo.png"
                alt="Booking Illustration"
                className="max-w-full max-h-48 sm:max-h-80 md:max-h-full object-contain"
              />            
            </div>
          </div>
          <div className="flex flex-1 items-center justify-center p-6">
            <ResetPasswordForm />
          </div>
        </div>
      </div>
    )
}

export default ResetPasswordPage;

