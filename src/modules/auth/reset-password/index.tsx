import ResetPasswordForm from "./components/reset-password-form";


/**
 * @function ResetPasswordPage
 * @description This function is used to render the reset password page
 * @returns Reset password page component
 */
function ResetPasswordPage() {
    return (
      <div className="grid min-h-svh lg:grid-cols-1">
      <div className="flex flex-col p-6 md:p-10">
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <ResetPasswordForm />
          </div>
        </div>
      </div>
    </div>
    )
}

export default ResetPasswordPage;

