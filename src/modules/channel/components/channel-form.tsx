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
import { JSX, useEffect, useState } from 'react';
import {
  useCreateChannelMutation,
  useGetChannelByIdQuery,
  useUpdateChannelMutation,
} from '@/services/channel';
import { getChannelSchema } from '../../../validation-schema/channel';
import { useNavigate, useParams } from 'react-router';
import { SOURCE_LIST, TYPE_LIST } from '../utils/dropdown-data';
import { ChannelFormData } from '@/models/channel';
import { useTranslation } from 'react-i18next';
import i18n from '@/assets/i18n';
import { CopyButton } from '../utils/copy-button';
import PasswordField from '@/modules/channel/utils/password-button';

// Utility function for input class names
const getInputClassName = (fieldState: any) =>
  cn('h-9 border border-gray-300', {
    'border-red-500 focus:outline-red-500': fieldState.invalid,
  });

// Reusable FormField Component
const CustomFormField = ({
  control,
  name,
  label,
  placeholder,
  isRequired = false,
  renderInput,
}: {
  control: any;
  name: string;
  label: string;
  placeholder: string;
  isRequired?: boolean;
  renderInput: (field: any, fieldState: any) => JSX.Element;
}) => (
  <FormField
    control={control}
    name={name}
    render={({ field, fieldState }) => (
      <FormItem>
        <FormLabel>
          {label} {isRequired && <span className="text-red-500">*</span>}
        </FormLabel>
        <FormControl>{renderInput(field, fieldState)}</FormControl>
        <FormMessage>
          {fieldState.error?.message ?? ''}
        </FormMessage>
      </FormItem>
    )}
  />
);

function ChannelForm({
  setSubmitHandler,
}: Readonly<{
  setSubmitHandler: (submitHandler: () => void) => void;
}>) {
  const { t } = useTranslation();
  const { id } = useParams();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const [createChannel] = useCreateChannelMutation();
  const { data: channel } = useGetChannelByIdQuery(id, { skip: !id });
  const [updateChannel] = useUpdateChannelMutation();

  const schema = getChannelSchema();

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: '',
      code: '',
      type: null,
      source: null,
      username: '',
      password: '',
      client_code: '',
    },
  });

  useEffect(() => {
    setSubmitHandler(() => form.handleSubmit(onSubmit));
  }, [form, setSubmitHandler]);

  const onSubmit = (data: z.infer<typeof schema>) => {
    const payload = {
      ...data,
      ...(id && { id: parseInt(id) }),
      code: parseInt(data.code),
      client_code: parseInt(data.client_code),
      source: `${data?.source?.value}`,
      type: `${data?.type?.value}`,
    };

    const action = id ? updateChannel : createChannel;
    action({ ...payload })
      .unwrap()
      .then((response) => {
        if (response?.status === 'success' || response?.status === 200 || response?.status === 201) {
          showToast(response?.message, 'success');
          navigate('/channel-manager');
        } else {
          showToast(response?.message, 'error');
        }
      })
      .catch((err) => {
        const errorMessage = err?.data?.message ?? 'An unexpected error occurred';
        console.error('Error:', err);
        showToast(errorMessage, 'error');
      });
  };
  
  /*
    * Reset form values when the component mounts or when the language changes
    * This ensures that the form is reset to its initial state when the component is rendered or when the language changes
  */
  useEffect(() => {
    if (id && channel) {
      const type = TYPE_LIST.find((x) => x.value === channel.result.type);
      const source = SOURCE_LIST.find((x) => x.value === channel.result.source);
      const payload: ChannelFormData = {
        ...channel.result,
        type,
        source,
        code: channel.result.code.toString(),
        client_code: channel.result.client_code.toString(),
      };
      form.reset(payload as any);
    } else {
      form.reset();
    }
  }, [id, channel?.result, form, i18n.language]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-3 gap-4">
        {/* Name Field */}
        <CustomFormField
          control={form.control}
          name="name"
          label={t('FORM.NAME')}
          placeholder={t('FORM.NAME')}
          isRequired
          renderInput={(field, fieldState) => (
            <Input className={getInputClassName(fieldState)} placeholder={t('FORM.NAME')} {...field} />
          )}
        />

        {/* Code Field */}
        <CustomFormField
          control={form.control}
          name="code"
          label={t('FORM.CODE')}
          placeholder={t('FORM.CODE')}
          isRequired
          renderInput={(field, fieldState) => (
            <Input className={getInputClassName(fieldState)} placeholder={t('FORM.CODE')} {...field} />
          )}
        />

        {/* Type Field */}
        <CustomFormField
          control={form.control}
          name="type"
          label={t('FORM.TYPE')}
          placeholder={t('FORM.TYPE')}
          renderInput={(field) => (
            <Selectable
              placeholder={t('FORM.TYPE')}
              list={formattedOptions(TYPE_LIST, 'value', 'label')}
              handleSelectOnChange={field.onChange}
              selectValue={field.value ?? TYPE_LIST.find((type) => type.value === 'Inbound')}
              isLoading={false}
            />
          )}
        />

        {/* Source Field */}
        <CustomFormField
          control={form.control}
          name="source"
          label={t('FORM.SOURCE')}
          placeholder={t('FORM.SOURCE')}
          renderInput={(field) => (
            <Selectable
              placeholder={t('FORM.SOURCE')}
              list={formattedOptions(SOURCE_LIST, 'value', 'label')}
              handleSelectOnChange={field.onChange}
              selectValue={field.value ?? SOURCE_LIST.find((type) => type.value === 'PMS')}
              isLoading={false}
            />
          )}
        />

        {/* Username Field */}
        <CustomFormField
          control={form.control}
          name="username"
          label={t('FORM.USERNAME')}
          placeholder={t('FORM.USERNAME')}
          isRequired
          renderInput={(field, fieldState) => (
            <div className="flex items-center">
              <Input
                className={getInputClassName(fieldState)}
                placeholder={t('FORM.USERNAME')}
                {...field}
              />
              <CopyButton value={field.value} />
            </div>
          )}
        />

        {/* Password Field */}
        <CustomFormField
          control={form.control}
          name="password"
          label={t('FORM.PASSWORD')}
          placeholder={t('FORM.PASSWORD')}
          isRequired
          renderInput={(field, fieldState) => (
            <PasswordField
              field={field}
              fieldState={fieldState}
              showPassword={showPassword}
              setShowPassword={setShowPassword}
              id={id}
            />
          )}
        />

        {/* Client Code Field */}
        <CustomFormField
          control={form.control}
          name="client_code"
          label={t('FORM.CLIENT_CODE')}
          placeholder={t('FORM.CLIENT_CODE')}
          isRequired
          renderInput={(field, fieldState) => (
            <div className="flex items-center">
              <Input
                className={getInputClassName(fieldState)}
                placeholder={t('FORM.CLIENT_CODE')}
                {...field}
              />
              <CopyButton value={field.value} />
            </div>
          )}
        />

        {/* Link Field */}
        {(form.watch('type')?.value === 'Inbound' || !id) &&
          (form.watch('source')?.value === 'PMS' || !id) && (
            <FormItem>
              <FormLabel>{t('FORM.LINK')}</FormLabel>
              <FormControl>
                <div className="flex items-center">
                  <p className="text-gray-700">{import.meta.env.VITE_API_BASE_URL}</p>
                  <CopyButton value={import.meta.env.VITE_API_BASE_URL ?? ''} />
                </div>
              </FormControl>
            </FormItem>
          )}
      </form>
    </Form>
  );
}

export default ChannelForm;