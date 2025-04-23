import i18n from '@/assets/i18n';
import showToast from '@/components/common/toast';
import { CardContent } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'; // Assuming you have a Table component
import { cn } from '@/lib/utils';
import { RoleFormData } from '@/models/role';
import { useCreateRoleMutation, useGetRoleByIdQuery, useUpdateRoleMutation } from '@/services/roles';
import { getRoleSchema } from '@/validation-schema/roles';
import { zodResolver } from '@hookform/resolvers/zod';
import { CheckboxItem } from '@radix-ui/react-dropdown-menu';
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

  const schema = getRoleSchema();

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
    // Add more modules as needed
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
        <CardContent className="mt-4 mx-6 p-4 border border-gray-200 rounded-lg space-y-6">
          <FormLabel className="text-lg font-semibold">{t('LABEL.PERMISSIONS')}</FormLabel>
          <Table className="w-full">
            <TableHeader>
              <TableRow>
                <TableHead>{t('LABEL.FEATURES')}</TableHead>
                <TableHead colSpan={5}>{t('LABEL.PERMISSIONS')}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {permissions.map((module) => (
                <TableRow key={module.feature}>
                  <TableCell>{module.feature}</TableCell>
                  {module.permissions.map((permission) => (
                    <TableCell key={`${module.feature}-${permission}`} className="text-center">
                      <checkbox
                        className="h-4 w-4 text-primary border-gray-300 rounded focus:ring-primary"
                        checked="checked"
                      />
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