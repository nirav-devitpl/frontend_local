import { FilterIcon } from '@/components/common/icon';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface ChannelValues {
    channelProps: Record<string, string>;
    t: (key: string) => string;
    handleFilterChangeProps: (value: string) => void;
}

/**
 * @memberof channel
 * @name RenderFilterPopover
 * @description FilterPopOverComponent renders a filter popover for the channel page.
 * @param {ChannelValues} props - The component props.
 * @returns {JSX.Element} - The rendered ActiveChannelPage component.
 */
function RenderFilterPopover({ channelProps, t, handleFilterChangeProps }: Readonly<ChannelValues>) {

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button className="ml-2 flex items-center relative" variant="outline">
                    {t('BUTTON.FILTER')}
                    <FilterIcon />
                    {channelProps.filterValue && (
                        <span className="absolute top-0 right-0 w-4 h-4 bg-red-500 text-white text-xs flex items-center justify-center rounded-full">
                            1
                        </span>
                    )}
                </Button>
            </PopoverTrigger>
            <PopoverContent>
                <div className="flex flex-col gap-2">
                    <Label htmlFor="channel-type-select" className="text-sm font-medium text-gray-700">
                        {t('LABEL.CHANNEL_TYPE')}
                    </Label>
                    <Select onValueChange={handleFilterChangeProps} value={channelProps.filterValue}>
                        <SelectTrigger id="channel-type-select" className="w-full">
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