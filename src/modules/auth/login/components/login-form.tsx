import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormField, FormItem, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import WavingHand from "@/components/ui/waving-hand";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router";
import { useTranslation } from "react-i18next";
import i18n from '@/assets/i18n';
import { useEffect, useState } from "react";
import { useLoginMutation } from "@/services/login";
import showToast from "@/components/common/toast";

/**
 * @memberof auth
 * @name LoginForm
 * @description LoginForm component renders a login form with fields for email, password, and a remember me checkbox. It includes validation, localization, and handles login functionality.
 * @returns {JSX.Element} - The rendered LoginForm component.
 */
function LoginForm() {

    const { t } = useTranslation();
    const getTranslation = (key: string) => i18n.t(key);
    const [login, { isLoading }] = useLoginMutation();
    const [showPassword, setShowPassword] = useState(false);

    const loginSchema = z.object({
        email: z
            .string()
            .min(1, { message: getTranslation('VALIDATION.NAME_REQUIRED') })
            .email({ message: getTranslation('VALIDATION.INVALID_EMAIL') }),
        password: z
            .string()
            .min(1, { message: getTranslation('VALIDATION.PASSWORD_REQUIRED') })
            .min(7, { message: getTranslation('VALIDATION.PASSWORD_MIN_LENGTH') }),
        rememberMe: z.boolean().optional(),
    });

    const form = useForm<z.infer<typeof loginSchema>>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: "",
            rememberMe: false,
        },
    });

    const onSubmit = (data: z.infer<typeof loginSchema>) => {
        const payload = {
            email: data.email,
            password: data.password,
            rememberMe: data.rememberMe,
        };

        login({...payload})
        .unwrap()
        .then((response) => {
            if (response?.status === 'success' || response?.status === 200 || response?.status === 201) {
                showToast(t('LOGIN_FORM.ERRORS.SUCCESS_MESSAGE'), 'success');
            } else {
                showToast(response?.message ?? t('LOGIN_FORM.ERRORS.ERROR_MESSAGE'), 'error');
            }
        })
        .catch((err) => {
            const errorMessage = err?.data?.message ?? t('LOGIN_FORM.ERRORS.ERROR_MESSAGE');
            console.error('Error:', err);
            showToast(errorMessage, 'error');
        });
    };

    useEffect(() => {
        form.reset();
    }, [i18n.language]);

    return (
        <Card className="w-full max-w-lg rounded-lg relative top-10 py-7 px-2 bg-white md:border md:shadow-[0_0px_2px_0_rgba(23,26,31,0.12)]">
            <CardHeader>
                <CardTitle className="font-poppins font-bold text-3xl tracking-normal flex items-center space-x-2">
                <span>{t('LOGIN_FORM.TITLE')}</span>
                <WavingHand/>
                </CardTitle>
                <CardDescription className="font-poppins font-normal text-lg tracking-normal">{t('LOGIN_FORM.DESCRIPTION')}</CardDescription>
            </CardHeader>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3 p-6">
                    <div className="space-y-3">
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field, fieldState }) => (
                            <FormItem>
                                <FormControl className="relative">
                                    <div>
                                        <svg
                                            className="absolute inset-y-0 left-3 top-3 flex items-center text-gray-500"
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="20"
                                            height="20"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="#9095A1"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        >
                                            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                                            <polyline points="22,6 12,13 2,6" />
                                        </svg>                        
                                        <Input
                                            placeholder={t('LOGIN_FORM.PLACEHOLDERS.EMAIL')}
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

                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field, fieldState }) => (
                            <FormItem>
                                <FormControl className="relative">
                                    <div>
                                        <svg
                                            className="absolute inset-y-0 left-3 top-3 flex items-center text-gray-500"
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="20"
                                            height="20"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="#9095A1"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        >
                                            <path d="M15 9.28564L4.99998 9.28564C4.211 9.28564 3.57141 9.92524 3.57141 10.7142L3.57141 16.4285C3.57141 17.2175 4.211 17.8571 4.99998 17.8571L15 17.8571C15.789 17.8571 16.4286 17.2175 16.4286 16.4285V10.7142C16.4286 9.92524 15.789 9.28564 15 9.28564Z" stroke="#9095A1" strokeWidth="1.71429" strokeMiterlimit="10" strokeLinecap="square"/>
                                            <path d="M9.99998 15.0002C10.789 15.0002 11.4286 14.3606 11.4286 13.5716C11.4286 12.7827 10.789 12.1431 9.99998 12.1431C9.211 12.1431 8.57141 12.7827 8.57141 13.5716C8.57141 14.3606 9.211 15.0002 9.99998 15.0002Z" stroke="#9095A1" strokeWidth="1.71429" strokeMiterlimit="10" strokeLinecap="square"/>
                                            <path d="M13.5714 6.42847V5.71418C13.5808 4.77649 13.2173 3.87349 12.561 3.20375C11.9046 2.53401 11.0091 2.15237 10.0714 2.14275H10C9.06233 2.13342 8.15933 2.4969 7.48958 3.15324C6.81984 3.80959 6.4382 4.70507 6.42859 5.64275V6.42847" stroke="#9095A1" strokeWidth="1.71429" strokeMiterlimit="10" strokeLinecap="square"/>
                                        </svg>
                                        <Input
                                            type={showPassword ? 'text' : 'password'}
                                            placeholder={t('LOGIN_FORM.PLACEHOLDERS.PASSWORD')}
                                            {...field}
                                            className={`w-full pl-10 h-[43px] rounded-lg bg-gray-200 ${
                                            fieldState.invalid ? "border-red-500" : ""
                                            }`}
                                        />
                                        <Button
                                                type="button"
                                                className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700"
                                                onClick={() => setShowPassword(!showPassword)}
                                                >
                                                {showPassword ? (
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        width="16"
                                                        height="16"
                                                        viewBox="0 0 24 24"
                                                        fill="none"
                                                        stroke="#9095A1"
                                                        strokeWidth="2"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        className="lucide lucide-eye-off"
                                                    >
                                                    <path d="M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49" />
                                                    <path d="M14.084 14.158a3 3 0 0 1-4.242-4.242" />
                                                    <path d="M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143" />
                                                    <path d="m2 2 20 20" />
                                                    </svg>
                                                ) : (
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        width="16"
                                                        height="16"
                                                        viewBox="0 0 24 24"
                                                        fill="none"
                                                        stroke="#9095A1"
                                                        strokeWidth="2"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        className="lucide lucide-eye"
                                                    >
                                                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                                                    <circle cx="12" cy="12" r="3" />
                                                    </svg>
                                                )}
                                            </Button>
                                    </div>
                                </FormControl>      
                                <FormMessage>{fieldState.error?.message}</FormMessage>                  
                            </FormItem>
                            )}
                        />
                    </div>
                    <FormField
                        control={form.control}
                        name="rememberMe"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl className="flex items-center space-x-">
                                    <div className="flex items-center space-x-2 pt-2">                                        
                                        <Input
                                            type="checkbox"
                                            id="rememberMe"
                                            checked={field.value || false}
                                            onChange={field.onChange}
                                            className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
                                        />
                                        <label htmlFor="rememberMe" className="text-sm text-gray-700 cursor-pointer">
                                            {t('LOGIN_FORM.LABELS.REMEMBER_ME')}
                                        </label>
                                        <Link to="/auth/forgot-password" className="flex font-poppins font-medium text-sm leading-[22px] tracking-normal text-right text-[#e64560]">
                                            {t('LOGIN_FORM.LABELS.FORGOT_PASSWORD')}
                                        </Link>                                
                                    </div>
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    <Button 
                        type="submit" 
                        className="w-full rounded-xl py-6 bg-[#e64560] mt-5 cursor-pointer"
                        disabled={isLoading}>
                        {isLoading ? (
                            <svg
                                className="animate-spin h-5 w-5 text-white mx-auto"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                            >
                                <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                                ></circle>
                                <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8v8H4z"
                                ></path>
                            </svg>
                            ) : (
                            t("LOGIN_FORM.BUTTONS.LOGIN")
                        )}
                    </Button>
                </form>
            </Form>
        </Card>
    );
}

export default LoginForm;