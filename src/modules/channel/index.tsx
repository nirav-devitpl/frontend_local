import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Loader from '@/components/common/loader';
import { Suspense, lazy } from 'react';
import { useAppDispatch, useAppSelector } from '@/hooks/use-rtk-hooks';
import { RootState } from '@/store';
import { setUtilityState } from '@/features/utility-slice';

import { CHANNEL_TABS } from '@/constants/channel-tab';
import { Button } from '@/components/custom/button';
import { Plus } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { IconAdjustmentsHorizontal } from '@tabler/icons-react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';

const ActiveTab = lazy(() => import('./components/active-tab'));

const InactiveTab = lazy(() => import('./components/inactive-tab'));

function ChannelPage() {
  const { channelTab } = useAppSelector((state: RootState) => state.utility.us);

  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const { t } = useTranslation();

  const onTabChange = (value: any) => {
    dispatch(setUtilityState({ channelTab: value }));
  };

  return (
    <>
      {/* <div className="sticky -top-3 bg-background z-10">
        <ChannelPageHeader setSheetData={setSheetData} />
      </div> */}
      {/* <div className="flex justify-between px-4 py-2 items-center h-[52px]">
        <h1 className="font-semibold text-lg">Channel</h1>
        
      </div> */}

      <Card className="p-4">
        <div className="flex justify-between px-4 py-2 items-center h-[52px]">
          <div className="flex items-center w-[400px] h-[36px] gap-2 rounded-md border px-5 border-gray-200 bg-white">
            <svg
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
          d="M7.65001 2.69922C10.3838 2.69922 12.6 4.91541 12.6 7.64922C12.6 8.77271 12.2257 9.80878 11.595 10.6395L15.3273 14.3719C15.5909 14.6355 15.5909 15.0629 15.3273 15.3265C15.0877 15.5662 14.7127 15.5879 14.4484 15.3919L14.3727 15.3265L10.6403 11.5942C9.80957 12.2249 8.7735 12.5992 7.65001 12.5992C4.9162 12.5992 2.70001 10.383 2.70001 7.64922C2.70001 4.91541 4.9162 2.69922 7.65001 2.69922ZM7.65001 4.04922C5.66179 4.04922 4.05001 5.66099 4.05001 7.64922C4.05001 9.63744 5.66179 11.2492 7.65001 11.2492C9.63824 11.2492 11.25 9.63744 11.25 7.64922C11.25 5.66099 9.63824 4.04922 7.65001 4.04922Z"
          fill="#94A3B8"
              />
            </svg>
            <input
              type="text"
              className="flex-1 h-full bg-transparent outline-none"
              placeholder={t('PLACEHOLDER.SEARCH')}
            />
          </div>
          <Button className="ml-2 flex items-center" variant="filter">
            {t('BUTTON.FILTER')}{' '}
            <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M16.2083 8.00023H5.91246M2.27829 8.00023H0.791626M2.27829 8.00023C2.27829 7.51842 2.46969 7.05635 2.81038 6.71566C3.15107 6.37497 3.61315 6.18357 4.09496 6.18357C4.57677 6.18357 5.03885 6.37497 5.37954 6.71566C5.72023 7.05635 5.91163 7.51842 5.91163 8.00023C5.91163 8.48204 5.72023 8.94412 5.37954 9.28481C5.03885 9.6255 4.57677 9.8169 4.09496 9.8169C3.61315 9.8169 3.15107 9.6255 2.81038 9.28481C2.46969 8.94412 2.27829 8.48204 2.27829 8.00023ZM16.2083 13.5061H11.4183M11.4183 13.5061C11.4183 13.988 11.2264 14.4506 10.8857 14.7914C10.5449 15.1321 10.0827 15.3236 9.60079 15.3236C9.11898 15.3236 8.65691 15.1313 8.31622 14.7906C7.97552 14.45 7.78413 13.9879 7.78413 13.5061M11.4183 13.5061C11.4183 13.0241 11.2264 12.5624 10.8857 12.2216C10.5449 11.8808 10.0827 11.6894 9.60079 11.6894C9.11898 11.6894 8.65691 11.8808 8.31622 12.2215C7.97552 12.5622 7.78413 13.0243 7.78413 13.5061M7.78413 13.5061H0.791626M16.2083 2.4944H13.6208M9.98663 2.4944H0.791626M9.98663 2.4944C9.98663 2.01259 10.178 1.55051 10.5187 1.20982C10.8594 0.869133 11.3215 0.677734 11.8033 0.677734C12.0419 0.677734 12.2781 0.724724 12.4985 0.81602C12.7189 0.907316 12.9192 1.04113 13.0879 1.20982C13.2566 1.37852 13.3904 1.57878 13.4817 1.79919C13.573 2.0196 13.62 2.25583 13.62 2.4944C13.62 2.73297 13.573 2.9692 13.4817 3.18961C13.3904 3.41002 13.2566 3.61028 13.0879 3.77898C12.9192 3.94767 12.7189 4.08149 12.4985 4.17278C12.2781 4.26408 12.0419 4.31107 11.8033 4.31107C11.3215 4.31107 10.8594 4.11967 10.5187 3.77898C10.178 3.43829 9.98663 2.97621 9.98663 2.4944Z" stroke="#1E293B" stroke-miterlimit="10" stroke-linecap="round"/>
            </svg>
          </Button>
        </div>
        <Tabs value={channelTab} onValueChange={onTabChange}>
          <div className="flex justify-between px-4 py-2 items-center h-[52px]">
            <TabsList>
              <TabsTrigger value={CHANNEL_TABS.ACTIVE}>
                {t('COMMON.ACTIVE')}
              </TabsTrigger>
              <TabsTrigger value={CHANNEL_TABS.INACTIVE}>
                {t('COMMON.INACTIVE')}
              </TabsTrigger>
            </TabsList>
            <div className="flex items-center">
                <Button
                className="ml-2 flex items-center w-[160px] h-[40px] pt-2 pr-[10px] pb-2 pl-[10px] gap-2 rounded-[4px] bg-[#E64560] font-poppins font-medium text-[14px] leading-[20px] tracking-[0%] text-center text-white cursor-pointer"
                variant="filter"
                onClick={() => navigate('/channel-manager/add')}
                >
                <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M8.5 1V15M1.5 8H15.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                {t('BUTTON.ADD_CHANNEL')}
                </Button>
            </div>
          </div>
          <TabsContent value={CHANNEL_TABS.ACTIVE}>
            <Suspense fallback={<Loader />}>
              <ActiveTab />
            </Suspense>
          </TabsContent>
          <TabsContent value={CHANNEL_TABS.INACTIVE}>
            <Suspense fallback={<Loader />}>
              <InactiveTab />
            </Suspense>
          </TabsContent>
        </Tabs>
      </Card>
    </>
  );
}

export default ChannelPage;
