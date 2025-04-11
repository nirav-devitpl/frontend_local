import { useRegisterMutation } from "@/services/auth";
import { registerSchema } from "@/validation-schema/register";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { cn } from "@/lib/utils";
import { Button } from "@/components/custom/button";
import { Link, useNavigate } from "react-router";
import showToast from "@/components/common/toast";



/**
 * @function RegisterForm
 * @description This function is used to render the register form
 * @returns Register form component
 */
function RegisterForm() {
    const navigate = useNavigate();
    const form = useForm<z.infer<typeof registerSchema>>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            confirmPassword: "",
        },
    });

    const [register] = useRegisterMutation();

    /**
     * @function onSubmit
     * @description This function is used to register a user
     * @param {z.infer<typeof registerSchema>} data - The data to register a user
     */
    const onSubmit = (data: z.infer<typeof registerSchema>) => {
        register(data).unwrap().then((res) => {
            showToast(res?.message, "success");
            navigate("/auth/sign-in");
            
        }).catch((err) => {
            console.log(err);
        });
    };

    /**
     * @function RegisterForm
     * @description This function is used to render the register form
     * @returns Register form component
     */
    return (
        <div>
            <div className="flex flex-col gap-4">
                <h1 className="text-2xl font-bold">Register</h1>
                <p className="text-sm text-muted-foreground">Create an account to continue</p>
            </div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>

                    {/* First Name */}
                    <FormField
                        control={form.control}
                        name="firstName"
                        render={({ field, fieldState }) => (
                            <FormItem>
                                <FormLabel
                                    className={cn('h-9', {
                                        'text-foreground': fieldState.invalid,
                                    })}
                                >
                                    First Name
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        className={cn('h-9', {
                                            'border-red-500 focus:outline-red-500':
                                                fieldState.invalid,
                                        })}
                                        placeholder="Enter first name"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage className="text-sm">{fieldState.error?.message}</FormMessage>
                            </FormItem>
                        )}
                    />

                    {/* Last Name */}
                    <FormField
                        control={form.control}
                        name="lastName"
                        render={({ field, fieldState }) => (
                            <FormItem>
                                <FormLabel
                                    className={cn('h-9', {
                                        'text-foreground': fieldState.invalid,
                                    })}
                                >
                                    Last Name
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        className={cn('h-9', {
                                            'border-red-500 focus:outline-red-500':
                                                fieldState.invalid,
                                        })}
                                        placeholder="Enter last name"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage className="text-sm">{fieldState.error?.message}</FormMessage>
                            </FormItem>
                        )}
                    />

                    {/* Email */}
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
                    <Link to="/auth/sign-in" className="text-sm text-muted-foreground">Already have an account? <span className="text-primary">Sign in</span></Link>
                    <Button type="submit" className="w-full mt-2">Register</Button>
                </form>
            </Form>
        </div>
    );
}

export default RegisterForm;
