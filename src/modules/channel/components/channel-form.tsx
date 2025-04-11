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
                <Input
                  className={cn('h-9', {
                    'border-red-500 focus:outline-red-500': fieldState.invalid,
                  })}
                  placeholder="Username"
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
                <Input
                 type='password'
                  className={cn('h-9', {
                    'border-red-500 focus:outline-red-500': fieldState.invalid,
                  })}
                  placeholder="Password"
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
                <Input
                  className={cn('h-9', {
                    'border-red-500 focus:outline-red-500': fieldState.invalid,
                  })}
                  placeholder="Client code"
                  {...field}
                />
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