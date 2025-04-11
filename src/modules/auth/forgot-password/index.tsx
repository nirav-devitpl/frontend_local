import ForgotPasswordForm from "./components/forgot-password-form";


/**
 * @function ForgotPasswordPage
 * @description This function is used to render the forgot password page
 * @returns Forgot password page component
 */
function ForgotPasswordPage() {
    return (
      <div className="grid min-h-svh lg:grid-cols-1">
      <div className="flex flex-col p-6 md:p-10">
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <ForgotPasswordForm />
          </div>
        </div>
      </div>
    </div>
    )
}

export default ForgotPasswordPage;

