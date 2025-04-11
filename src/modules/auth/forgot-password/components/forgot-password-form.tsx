import { forgotPasswordSchema } from "@/validation-schema/forgot-password";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useNavigate } from "react-router";
import { useForgotPasswordMutation } from "@/services/auth";
import showToast from "@/components/common/toast";
import { Button } from "@/components/custom/button";
import { cn } from "@/lib/utils";
import { Contact } from "lucide-react";


/**
 * @function ForgotPasswordForm
 * @description This function is used to render the forgot password form
 * @returns Forgot password form component
 */
function ForgotPasswordForm() {
    const navigate = useNavigate();

    const form = useForm<z.infer<typeof forgotPasswordSchema>>({
        resolver: zodResolver(forgotPasswordSchema),
        defaultValues: {
            email: "",
        },
    });

    const [forgotPassword] = useForgotPasswordMutation();

    /**
     * @function onSubmit
     * @description This function is used to submit the forgot password form
     * @param {z.infer<typeof forgotPasswordSchema>} data - The data to submit the forgot password form
     */
    const onSubmit = (data: z.infer<typeof forgotPasswordSchema>) => {
        const payload = {
            path: "auth/reset-password",
            email: data.email,
        }
        forgotPassword(payload).unwrap().then((res) => {
            showToast(res?.message, "success");
            setTimeout(() => {
                window.location.href = `${res?.result?.forgotPasswordLink}`;
            }, 1000);
        }).catch((err) => {
            console.log(err);
            showToast(err?.data?.message, "error");
        });
    };

    /**
     * @function ForgotPasswordForm
     * @description This function is used to render the forgot password form
     * @returns Forgot password form component
     */
    return (
        <div>
            <div className="flex flex-col gap-4">
                <h1 className="text-2xl font-bold">Forgot Password</h1>
                <p className="text-sm text-muted-foreground">Enter your email to reset your password</p>
            </div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field, fieldState }) => (
                            <FormItem>
                                <FormLabel
                                    className={cn('h-9', {
                                        'text-foreground': fieldState.invalid,
                                    })}
                                >
                                    Email
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        className={cn('h-9', {
                                            'border-red-500 focus:outline-red-500':
                                                fieldState.invalid,
                                        })}
                                        placeholder="Enter email"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage className="text-sm">{fieldState.error?.message}</FormMessage>
                            </FormItem>
                        )}
                    />
                    <Button type="submit" className="w-full mt-2">Submit</Button>
                </form>
            </Form>
        </div>
    )
}

export default ForgotPasswordForm;
