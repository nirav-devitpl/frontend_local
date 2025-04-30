// Transform role permission raw data into a structured format
export const transformRoleData = (
    rolePermissionRawData: {
      result: { resource_id: string; permission_id: string; scopes: { id: string }[] }[];
    } | undefined
  ) => {
    if (!rolePermissionRawData || !Array.isArray(rolePermissionRawData.result)) return {};
  
    return rolePermissionRawData.result.reduce(
      (acc: Record<string, { permission_id: string; scopes: string[] }>, item) => {
        acc[item.resource_id] = {
          permission_id: item.permission_id,
          scopes: item.scopes.map((scope) => scope.id),
        };
        return acc;
      },
      {}
    );
  };
  
  // Create permissions payload for API submission
  export const createPermissionsPayload = (
    data: any,
    availablePermissionsRef: React.MutableRefObject<any[]>,
    rolePermissionRawDataRef: React.MutableRefObject<any>,
    id: string | undefined
  ) => {
    return Object.entries(data.permissions ?? {}).map(([resourceId, scopes]: any) => {
      const resource = availablePermissionsRef.current?.find(
        (perm: { id: string }) => perm.id === resourceId
      );
  
      if (id) {
        const permissionData = rolePermissionRawDataRef.current[resourceId];
        return permissionData
          ? { permission_id: permissionData.permission_id, scopes }
          : { resource_name: resource?.feature, resource_id: resourceId, scopes };
      } else {
        return {
          resource_name: resource?.feature,
          resource_id: resourceId,
          scopes,
        };
      }
    });
  };