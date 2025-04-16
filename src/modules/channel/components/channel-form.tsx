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
import { useEffect, useState } from 'react';
import {
  useCreateChannelMutation,
  useGetChannelByIdQuery,
  useUpdateChannelMutation,
} from '@/services/channel';
import { getChannelSchema } from '../../../validation-schema/channel';
import { useNavigate, useParams } from 'react-router';
import { SOURCE_LIST, TYPE_LIST } from '../utils/dropdown-data';
import { ChannelFormData } from '@/models/channel';
import generatePassword from 'generate-password-browser';
import { useTranslation } from 'react-i18next';
import i18n from '@/assets/i18n';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import PasswordChangeModal from '@/components/common/password-change-modal';
import { t } from 'i18next';

// CopyButton Component
const CopyButton = ({ value }: { value: string }) => (
  <button
    type="button"
    className="p-1 text-gray-500 hover:text-gray-700 cursor-pointer"
    onClick={(event) => {
      navigator.clipboard.writeText(value || '');
      const button = event.currentTarget;
      button.classList.add('border', 'border-[#F81E1E]', 'rounded');

      setTimeout(() => {
        button.classList.remove('border', 'border-[#F81E1E]', 'rounded');
      }, 200);
    }}
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#F81E1E"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="lucide lucide-copy"
    >
      <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
      <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
    </svg>
  </button>
);

