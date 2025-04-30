import showToast from '@/components/common/toast';
import { CardContent } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';

import { useCreateRoleMutation, useGetRoleByIdQuery, useGetPermissionByIdQuery, useUpdateRoleMutation, useFetchPermissionsQuery } from '@/services/roles';
import { getRoleSchema } from '@/validation-schema/roles';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router';
import { z } from 'zod';
import { IconLoader } from '@tabler/icons-react';
import { transformRoleData, createPermissionsPayload } from '../utils/role-utils';
import PermissionsTable from './PermissionTable';

function RoleForm({
  setSubmitHandler,
}: Readonly<{
  setSubmitHandler: (submitHandler: () => void) => void;
}>) {
  const { t } = useTranslation(); // Translation hook for internationalization
  const { id } = useParams(); // Get the role ID from the URL parameters
  const navigate = useNavigate(); // Navigation hook for programmatic routing

  // API hooks for CRUD operations
  const [createRole] = useCreateRoleMutation();
  const { data: roleRawData, isLoading: isRoleLoading } = useGetRoleByIdQuery(id, { skip: !id });
  const { data: rolePermissionRawData, isLoading: isPermissionLoading } = useGetPermissionByIdQuery(id, { skip: !id });
  const [updateRole] = useUpdateRoleMutation();
  const { data: permissionsData, isLoading: isPermissionsDataLoading } = useFetchPermissionsQuery({});

  // State and refs for managing permissions
  const [availablePermissions, setAvailablePermissions] = useState([]); // State for available permissions
  const availablePermissionsRef = useRef([]); // Ref for available permissions to avoid re-renders
  const rolePermissionRawDataRef = useRef<any>({}); // Ref for role permissions data

  // Combined loading state
  const isLoading = isRoleLoading || isPermissionLoading || isPermissionsDataLoading;

  // Form schema and initialization
  const schema = getRoleSchema({ id });
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      role_name: '',
      permissions: {},
    },
  });

  // Set the submit handler for the parent component
  useEffect(() => {
    setSubmitHandler(() => form.handleSubmit(onSubmit));
  }, [form, setSubmitHandler]);

  // Effect to populate form data when editing an existing role
  useEffect(() => {
    if (id && roleRawData?.result?.length && rolePermissionRawData?.result) {
      const role = roleRawData.result[0]; // Extract role data
      const permissionsData = transformRoleData(rolePermissionRawData); // Transform permissions data

      rolePermissionRawDataRef.current = permissionsData; // Update the ref with transformed data

      // Format permissions for the form
      const formattedPermissions = Object.entries(permissionsData).reduce((acc, [resourceId, { scopes }]) => {
        acc[resourceId] = scopes;
        return acc;
      }, {} as Record<string, string[]>);

      // Reset the form with fetched data
      form.reset({
        role_name: role.name,
        permissions: formattedPermissions,
      });
    } else {
      // Reset the form with default values if no data is available
      form.reset({
        role_name: '',
        permissions: {},
      });
    }
  }, [id, roleRawData, rolePermissionRawData, form]);

  // Effect to fetch and set available permissions
  useEffect(() => {
    if (permissionsData?.result?.length) {
      const availablePermissions = permissionsData.result.map(({ name, _id, scopes }: { name: string; _id: string; scopes: { id: string; name: string }[] }) => ({
        feature: name,
        id: _id,
        permissions: scopes.map(({ id, name }) => ({ id, name })),
      }));
      availablePermissionsRef.current = availablePermissions; // Update the ref
      setAvailablePermissions(availablePermissions); // Update the state
    }
  }, [permissionsData]);

  // Submit handler for the form
  const onSubmit = (data: z.infer<typeof schema>) => {
    // Create the permissions payload
    const permissionsPayload = createPermissionsPayload(
      data,
      availablePermissionsRef,
      rolePermissionRawDataRef,
      id
    );

    // Construct the payload for the API
    const payload = {
      name: data.role_name,
      ...(!id && { description: data.role_name }), // Add description for new roles
      permissions: permissionsPayload,
      ...(id && { id: id.toString() }), // Add ID for existing roles
    };

    // Determine the action (create or update)
    const action = id ? updateRole : createRole;
    action(payload)
      .unwrap()
      .then((response) => {
        if (response?.status === 'success' || response?.status === 200 || response?.status === 201) {
          showToast(response?.message, 'success'); // Show success toast
          navigate('/roles'); // Navigate to roles page
        } else {
          showToast(response?.message, 'error'); // Show error toast
        }
      })
      .catch((err) => {
        const errorMessage = err?.data?.message ?? 'An unexpected error occurred';
        console.error('Error:', err); // Log the error
        showToast(errorMessage, 'error'); // Show error toast
      });
  };

  // Render a loading spinner if data is still loading
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <IconLoader className="ml-2 h-4 w-4 animate-spin text-[#e64560]" />
      </div>
    );
  }

  // Render the form
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        {/* Name Field */}
        <FormField
          control={form.control}
          name="role_name"
          render={({ field }) => (
            <FormItem className="mt-4 mx-6">
              <FormLabel className="text-lg font-semibold">{t('ROLE_FORM.LABEL.NAME')}</FormLabel>
              <FormControl>
                <Input placeholder={t('ROLE_FORM.PLACEHOLDER.NAME')} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Permissions Field */}
        <CardContent className="mt-4 mx-6 p-4 border border-gray-200 rounded-lg space-y-0">
          <FormLabel className="text-lg font-semibold">{t('ROLE_FORM.LABEL.PERMISSIONS')}</FormLabel>
          <PermissionsTable
            availablePermissions={availablePermissions} // Pass available permissions to the table
            formControl={form.control}
            t={t}
          />
        </CardContent>
      </form>
    </Form>
  );
}

export default RoleForm;