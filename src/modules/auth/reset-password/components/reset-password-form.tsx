import showToast from "@/components/common/toast";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useResetPasswordMutation } from "@/services/auth";
import { resetPasswordSchema } from "@/validation-schema/reset-password";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useParams } from "react-router";
import { z } from "zod";
import { cn } from "@/lib/utils";
import { IconCheck, IconX } from "@tabler/icons-react";
import { Button } from "@/components/custom/button";
import { useNavigate } from "react-router";

/**
 * @function ResetPasswordForm
 * @description This function is used to render the reset password form
 * @returns Reset password form component
 */
function ResetPasswordForm() {
    const navigate = useNavigate();
    const [resetPassword] = useResetPasswordMutation();
    const { token } = useParams();
    const form = useForm<z.infer<typeof resetPasswordSchema>>({
        resolver: zodResolver(resetPasswordSchema),
        defaultValues: {
            password: "",
            confirmPassword: "",
        },
    });

    /**
     * @function onSubmit
     * @description This function is used to submit the reset password form
     * @param {z.infer<typeof resetPasswordSchema>} data - The data to submit the reset password form
     */
    const onSubmit = (data: z.infer<typeof resetPasswordSchema>) => {
        const payload = {
            password: data.password,
        }
        resetPassword(payload).unwrap().then((res) => {
            showToast(res?.message, "success");
            navigate("/auth/sign-in");
        }).catch((err) => {
            console.error(err);
            showToast(err?.data?.message, "error");
        });
    };

    /**
     * @function ResetPasswordForm
     * @description This function is used to render the reset password form
     * @returns Reset password form component
     */
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                {/* Password */}
                <FormField
                    control={form.control}
                    name="password"
                    render={({ field, fieldState }) => (
                        <FormItem>
                            <FormLabel
                                className={cn('h-9', {
                                    'text-foreground': fieldState.invalid,
                                })}
                            >
                                Password
                            </FormLabel>
                            <FormControl>
                                <Input
                                    className={cn('h-9', {
                                        'border-red-500 focus:outline-red-500':
                                            fieldState.invalid,
                                    })}
                                    placeholder="Enter password"
                                    type="password"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage className="text-sm">{fieldState.error?.message}</FormMessage>
                        </FormItem>
                    )}
                />
                <div>
                    <div className="flex gap-2 items-center text-sm">
                        {/[A-Z]/.test(form.watch("password")) ? (
                            <IconCheck className="text-green-500" />
                        ) : (
                            <IconX className="text-red-500" />
                        )} At least one uppercase letter
                    </div>
                    <div className="flex gap-2 items-center text-sm">
                        {/[a-z]/.test(form.watch("password")) ? (
                            <IconCheck className="text-green-500" />
                        ) : (
                            <IconX className="text-red-500" />
                        )} At least one lowercase letter
                    </div>
                    <div className="flex gap-2 items-center text-sm">
                        {/[^A-Za-z0-9]/.test(form.watch("password")) ? (
                            <IconCheck className="text-green-500" />
                        ) : (
                            <IconX className="text-red-500" />
                        )} At least one special character
                    </div>
                    <div className="flex gap-2 items-center text-sm">
                        {/[0-9]/.test(form.watch("password")) ? (
                            <IconCheck className="text-green-500" />
                        ) : (
                            <IconX className="text-red-500" />
                        )} At least one number
                    </div>


                </div>

                {/* Confirm Password */}
                <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field, fieldState }) => (
                        <FormItem>
                            <FormLabel
                                className={cn('h-9', {
                                    'text-foreground': fieldState.invalid,
                                })}
                            >
                                Confirm Password
                            </FormLabel>
                            <FormControl>
                                <Input
                                    className={cn('h-9', {
                                        'border-red-500 focus:outline-red-500':
                                            fieldState.invalid,
                                    })}
                                    placeholder="Enter confirm password"
                                    type="password"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage className="text-sm">{fieldState.error?.message}</FormMessage>
                        </FormItem>
                    )}
                />

                <Button type="submit" className="w-full mt-2">Reset Password</Button>
            </form>
        </Form>
    );
}

export default ResetPasswordForm;
