import showToast from "@/components/common/toast";
import { Form, FormField, FormItem, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useResetPasswordMutation } from "@/services/auth";
import { resetPasswordSchema } from "@/validation-schema/reset-password";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/custom/button";
import { Link, useNavigate, useParams } from "react-router";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { LoadingIcon } from "@/components/common/icon";
import { useTranslation } from "react-i18next";

/**
 * @memberof auth
 * @name ResetPasswordForm
 * @description ResetPasswordForm component renders a form for users to reset their password. It includes password validation, localization, and handles the reset password functionality.
 * @returns {JSX.Element} - The rendered ResetPasswordForm component.
 */
function ResetPasswordForm() {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const { token } = useParams(); // Get the token from the URL
    const [resetPassword, { isLoading }] = useResetPasswordMutation(); // Hook for API call

    const form = useForm<z.infer<typeof resetPasswordSchema>>({
        resolver: zodResolver(resetPasswordSchema),
        defaultValues: {
            password: "",
            confirmPassword: "",
        },
    });

    /**
     * @function onSubmit
     * @description Submits the reset password form
     * @param {z.infer<typeof resetPasswordSchema>} data - The form data
     */
    const onSubmit = (data: z.infer<typeof resetPasswordSchema>) => {
        const payload = {
            password: data.password,
            token, // Include the token in the payload
        };

        resetPassword(payload)
            .unwrap()
            .then((response) => {
                if (response?.status === "success" || response?.status === 200 || response?.status === 201) {
                    showToast(t("RESET_PASSWORD_FORM.SUCCESS_MESSAGE"), "success");
                    navigate("/auth/sign-in"); // Redirect to sign-in page
                } else {
                    showToast(response?.message ?? t("RESET_PASSWORD_FORM.ERROR_MESSAGE"), "error");
                }
            })
            .catch((err) => {
                const errorMessage = err?.data?.message ?? t("RESET_PASSWORD_FORM.ERROR_MESSAGE");
                console.error("Error:", err);
                showToast(errorMessage, "error");
            });
    };

    return (
        <Card className="w-full max-w-lg rounded-lg relative top-10 py-7 px-2 bg-white md:border md:shadow-[0_0px_2px_0_rgba(23,26,31,0.12)]">
            <CardHeader>
                <CardTitle className="font-poppins font-bold text-3xl tracking-normal flex items-center space-x-2">
                    <span>{t("RESET_PASSWORD_FORM.TITLE")}</span>
                </CardTitle>
                <CardDescription className="flex items-center font-poppins font-normal text-[20px] text-[#9095a1]">
                    {t("RESET_PASSWORD_FORM.DESCRIPTION")}
                </CardDescription>
            </CardHeader>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3 p-6">
                    {/* Password Field */}
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field, fieldState }) => (
                            <FormItem>
                                <FormControl className="relative">
                                    <Input
                                        type="password"
                                        placeholder={t("RESET_PASSWORD_FORM.PLACEHOLDERS.NEW_PASSWORD")}
                                        {...field}
                                        className={`w-full pl-10 h-[43px] rounded-lg bg-gray-200 ${
                                            fieldState.invalid ? "border-red-500" : ""
                                        }`}
                                    />
                                </FormControl>
                                <FormMessage>{fieldState.error?.message}</FormMessage>
                            </FormItem>
                        )}
                    />

                    {/* Confirm Password Field */}
                    <FormField
                        control={form.control}
                        name="confirmPassword"
                        render={({ field, fieldState }) => (
                            <FormItem>
                                <FormControl className="relative">
                                    <Input
                                        type="password"
                                        placeholder={t("RESET_PASSWORD_FORM.PLACEHOLDERS.CONFIRM_PASSWORD")}
                                        {...field}
                                        className={`w-full pl-10 h-[43px] rounded-lg bg-gray-200 ${
                                            fieldState.invalid ? "border-red-500" : ""
                                        }`}
                                    />
                                </FormControl>
                                <FormMessage>{fieldState.error?.message}</FormMessage>
                            </FormItem>
                        )}
                    />

                    {/* Submit Button */}
                    <Button
                        type="submit"
                        className="w-full rounded-xl py-6 bg-[#e64560] mt-5 cursor-pointer"
                        disabled={isLoading}
                    >
                        {isLoading ? <LoadingIcon /> : t("RESET_PASSWORD_FORM.BUTTONS.RESET_PASSWORD")}
                    </Button>

                    {/* Terms and Privacy */}
                    <div className="font-poppins font-normal text-[14px] text-center text-[#9095a1]">
                        {t("RESET_PASSWORD_FORM.TERMS.DESCRIPTION")}{" "}
                        <a href="/terms" className="text-[#323743] font-medium hover:underline">
                            {t("RESET_PASSWORD_FORM.TERMS.TERMS")}
                        </a>{" "}
                        {t("RESET_PASSWORD_FORM.TERMS.AND")}{" "}
                        <a href="/privacy" className="text-[#323743] font-medium hover:underline">
                            {t("RESET_PASSWORD_FORM.TERMS.PRIVACY")}
                        </a>
                    </div>

                    {/* Already Have an Account */}
                    <div className="font-poppins font-normal text-[14px] text-center text-[#9095a1]">
                        {t("RESET_PASSWORD_FORM.ALREADY_HAVE_ACCOUNT")}{" "}
                        <Link to="/login" className="text-[#e64560] font-medium hover:underline">
                            {t("RESET_PASSWORD_FORM.LOGIN")}
                        </Link>
                    </div>
                </form>
            </Form>
        </Card>
    );
}

export default ResetPasswordForm;