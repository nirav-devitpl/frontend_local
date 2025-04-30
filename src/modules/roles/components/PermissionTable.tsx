import { Table, TableBody, TableCell, TableHeader, TableRow } from '@/components/ui/table';
import { Controller } from 'react-hook-form';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Key, ReactElement, JSXElementConstructor, ReactNode, ReactPortal } from 'react';

export default function PermissionsTable({
  availablePermissions,
  formControl,
  t,
}: Readonly<{
  availablePermissions: any[];
  formControl: any;
  t: (key: string) => string;
}>) {
  return (
    <Table className="w-full">
      <TableHeader>
        <TableRow className="border-none">
          <TableCell className="w-1/6 font-poppins font-medium text-base leading-6 tracking-normal">
            {t('ROLE_FORM.LABEL.FEATURES')}
          </TableCell>
          <TableCell
            className="font-poppins font-medium text-base leading-6 tracking-normal"
            colSpan={availablePermissions[0]?.permissions.length}
          >
            {t('ROLE_FORM.LABEL.PERMISSIONS')}
          </TableCell>
        </TableRow>
      </TableHeader>
      <TableBody>
        {availablePermissions.map((permGroup) => (
          <TableRow key={permGroup.id} className="border-none hover:bg-transparent">
            <TableCell className="font-poppins font-normal text-base leading-6 tracking-normal">
              {permGroup.feature}
            </TableCell>
            {permGroup.permissions.map((perm: { id: Key | null | undefined; name: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | Iterable<ReactNode> | null | undefined; }) => (
              <TableCell key={perm.id} className="w-1/6">
                <Label className="flex items-center cursor-pointer w-3/8">
                  <Controller
                    name={`permissions.${permGroup.id}`}
                    control={formControl}
                    render={({ field }) => (
                      <Checkbox
                        checked={field.value?.includes(perm.id) ?? false}
                        onCheckedChange={(checked) => {
                          const newValue = checked
                            ? [...(field.value ?? []), perm.id]
                            : (field.value ?? []).filter((id: string) => id !== perm.id);
                          field.onChange(newValue);
                        }}
                        className="text-[#E64560] border-[#E64560] border-2 rounded cursor-pointer focus:ring-[#E64560] w-5 h-5
                        data-[state=checked]:bg-[#E64560] data-[state=checked]:border-[#E64560] focus-visible:ring-[#E64560]"
                      />
                    )}
                  />
                  <span className="text-sm text-gray-700 pl-2">{perm.name}</span>
                </Label>
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}