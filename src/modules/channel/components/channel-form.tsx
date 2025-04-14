import Selectable from '@/components/common/dropdown';
import { Input } from '@/components/ui/input';
import { cn, formattedOptions } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form';
import { z } from 'zod';
import showToast from '@/components/common/toast';
import { Button } from '@/components/custom/button';
import { useEffect } from 'react';
import {
  useCreateChannelMutation,
  useGetChannelByIdQuery,
  useUpdateChannelMutation,
} from '@/services/channel';
import { channelSchema } from '@/validation-schema/channel';
import { useNavigate, useParams } from 'react-router';
import { SOURCE_LIST, TYPE_LIST } from '../utils/dropdown-data';
import { ChannelFormData } from '@/models/channel';
import { randomPassword } from 'secure-random-password';
 
/**
 * Function to render the channel form
 * @returns channel form component
 */
function ChannelForm() {
  const { id } = useParams();
 
  const navigate = useNavigate();
 
  const [createChannel] = useCreateChannelMutation();
  const { data: channel, isLoading } = useGetChannelByIdQuery(id, {
    skip: !id,
  });
  const [updateChannel] = useUpdateChannelMutation();
  const form = useForm<z.infer<typeof channelSchema>>({
    resolver: zodResolver(channelSchema),
    defaultValues: {
      name: '',
      code: '',
      type:null,
      source: null,
      username: '',
      password: '',
      client_code: '',
    },
  });
 
  /**
   * Function to handle the form submission
   * @param data form data
   */
  const onSubmit = (data: z.infer<typeof channelSchema>) => {
    const payload = {
      ...data,
      ...(id && { id: parseInt(id) }),
      code: parseInt(data.code),
      client_code: parseInt(data.client_code),
      source: `${data?.source?.value}`,
      type: `${data?.type?.value}`,
    };
 
    const action = id ? updateChannel : createChannel;
    action(payload)
      .then((res) => {
        showToast('Channel Added successfully', 'success');
        navigate('/channel-manager');
      })
      .catch((err) => {
        showToast(err?.data?.message, 'error');
      });
  };
 
  /**
   * Function to handle the form submission
   * @param data form data
   * @description This function is used to reset the form values
   */
  useEffect(() => {
    if (id && channel) {
      const type = TYPE_LIST.find((x) => x.value == channel.result.type);
      const source = SOURCE_LIST.find((x) => x.value == channel.result.source);
      const payload: ChannelFormData = {
        ...channel?.result,
        type,
        source,
        code: channel?.result?.code.toString(),
      };
      form.reset(payload);
    }
  }, [id, channel?.result, form.reset]);
 
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid grid-cols-3 gap-4"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel
                className={cn('h-9', {
                  'text-foreground': fieldState.invalid,
                })}
              >
                Name <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <Input
                  className={cn('h-9', {
                    'border-red-500 focus:outline-red-500': fieldState.invalid,
                  })}
                  placeholder="Name"
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-sm">
                {fieldState.error?.message}
              </FormMessage>
            </FormItem>
          )}
        />
 
        <FormField
          control={form.control}
          name="code"
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel
                className={cn('h-9', {
                  'text-foreground': fieldState.invalid,
                })}
              >
                Code <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <Input
                  className={cn('h-9', {
                    'border-red-500 focus:outline-red-500': fieldState.invalid,
                  })}
                  placeholder="Code"
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-sm">
                {fieldState.error?.message}
              </FormMessage>
            </FormItem>
          )}
        />
 
        <FormField
          control={form.control}
          name="type"
          render={({ field , fieldState}) => (
            <FormItem>
              <div className="flex justify-start gap-1.5 items-center mt-5">
                <FormLabel>Type</FormLabel>
              </div>
              <FormControl>
                <Selectable
                placeholder={"Select Type"}
                  list={formattedOptions(TYPE_LIST, 'value', 'label')}
                  handleSelectOnChange={field.onChange}
                  selectValue={field.value}
                  isLoading={false}
                />
              </FormControl>
              <FormMessage className="text-sm">
                {fieldState.error?.message}
              </FormMessage>
            </FormItem>
          )}
        />
 
        <div className="col-span-3">
          <FormField
            control={form.control}
            name="source"
            render={({ field , fieldState}) => (
              <FormItem className="w-1/4">
                <div className="flex justify-start gap-1.5 items-center mt-5 ">
                  <FormLabel>Source</FormLabel>
                </div>
                <FormControl>
                  <Selectable
                    placeholder="Select Source"
                    list={formattedOptions(SOURCE_LIST, 'value', 'label')}
                    handleSelectOnChange={field.onChange}
                    selectValue={field.value}
                    isLoading={false}
                  />
                </FormControl>
                <FormMessage className="text-sm">
                {fieldState.error?.message}
              </FormMessage>
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="username"
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel
                className={cn('h-9', {
                  'text-foreground': fieldState.invalid,
                })}
              >
                Username <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <div className="flex items-center">
                  <Input
                    className={cn('h-9', {
                      'border-red-500 focus:outline-red-500': fieldState.invalid,
                    })}
                    placeholder="Username"
                    {...field}
                  />
                  <button
                    type="button"
                    className="p-1 text-gray-500 hover:text-gray-700"
                    onClick={() => {
                      navigator.clipboard.writeText(field.value || '');
                      showToast('Username copied to clipboard', 'success'); // Optional toast notification
                    }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#F81E1E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-copy-icon lucide-copy">
                      <rect width="14" height="14" x="8" y="8" rx="2" ry="2"/>
                      <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/>
                    </svg>
                  </button>
                </div>
              </FormControl>
              <FormMessage className="text-sm">
                {fieldState.error?.message}
              </FormMessage>
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
                Password <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <div className="flex items-center">
                  <Input
                  type='password'
                    className={cn('h-9', {
                      'border-red-500 focus:outline-red-500': fieldState.invalid,
                    })}
                    placeholder="Password"
                    {...field}
                  />
                  <button
                    type="button"
                    className="p-1 text-gray-500 hover:text-gray-700"
                    onClick={() => {
                      const newPassword = randomPassword({
                        length: 12,
                        numbers: true,
                        symbols: true,
                        uppercase: true,
                        lowercase: true,
                      });
                      field.onChange(newPassword); // Update the password field
                      showToast('Password generated successfully', 'success'); // Optional toast notification
                    }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#F81E1E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-key-round-icon lucide-key-round"><path d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z"/>
                      <circle cx="16.5" cy="7.5" r=".5" fill="#F81E1E"/>
                    </svg>
                  </button>                  
                  <button
                    type="button"
                    className="p-1 text-gray-500 hover:text-gray-700"
                    onClick={() => {
                      navigator.clipboard.writeText(field.value || '');
                      showToast('Password copied to clipboard', 'success'); // Optional toast notification
                    }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#F81E1E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-copy-icon lucide-copy">
                      <rect width="14" height="14" x="8" y="8" rx="2" ry="2"/>
                      <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/>
                    </svg>
                  </button>
                </div>
              </FormControl>
              <FormMessage className="text-sm">
                {fieldState.error?.message}
              </FormMessage>
            </FormItem>
          )}
        />
 
        <FormField
          control={form.control}
          name="client_code"
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel
                className={cn('h-9', {
                  'text-foreground': fieldState.invalid,
                })}
              >
                Client code <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <div className="flex items-center">
                  <Input
                    className={cn('h-9', {
                      'border-red-500 focus:outline-red-500': fieldState.invalid,
                    })}
                    placeholder="Client code"
                    {...field}
                  />
                  <button
                    type="button"
                    className="p-1 text-gray-500 hover:text-gray-700"
                    onClick={() => {
                      navigator.clipboard.writeText(field.value || '');
                      showToast('Password copied to clipboard', 'success'); // Optional toast notification
                    }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#F81E1E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-copy-icon lucide-copy">
                      <rect width="14" height="14" x="8" y="8" rx="2" ry="2"/>
                      <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/>
                    </svg>
                  </button>
                </div>
              </FormControl>
              <FormMessage className="text-sm">
                {fieldState.error?.message}
              </FormMessage>
            </FormItem>
          )}
        /> 
        <Button type="submit" variant="destructive" className="mt-4 w-1/2">
          Save
        </Button>
      </form>
    </Form>
  );
}
 
export default ChannelForm;