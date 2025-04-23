import showToast from "@/components/common/toast";
import { Form, FormField, FormItem, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useResetPasswordMutation } from "@/services/auth";
import { resetPasswordSchema } from "@/validation-schema/reset-password";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/custom/button";
import { useNavigate, useParams } from "react-router";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { LoadingIcon, LockIcon, EyeOff, Eye } from "@/components/common/icon";
import { useTranslation } from "react-i18next";
import TermsAndConditions from "@/components/common/terms-and-conditions";
import { useState } from "react";

/**
 * @memberof auth
 * @name ResetPasswordForm
 * @description ResetPasswordForm component renders a form for users to reset their password. It includes password validation, localization, and handles the reset password functionality.
 * @returns {JSX.Element} - The rendered ResetPasswordForm component.
 */
function ResetPasswordForm() {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const { token } = useParams<{ token: string }>(); // Get the token from the URL
    const [resetPassword, { isLoading }] = useResetPasswordMutation();
    const [passwordScore, setPasswordScore] = useState({
        strength: "",
        border: "",
        message: "",
        color: "",
        strengthScore: 0,
    });
    
    const [passwordIcon, setPasswordIcon] = useState<Record<string, boolean>>({
        showPassword: false,
        showConfirmPassword: false,
    });

    const togglePasswordIcon = (value: boolean, key: string) => {
        setPasswordIcon((prev) => ({ ...prev, [key]: value }));
    };

    const form = useForm<z.infer<typeof resetPasswordSchema>>({
        resolver: zodResolver(resetPasswordSchema),
        defaultValues: {
            password: "",
            confirmPassword: "",
        },
    });


    const getPasswordStrength = (password: string) => {
        const hasUpperCase = /[A-Z]/.test(password);
        const hasLowerCase = /[a-z]/.test(password);
        const hasNumber = /\d/.test(password);
        const hasSpecialChar = /[^A-Za-z0-9]/.test(password);
        const isLongEnough = password.length >= 8;
    
        
        if(password.length < 8) {
            return {
                strength: "",
                border: "",
                message: "",
                color: "",
                strengthScore: 0,
            }
        } else {
            const strengthScore =
            Number(hasUpperCase) +
            Number(hasLowerCase) +
            Number(hasNumber) +
            Number(hasSpecialChar) +
            Number(isLongEnough);
        
            if (strengthScore === 5) {
                return {
                    strength: "strong",
                    border: "border-green-500",
                    message: t("PASSWORD_METER.STRONG_PASSWORD"),
                    color: "text-green-500",
                    strengthScore: strengthScore
                };
            } else if (strengthScore >= 3) {
                return {
                    strength: "moderate",
                    border: "border-yellow-500",
                    message: t("PASSWORD_METER.MEDIUM_PASSWORD"),
                    color: "text-yellow-500", 
                    strengthScore: strengthScore
                };
            } else {
                return {
                    strength: "weak",
                    border: "border-red-500",
                    message: t("PASSWORD_METER.WEAK_PASSWORD"),
                    color: "text-red-500", 
                    strengthScore: strengthScore
                };
            }
        }        
    };

    /**
     * @function onSubmit
     * @description Submits the reset password form
     * @param {z.infer<typeof resetPasswordSchema>} data - The form data
     */
    const onSubmit = (data: z.infer<typeof resetPasswordSchema>) => {
        const payload = {
            newpassword: data.password,
            token: token,
        };
        resetPassword(payload)
            .unwrap()
            .then((response) => {
                if (response?.status === "success" || response?.status === 200 || response?.status === 201) {
                    showToast(response?.message ?? t("RESET_PASSWORD_FORM.SUCCESS_MESSAGE"), "success");
                    navigate("/auth/sign-in");
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
                <CardTitle className="font-poppins font-bold text-3xl tracking-normal flex items-center space-x-">
                    <span>{t("RESET_PASSWORD_FORM.TITLE")}</span>
                </CardTitle>
                <CardDescription className="flex items-center font-poppins font-normal text-[20px] text-[#9095a1]">
                    {t("RESET_PASSWORD_FORM.DESCRIPTION")}
                </CardDescription>
            </CardHeader>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className=" p-6">
                    {/* Password Field */}
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field, fieldState }) => (
                            <FormItem>
                                <FormControl className="relative">
                                    <div className="flex items-center">
                                        <LockIcon />
                                        <Input
                                            type={passwordIcon.showPassword ? "text" : "password"}
                                            placeholder={t("RESET_PASSWORD_FORM.PLACEHOLDERS.NEW_PASSWORD")}
                                            {...field}
                                            className={`w-full pl-10 h-[43px] rounded-lg bg-gray-200 ${
                                                fieldState.invalid ? "border-red-500" : ""
                                            }`}
                                            onChange={(e) => {
                                                field.onChange(e);
                                                setPasswordScore(getPasswordStrength(e.target.value));
                                            }}
                                        />
                                        <Button
                                            type="button"
                                            variant={"icon"}
                                            className="absolute inset-y-0 right-1 top-1 flex items-center border-0 cursor-pointer bg-none"
                                            onClick={() => togglePasswordIcon(!passwordIcon.showPassword, 'showPassword')}
                                        >
                                            {passwordIcon.showPassword ? <EyeOff /> : <Eye />}
                                        </Button>
                                    </div>
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
                                    <div className="flex items-center">
                                        <LockIcon />
                                        <Input
                                            type={passwordIcon.showConfirmPassword ? "text" : "password"}
                                            placeholder={t("RESET_PASSWORD_FORM.PLACEHOLDERS.CONFIRM_PASSWORD")}
                                            {...field}
                                            className={`w-full pl-10 h-[43px] rounded-lg bg-gray-200 ${
                                                fieldState.invalid ? "border-red-500" : ""
                                            }`}
                                        />
                                        <Button
                                            type="button"
                                            variant={"icon"}
                                            className="absolute inset-y-0 right-1 top-1 flex items-center border-0 cursor-pointer bg-none"
                                            onClick={() => togglePasswordIcon(!passwordIcon.showConfirmPassword, 'showConfirmPassword')}
                                        >
                                            {passwordIcon.showConfirmPassword ? <EyeOff /> : <Eye />}
                                        </Button>
                                    </div>
                                </FormControl>
                                <FormMessage>{fieldState.error?.message}</FormMessage>
                                {passwordScore.strengthScore > 0 && (
                                    <>
                                        <div className={`border-t-4 ${passwordScore.border} border w-${passwordScore.strengthScore}/5`} />
                                        <p className={`text-sm font-bold ${passwordScore.color}`}>{passwordScore.message}</p>
                                    </>
                                )}
                            </FormItem>
                        )}
                    />

                    {/* Submit Button */}
                    <Button
                        type="submit"
                        className="w-full rounded-xl py-6 bg-[#e64560] mt-5 cursor-pointer mb-2 hover:bg-[#E64560]/90"
                        disabled={isLoading}
                    >
                        {isLoading ? <LoadingIcon /> : t("RESET_PASSWORD_FORM.BUTTONS.SUBMIT")}
                    </Button>

                    <TermsAndConditions/>
                </form>
            </Form>
        </Card>
    );
}

export default ResetPasswordForm;