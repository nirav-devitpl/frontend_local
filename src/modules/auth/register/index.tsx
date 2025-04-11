import RegisterForm from "./components/register-form";


/**
 * @function RegisterPage
 * @description This function is used to render the register page
 * @returns Register page component
 */
function RegisterPage() {
    return (
      <div className="grid min-h-svh lg:grid-cols-1">
      <div className="flex flex-col p-6 md:p-10">
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <RegisterForm />
          </div>
        </div>
      </div>
    </div>
    )
}

export default RegisterPage;

