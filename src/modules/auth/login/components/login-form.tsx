import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormField, FormItem, FormControl, FormMessage } from "@/components/ui/form";
import { loginSchema } from "@/validation-schema/login";
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
import {HandIcon, LockIcon, EyeOff, Eye, LoadingIcon} from "@/components/common/icon";

/**
 * @memberof auth
 * @name LoginForm
 * @description LoginForm component renders a login form with fields for email, password, and a remember me checkbox. It includes validation, localization, and handles login functionality.
 * @returns {JSX.Element} - The rendered LoginForm component.
 */
function LoginForm() {

    const { t } = useTranslation();
    const [login, { isLoading }] = useLoginMutation();
    const [showPassword, setShowPassword] = useState(false);

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
                <CardDescription className="flex items-center font-poppins font-normal text-[20px] text-[#9095a1]">{t('LOGIN_FORM.DESCRIPTION')}</CardDescription>
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
                                        <HandIcon />                      
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
                                        <LockIcon />
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
                                                className="absolute inset-y-0 right-1 top-1 flex items-cente border-0 cursor-pointer"
                                                onClick={() => setShowPassword(!showPassword)}
                                                >
                                                {showPassword ? (
                                                    <EyeOff />
                                                ) : (
                                                    <Eye />
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
                            <LoadingIcon />
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