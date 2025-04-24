import i18n from '@/assets/i18n';
import showToast from '@/components/common/toast';
import { CardContent } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHeader, TableRow } from '@/components/ui/table'; 
import { cn } from '@/lib/utils';
import { RoleFormData } from '@/models/role';
import { useCreateRoleMutation, useGetRoleByIdQuery, useUpdateRoleMutation } from '@/services/roles';
import { getRoleSchema } from '@/validation-schema/roles';
import { zodResolver } from '@hookform/resolvers/zod';
import { Checkbox } from '@/components/ui/checkbox';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router';
import { z } from 'zod';

function RoleForm({
  setSubmitHandler,
}: Readonly<{
  setSubmitHandler: (submitHandler: () => void) => void;
}>) {
  const { t } = useTranslation();
  const { id } = useParams();
  const navigate = useNavigate();

  const [createRole] = useCreateRoleMutation();
  const { data: role } = useGetRoleByIdQuery(id, { skip: !id });
  const [updateRole] = useUpdateRoleMutation();

  const schema = getRoleSchema().extend({
    permissions: z.array(
      z.record(
        z.string().toLowerCase(),
        z.boolean()
      )
    ),
  });

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      role_name: '',
      permissions: [], // Default value for permissions
    },
  });

  useEffect(() => {
    setSubmitHandler(() => form.handleSubmit(onSubmit));
  }, [form, setSubmitHandler]);

  const onSubmit = (data: z.infer<typeof schema>) => {
    const payload = {
      ...data,
      ...(id && { id: parseInt(id) }),
    };

    const action = id ? updateRole : createRole;
    action({ ...payload })
      .unwrap()
      .then((response: { status: string | number; message: string }) => {
        if (response?.status === 'success' || response?.status === 200 || response?.status === 201) {
          showToast(response?.message, 'success');
          navigate('/roles');
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
    if (id && role) {
      const payload: RoleFormData = {
        ...role.result,
      };
      form.reset(payload as any);
    }
  }, [id, role?.result, form]);

  const permissions = [
    { feature: 'Module 1', permissions: ['View', 'Update', 'Delete', 'Create', 'All'] },
    { feature: 'Module 2', permissions: ['View', 'Update', 'Delete', 'Create', 'All'] },
    { feature: 'Module 3', permissions: ['View', 'Update', 'Delete', 'Create', 'All'] },
  ];

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        {/* Name Field */}
        <FormField
          control={form.control}
          name="role_name"
          render={({ field: formField, fieldState }) => (
            <CardContent className="mt-0 mx-6 p-4 border border-gray-200 rounded-lg space-y-6">
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
            </CardContent>
          )}
        />

        {/* Permissions Field */}
        <CardContent className="mt-4 mx-6 p-4 border border-gray-200 rounded-lg space-y-0">
          <FormLabel className="text-lg font-semibold">{t('LABEL.PERMISSIONS')}</FormLabel>
          <Table className="w-full">
            <TableHeader>
              <TableRow className="border-none">
                <TableCell className="w-1/6 font-poppins font-medium text-base leading-6 tracking-normal">{t('LABEL.FEATURES')}</TableCell>
                <TableCell className="font-poppins font-medium text-base leading-6 tracking-normal" colSpan={5}>{t('LABEL.PERMISSIONS')}</TableCell>
              </TableRow>
            </TableHeader>
            <TableBody> 
              {permissions.map((module, index) => (
                <TableRow key={module.feature} className="border-none">
                  <TableCell>{module.feature}</TableCell>
                  {module.permissions.map((permission) => (
                    <TableCell key={`${module.feature}-${permission}`} className="w-1/6">
                      <label className="flex items-center cursor-pointer">
                      <Checkbox
                      {...form.register(`permissions.${index}.${permission.toLowerCase()}`)}
                      className="text-[#E64560] border-[#E64560] border-2 rounded focus:ring-[#E64560] w-5 h-5 cursor-pointer"
                      />
                      <span className="text-sm text-gray-700 pl-2">{permission}</span>
                      </label>
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </form>
    </Form>
  );
}

export default RoleForm;