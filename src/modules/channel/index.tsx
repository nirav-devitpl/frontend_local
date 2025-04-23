import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Loader from '@/components/common/loader';
import { Suspense, lazy, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/hooks/use-rtk-hooks';
import { RootState } from '@/store';
import { setUtilityState } from '@/features/utility-slice';
import { CHANNEL_TABS } from '@/constants/channel-tab';
import { Button } from '@/components/custom/button';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';
import FilterPopOver from './components/FilterPopOver';
import { AddIcon, SearchIcon } from '@/components/common/icon';

const ActiveTab = lazy(() => import('./components/active-tab'));
const InactiveTab = lazy(() => import('./components/inactive-tab'));

function ChannelPage() {
  const { channelTab } = useAppSelector((state: RootState) => state.utility.us);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const [channelValues, setChannelValues] = useState<Record<string, string>>({
    filterValue: '',
    searchValue: '',
  });

  /**
   * @method onTabChange
   * @description Handles the tab change event and updates the Redux state with the selected tab value.
   * @param value - The value of the selected tab.
   * @returns {void}
   */
  const onTabChange = (value: string) => {
    dispatch(setUtilityState({ channelTab: value }));
  };

  /**
   * @method handleFilterChange
   * @description Handles the filter change event and updates the filter value in the state.
   * @param value - The selected filter value.
   * @returns {void}
   */
  const handleFilterChange = (value: string) => {
    setChannelValues((prev) => ({ ...prev, filterValue: value === 'clear' ? '' : value }));
  };

  /**
   * @method handleSearchChange
   * @description Handles the search input change event and updates the search value in the state.
   * @param e - The event object from the input change.
   * @returns {void}
   */
  const handleSearchChange = (e: React.SyntheticEvent<HTMLInputElement>) => {
    setChannelValues((prev) => ({ ...prev, searchValue: (e.target as HTMLInputElement).value }));
  }
 

  return (
    <Card className="px-4">
      <div className="flex justify-between px-4 py-2 items-center h-[52px]">
        <div className="flex items-center w-[400px] h-[36px] gap-2 rounded-md border px-5 border-gray-200 bg-white">
          <SearchIcon />
          <input
            type="text"
            className="flex-1 h-full bg-transparent outline-none"
            placeholder={t('PLACEHOLDER.SEARCH')}
            value={channelValues.searchValue}
            onChange={handleSearchChange} 
          />
        </div>
        <FilterPopOver channelProps={channelValues} t={t} handleFilterChangeProps={handleFilterChange} />
      </div>
      <Tabs value={channelTab} onValueChange={onTabChange}>
        <div className="flex justify-between px-4 py-2 items-center h-[52px]">
          <TabsList>
            <TabsTrigger value={CHANNEL_TABS.ACTIVE}>{t('COMMON.ACTIVE')}</TabsTrigger>
            <TabsTrigger value={CHANNEL_TABS.INACTIVE}>{t('COMMON.INACTIVE')}</TabsTrigger>
          </TabsList>
          <Button
            className="ml-2 flex items-center w-[160px] h-[40px] gap-2 rounded-[4px] bg-[#E64560] text-white cursor-pointer"
            variant="filter"
            onClick={() => navigate('/channel-manager/add')}
          >
            <AddIcon />
            {t('BUTTON.ADD_CHANNEL')}
          </Button>
        </div>
        <TabsContent value={CHANNEL_TABS.ACTIVE}>
          <Suspense fallback={<Loader />}>
            <ActiveTab filterValue={channelValues.filterValue} searchValue={channelValues.searchValue} />
          </Suspense>
        </TabsContent>
        <TabsContent value={CHANNEL_TABS.INACTIVE}>
          <Suspense fallback={<Loader />}>
            <InactiveTab filterValue={channelValues.filterValue} searchValue={channelValues.searchValue} />
          </Suspense>
        </TabsContent>
      </Tabs>
    </Card>
  );
}

export default ChannelPage;