// PasswordField Component
const PasswordField = ({
  field,
  fieldState,
  showPassword,
  setShowPassword,
  id,
}: {
  field: any;
  fieldState: any;
  showPassword: boolean;
  setShowPassword: (value: boolean) => void;
  id?: string;
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  function handlePasswordChange(): void {
    const newPassword = generatePassword.generate({
      length: 12,
      numbers: true,
      symbols: true,
      uppercase: true,
      lowercase: true,
      strict: true,
    });
    field.onChange(newPassword);
    setIsModalOpen(false);
  }

  return (
    <div className="flex items-center gap-2 w-full">
      <div className="relative w-full">
        <Input
          type={showPassword ? 'text' : 'password'}
          className={cn('h-9 pr-10 border border-gray-300', {
            'border-red-500 focus:outline-red-500': fieldState.invalid,
          })}
          placeholder="Password"
          {...field}
        />
        <button
          type="button"
          className="absolute inset-y-0 right-2 flex items-center text-gray-500 hover:text-gray-700"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#F81E1E"
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
              stroke="#F81E1E"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-eye"
            >
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
              <circle cx="12" cy="12" r="3" />
            </svg>
          )}
        </button>
      </div>
      <button
        type="button"
        className="p-1 cursor-pointer"
        onClick={() => (id ? setIsModalOpen(true) : handlePasswordChange())}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#F81E1E"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="lucide lucide-key-round"
        >
          <path d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z" />
          <circle cx="16.5" cy="7.5" r=".5" fill="#F81E1E" />
        </svg>
      </button>
      <CopyButton value={field.value} />

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="p-4 w-[400px]">
          <PasswordChangeModal
            message={t('MODAL.PASSWORD_CHANGE_CONFIRMATION')}
            handlePasswordChange={() => handlePasswordChange()}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

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

  useEffect(() => {
    form.reset();
  }, [i18n.language]);

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
    }
  }, [id, channel?.result, form]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-3 gap-4">
        {/* Name Field */}
        <FormField
          control={form.control}
          name="name"
          render={({ field: formField, fieldState }) => (
            <FormItem>
              <FormLabel>
                {t('FORM.NAME')} <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <Input
                  className={cn('h-9 border border-gray-300', {
                    'border-red-500 focus:outline-red-500': fieldState.invalid,
                  })}
                  placeholder={t('FORM.NAME')}
                  {...formField}
                />
              </FormControl>
              <FormMessage>
                {fieldState.error?.message ? t(fieldState.error.message) : ''}
              </FormMessage>
            </FormItem>
          )}
        />

        {/* Code Field */}
        <FormField
          control={form.control}
          name="code"
          render={({ field: formField, fieldState }) => (
            <FormItem>
              <FormLabel>
                {t('FORM.CODE')} <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <Input
                  className={cn('h-9 border border-gray-300', {
                    'border-red-500 focus:outline-red-500': fieldState.invalid,
                  })}
                  placeholder={t('FORM.CODE')}
                  {...formField}
                />
              </FormControl>
              <FormMessage>
                {fieldState.error?.message ? t(fieldState.error.message) : ''}
              </FormMessage>
            </FormItem>
          )}
        />

        {/* Type Field */}
        <FormField
          control={form.control}
          name="type"
          render={({ field: formField, fieldState }) => (
            <FormItem>
              <FormLabel>{t('FORM.TYPE')}</FormLabel>
                <FormControl>
                <Selectable
                  placeholder={t('FORM.TYPE')}
                  list={formattedOptions(TYPE_LIST, 'value', 'label')}
                  handleSelectOnChange={formField.onChange}
                  selectValue={formField.value ?? TYPE_LIST.find((type) => type.value === 'Inbound')}
                  isLoading={false}
                />
                </FormControl>
              <FormMessage>
                {fieldState.error?.message ? t(fieldState.error.message) : ''}
              </FormMessage>
            </FormItem>
          )}
        />

        {/* Source Field */}
        <FormField
          control={form.control}
          name="source"
          render={({ field: formField, fieldState }) => (
            <FormItem>
              <FormLabel>{t('FORM.SOURCE')}</FormLabel>
              <FormControl>
                <Selectable
                  placeholder={t('FORM.SOURCE')}
                  list={formattedOptions(SOURCE_LIST, 'value', 'label')}
                  handleSelectOnChange={formField.onChange}
                  selectValue={formField.value ?? SOURCE_LIST.find((type) => type.value === 'PMS')}
                  isLoading={false}
                />
              </FormControl>
              <FormMessage>
                {fieldState.error?.message ? t(fieldState.error.message) : ''}
              </FormMessage>
            </FormItem>
          )}
        />

        {/* Username Field */}
        <FormField
          control={form.control}
          name="username"
          render={({ field: formField, fieldState }) => (
            <FormItem>
              <FormLabel>
                {t('FORM.USERNAME')} <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <div className="flex items-center">
                  <Input
                    className={cn('h-9 border border-gray-300', {
                      'border-red-500 focus:outline-red-500': fieldState.invalid,
                    })}
                    placeholder={t('FORM.USERNAME')}
                    {...formField}
                  />
                  <CopyButton value={formField.value} />
                </div>
              </FormControl>
              <FormMessage>
                {fieldState.error?.message ? t(fieldState.error.message) : ''}
              </FormMessage>
            </FormItem>
          )}
        />

        {/* Password Field */}
        <FormField
          control={form.control}
          name="password"
          render={({ field: formField, fieldState }) => (
            <FormItem>
              <FormLabel>
                {t('FORM.PASSWORD')} <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <PasswordField
                  field={formField}
                  fieldState={fieldState}
                  showPassword={showPassword}
                  setShowPassword={setShowPassword}
                  id={id}
                />
              </FormControl>
              <FormMessage>
                {fieldState.error?.message ? t(fieldState.error.message) : ''}
              </FormMessage>
            </FormItem>
          )}
        />

        {/* Client Code Field */}
        <FormField
          control={form.control}
          name="client_code"
          render={({ field: formField, fieldState }) => (
            <FormItem>
              <FormLabel>
                {t('FORM.CLIENT_CODE')} <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <div className="flex items-center">
                  <Input
                    className={cn('h-9 border border-gray-300', {
                      'border-red-500 focus:outline-red-500': fieldState.invalid,
                    })}
                    placeholder={t('FORM.CLIENT_CODE')}
                    {...formField}
                  />
                  <CopyButton value={formField.value} />
                </div>
              </FormControl>
              <FormMessage>
                {fieldState.error?.message ? t(fieldState.error.message) : ''}
              </FormMessage>
            </FormItem>
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