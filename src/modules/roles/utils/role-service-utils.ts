import { useCreateRoleMutation, useUpdateRoleMutation, useGetRoleByIdQuery, useGetPermissionByIdQuery, useFetchPermissionsQuery } from '@/services/roles';

export const useRoleApi = () => {
  const [createRole] = useCreateRoleMutation();
  const [updateRole] = useUpdateRoleMutation();
  const { data: roleRawData, isLoading: isRoleLoading } = useGetRoleByIdQuery(undefined, { skip: true });
  const { data: rolePermissionRawData, isLoading: isPermissionLoading } = useGetPermissionByIdQuery(undefined, { skip: true });
  const { data: permissionsData, isLoading: isPermissionsDataLoading } = useFetchPermissionsQuery({});

  return {
    createRole,
    updateRole,
    roleRawData,
    isRoleLoading,
    rolePermissionRawData,
    isPermissionLoading,
    permissionsData,
    isPermissionsDataLoading,
  };
};