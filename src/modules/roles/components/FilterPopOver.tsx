import { FilterIcon } from '@/components/common/icon';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface RoleValues {
    roleProps: Record<string, string>;
    t: (key: string) => string;
    handleFilterChangeProps: (value: string) => void;
}

/**
 * @memberof role
 * @name RenderFilterPopover
 * @description FilterPopOverComponent renders a filter popover for the role page.
 * @param {RoleValues} props - The component props.
 * @returns {JSX.Element} - The rendered RolePage component.
 */
function RenderFilterPopover({ roleProps, t, handleFilterChangeProps }: Readonly<RoleValues>) {

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button className="ml-2 flex items-center relative" variant="outline">
                    {t('BUTTON.FILTER')}
                    <FilterIcon />
                    {roleProps.filterValue && (
                        <span className="absolute top-0 right-0 w-4 h-4 bg-red-500 text-white text-xs flex items-center justify-center rounded-full">
                            1
                        </span>
                    )}
                </Button>
            </PopoverTrigger>
            <PopoverContent>
                <div className="flex flex-col gap-2">
                    <Label htmlFor="role-type-select" className="text-sm font-medium text-gray-700">
                        {t('LABEL.ROLE_TYPE')}
                    </Label>
                    <Select onValueChange={handleFilterChangeProps} value={roleProps.filterValue}>
                        <SelectTrigger id="role-type-select" className="w-full">
                            <SelectValue placeholder={t('PLACEHOLDER.SELECT_FILTER')} />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="clear">{t('BUTTON.CLEAR_SELECTION')}</SelectItem>
                            <SelectItem value="Inbound">{t('FILTER.INBOUND')}</SelectItem>
                            <SelectItem value="Outbound">{t('FILTER.OUTBOUND')}</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </PopoverContent>
        </Popover>
    )

}

export default RenderFilterPopover;