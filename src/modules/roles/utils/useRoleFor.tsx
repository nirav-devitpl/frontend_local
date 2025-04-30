import { useCreateRoleMutation, useGetRoleByIdQuery, useGetPermissionByIdQuery, useUpdateRoleMutation, useFetchPermissionsQuery } from '@/services/roles';
import { getRoleSchema } from '@/validation-schema/roles';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useCallback } from 'react';
import showToast from '@/components/common/toast';

export const useRoleForm = (id: string | undefined, navigate: (path: string) => void) => {
  const [createRole] = useCreateRoleMutation();
  const [updateRole] = useUpdateRoleMutation();
  const { data: roleRawData, isLoading: isRoleLoading } = useGetRoleByIdQuery(id, { skip: !id });
  const { data: rolePermissionRawData, isLoading: isPermissionLoading } = useGetPermissionByIdQuery(id, { skip: !id });
  const { data: permissionsData, isLoading: isPermissionsDataLoading } = useFetchPermissionsQuery({});

  const isLoading = isRoleLoading || isPermissionLoading || isPermissionsDataLoading;

  const schema = getRoleSchema().extend({
    permissions: z.record(z.string(), z.array(z.string())).optional(),
  });

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      role_name: '',
      permissions: {},
    },
  });

  const availablePermissions = permissionsData?.result?.map(({ name, _id, scopes }: { name: string; _id: string; scopes: any[] }) => ({
    feature: name,
    id: _id,
    permissions: scopes.map(({ id, name }: any) => ({ id, name })),
  })) ?? [];

  const transformRoleData = useCallback((rolePermissionRawData: { result: any[] } | undefined) => {
    if (!rolePermissionRawData || !Array.isArray(rolePermissionRawData.result)) return {};
    return rolePermissionRawData.result.reduce((acc: Record<string, string[]>, item) => {
      acc[item.permission_id] = item.scopes.map((scope: { id: any; }) => scope.id);
      return acc;
    }, {});
  }, []);

  const handleSubmit = useCallback(
    (data: z.infer<typeof schema>) => {
      const permissionsPayload = Object.entries(data.permissions || {})
        .filter(([_, scopes]) => scopes.length > 0)
        .map(([permission_id, scopes]) => ({ permission_id, scopes }));

      const payload = {
        name: data.role_name,
        ...(!id && { description: data.role_name }),
        permissions: permissionsPayload,
        ...(id && { id: id.toString() }),
      };

      const action = id ? updateRole : createRole;
      action(payload)
        .unwrap()
        .then((response) => {
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
    },
    [id, createRole, updateRole, navigate]
  );

  return {
    form,
    schema,
    isLoading,
    availablePermissions,
    transformRoleData,
    roleRawData,
    rolePermissionRawData,
    handleSubmit,
  };
};