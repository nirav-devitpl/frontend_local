import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForgotPasswordMutation } from "@/services/forgot-password"; // Correct import
import { forgotPasswordSchema } from "@/validation-schema/forgot-password";
import { Form, FormField, FormItem, FormControl, FormMessage } from "@/components/ui/form";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import OtpModal from "@/components/common/otp-modal";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import WavingHand from "@/components/ui/waving-hand";
import showToast from "@/components/common/toast";
import { useTranslation } from "react-i18next";
import i18n from "@/assets/i18n";
import { EMAILIcon, LoadingIcon } from "@/components/common/icon";
import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogOverlay, DialogPortal } from "@/components/ui/dialog";
import AlreadyHaveAccount from "@/components/common/already-have-account";
import TermsAndConditions from "@/components/common/terms-and-conditions";

/**
 * @memberof auth
 * @name ForgotPasswordForm
 * @description ForgotPasswordForm component renders a form for users to request a password reset. It includes email validation, localization, and handles the forgot password functionality.
 * @returns {JSX.Element} - The rendered ForgotPasswordForm component.
 */
function ForgotPasswordForm() {
  const { t } = useTranslation();
  const [forgotPassword, { isLoading }] = useForgotPasswordMutation(); // Hook for forgot password API call
  const [openOtpModal, setOpenOtpModal] = useState<boolean>(false); // Manages OTP modal visibility

  /**
   * @function handleOpenOtpModal
   * @description Opens the OTP modal.
   */
  const handleOpenOtpModal = () => {
    setOpenOtpModal(true);
  };

  // Initialize the form with validation schema
  const form = useForm<z.infer<typeof forgotPasswordSchema>>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  /**
   * @function onSubmit
   * @description Submits the forgot password form and triggers the OTP modal.
   * @param {z.infer<typeof forgotPasswordSchema>} data - The form data.
   */
  const onSubmit = (data: z.infer<typeof forgotPasswordSchema>) => {
    const payload = {
      email: data.email
    };

    forgotPassword({ ...payload })
      .unwrap()
      .then((response) => {
        if (response?.status === "success" || response?.status === 200 || response?.status === 201) {
          showToast(response.message, "success");
          handleOpenOtpModal();
        } else {
          showToast(response?.message ?? t("FORGOT_PASSWORD_FORM.ERRORS.ERROR_MESSAGE"), "error");
        }
      })
      .catch((err) => {
        const errorMessage = err?.data?.message ?? t("FORGOT_PASSWORD_FORM.ERRORS.ERROR_MESSAGE");
        console.error("Error:", err);
        showToast(errorMessage, "error");
      });
  };

  // Reset the form when the language changes
  useEffect(() => {
    form.reset();
  }, [i18n.language]);

  return (
    <Card className="w-full max-w-lg rounded-lg relative top-10 py-7 px-2 bg-white md:border md:shadow-[0_0px_2px_0_rgba(23,26,31,0.12)]">
      <CardHeader>
        <CardTitle className="font-poppins font-bold text-3xl tracking-normal flex items-center space-x-2">
          <span>{t("FORGOT_PASSWORD_FORM.TITLE")}</span>
          <WavingHand />
        </CardTitle>
        <CardDescription className="flex items-center font-poppins font-normal text-[20px] text-[#9095a1]">
          {t("FORGOT_PASSWORD_FORM.DESCRIPTION")}
        </CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2 p-6">
          {/* Email Field */}
          <FormField
            control={form.control}
            name="email"
            render={({ field, fieldState }) => (
              <FormItem>
                <FormControl className="relative">
                  <div>
                    <EMAILIcon />
                    <Input
                      placeholder={t("FORGOT_PASSWORD_FORM.PLACEHOLDERS.EMAIL")}
                      {...field}
                      className={`w-full pl-10 h-[43px] rounded-lg bg-gray-200 ${
                        fieldState.invalid ? "border-red-500" : ""
                      }`}
                    />
                  </div>
                </FormControl>
                <FormMessage>{fieldState.error?.message}</FormMessage>
              </FormItem>
            )}
          />

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full rounded-xl py-6 bg-[#e64560] mt-5 cursor-pointer hover:bg-[#E64560]/90"
            disabled={isLoading}
          >
            {isLoading ? <LoadingIcon /> : t("FORGOT_PASSWORD_FORM.BUTTONS.CONTINUE")}
          </Button>

          {/* Terms and Conditions */}
          <TermsAndConditions />

          {/* Already Have an Account */}
          <AlreadyHaveAccount />
        </form>
      </Form>

      {/* OTP Modal */}
      <Dialog open={openOtpModal} onOpenChange={setOpenOtpModal}>
        <DialogPortal>
          <DialogOverlay className="fixed inset-0 bg-black/50 z-40" />
            <DialogContent
            onInteractOutside={(e) => e.preventDefault()}
            onEscapeKeyDown={(e) => e.preventDefault()}
            className="fixed z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg p-6 w-[400px] shadow-lg"
            >
            <OtpModal email={form.getValues("email")} />
            </DialogContent>
        </DialogPortal>
      </Dialog>
    </Card>
  );
}

export default ForgotPasswordForm;