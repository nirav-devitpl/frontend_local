import { loginSchema } from '@/validation-schema/login';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { cn, getToken, setToken } from '@/lib/utils';
import { Button } from '@/components/custom/button';
import { useLoginMutation } from '@/services/auth';
import showToast from "@/components/common/toast";
import { Link, useNavigate } from 'react-router';

/**
 * Login form component
 * @returns Login form component
 * @description This component is used to login a user
 */
function LoginForm() {
    const navigate = useNavigate();
    const form = useForm<z.infer<typeof loginSchema>>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const [login] = useLoginMutation();

    /**
     * @function onSubmit
     * @description This function is used to login a user
     * @param {z.infer<typeof loginSchema>} data - The data to login a user
     */
    const onSubmit = (data: z.infer<typeof loginSchema>) => {
        const payload = {
            admEmailId: data.email,
            admPassword: data.password,
        }
        login(payload).then((res: any) => {
            if (res?.data?.success) {
                showToast(res?.data?.message, "success");
                setToken(res?.data?.result?.token);

            } else {
                showToast(res?.error?.data?.message, "error");
            }
            setTimeout(() => {
                if (getToken() !== null) {
                    navigate("/");
                }
            }, 2000);
        }).catch((err) => {
            console.error(err?.data?.message);
            showToast(err?.data?.message, "error");
        });
    }

    /**
     * @function LoginForm
     * @description This function is used to render the login form
     * @returns Login form component
     */
    return (
        <div>
            <div className="flex flex-col gap-4">
                <h1 className="text-2xl font-bold">Login</h1>
                <p className="text-sm text-muted-foreground">Enter your email and password to login</p>
            </div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
                                <div className="flex justify-end">
                                    <Link to="/auth/forgot-password" className="text-sm text-muted-foreground hover:text-primary">Forgot password?</Link>
                                </div>
                                <FormMessage className="text-sm">{fieldState.error?.message}</FormMessage>
                            </FormItem>
                        )}
                    />
                    <Link to="/auth/sign-up" className="text-sm text-muted-foreground">Don't have an account? <span className="text-primary">Sign up</span></Link>
                    <Button type="submit" className="w-full mt-2">Login</Button>
                </form>
            </Form>
        </div>
    )
}

export default LoginForm;