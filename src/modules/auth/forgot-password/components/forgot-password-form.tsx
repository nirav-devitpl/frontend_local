import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForgotPasswordMutation } from "@/services/forgot-password";
import { forgotPasswordSchema } from "@/validation-schema/forgot-password";
import { Form, FormField, FormItem, FormControl, FormMessage } from "@/components/ui/form";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import OtpModal from '@/components/common/otp-modal';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import WavingHand from "@/components/ui/waving-hand";
import showToast from "@/components/common/toast";
import { useTranslation } from "react-i18next";
import i18n from '@/assets/i18n';
import { EMAILIcon, LoadingIcon } from "@/components/common/icon";
import { useEffect, useState } from "react";
import { Link } from "react-router";
import { Dialog, DialogContent, DialogOverlay } from "@radix-ui/react-dialog";
import {useOtpMutation} from '@/services/otp';

/**
 * @memberof auth
 * @name ForgotPasswordForm
 * @description ForgotPasswordForm component renders a form for users to request a password reset. It includes email validation, localization, and handles the forgot password functionality.
 * @returns {JSX.Element} - The rendered ForgotPasswordForm component.
 */
function ForgotPasswordForm() {

    const { t } = useTranslation();
    const [forgotPassword, { isLoading }] = useForgotPasswordMutation();
    const [openOtpModal, setOpenOtpModal] = useState(false);
    
    const handleOpenOtpModal = () => {
        setOpenOtpModal(true);
    };
    const [otpMutation] = useOtpMutation();

    const handleOtp = async (otp: string) => {
        await otpMutation(otp)
        .unwrap()
        .then((res: any) => {
            showToast(res?.message, 'success');
            setOpenOtpModal(false);
        })
        .catch((error: any) => {
            showToast(error?.data?.message, 'error');
        });
    };
    
    const form = useForm<z.infer<typeof forgotPasswordSchema>>({
        resolver: zodResolver(forgotPasswordSchema),
        defaultValues: {
            email: "",
        },
    });

    const onSubmit = (data: z.infer<typeof forgotPasswordSchema>) => {
        // const payload = {
        //     email: data.email,
        // };

        // forgotPassword({...payload})
        // .unwrap()
        // .then((response) => {
        //     if (response?.status === 'success' || response?.status === 200 || response?.status === 201) {
        //         showToast(t('FORGOT_PASSWORD_FORM.ERRORS.SUCCESS_MESSAGE'), 'success');
        //     } else {
        //         showToast(response?.message ?? t('FORGOT_PASSWORD_FORM.ERRORS.ERROR_MESSAGE'), 'error');
        //     }
        // })
        // .catch((err) => {
        //     const errorMessage = err?.data?.message ?? t('FORGOT_PASSWORD_FORM.ERRORS.ERROR_MESSAGE');
        //     console.error('Error:', err);
        //     showToast(errorMessage, 'error');
        // });
        
        handleOpenOtpModal();
    };

    useEffect(() => {
        form.reset();
    }, [i18n.language]);

    return (
        <>
            <Card className="w-full max-w-lg rounded-lg relative top-10 py-7 px-2 bg-white md:border md:shadow-[0_0px_2px_0_rgba(23,26,31,0.12)]">
                <CardHeader>
                    <CardTitle className="font-poppins font-bold text-3xl tracking-normal flex items-center space-x-2">
                        <span>{t('FORGOT_PASSWORD_FORM.TITLE')}</span>
                        <WavingHand/>
                    </CardTitle>
                    <CardDescription className="flex items-center font-poppins font-normal text-[20px] text-[#9095a1]">{t('FORGOT_PASSWORD_FORM.DESCRIPTION')}</CardDescription>
                </CardHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3 p-6">                    
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field, fieldState }) => (
                            <FormItem>
                                <FormControl className="relative">
                                    <div>
                                        <EMAILIcon />                       
                                        <Input
                                            placeholder={t('FORGOT_PASSWORD_FORM.PLACEHOLDERS.EMAIL')}
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
                        
                        <Button 
                            type="submit" 
                            className="w-full rounded-xl py-6 bg-[#e64560] mt-5 cursor-pointer"
                            disabled={isLoading}>
                            {isLoading ? (
                                <LoadingIcon />
                                ) : (
                                t("FORGOT_PASSWORD_FORM.BUTTONS.LOGIN")
                            )}
                        </Button>

                        <div className="font-poppins font-normal text-[14px] text-center text-[#9095a1]">
                            {t('FORGOT_PASSWORD_FORM.TERMS.DESCRIPTION')}{' '}
                            <a
                                href="/terms"
                                className="text-[#323743] font-medium hover:underline"
                            >
                                {t('FORGOT_PASSWORD_FORM.TERMS.TERMS')}
                            </a>
                            {' '}and{' '}
                            <a
                                href="/privacy"
                                className="text-[#323743] font-medium hover:underline"
                            >
                                {t('FORGOT_PASSWORD_FORM.TERMS.PRIVACY')}
                            </a>
                        </div>
                        <div className="font-poppins font-normal text-[14px] text-center text-[#9095a1]">
                            {t('FORGOT_PASSWORD_FORM.ALREADY_HAVE_ACCOUNT')}{' '}
                            <Link
                                to="/login"
                                className="text-[#e64560] font-medium hover:underline"
                            >
                                {t('FORGOT_PASSWORD_FORM.LOGIN')}
                            </Link>
                        </div>
                    </form>
                </Form>
            </Card>
            <Dialog open={openOtpModal} onOpenChange={setOpenOtpModal}>
                <DialogOverlay className="fixed inset-0 bg-black bg-opacity-50" />
                <DialogContent className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg p-6 w-[400px] shadow-lg">
                <OtpModal handleOtp={handleOtp} />
                </DialogContent>
            </Dialog>
        </>
    );
}
export default ForgotPasswordForm;