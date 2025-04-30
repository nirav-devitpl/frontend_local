import { Button } from '@/components/custom/button';
import { Card, CardContent } from '@/components/ui/card';
import ChannelForm from './components/channel-form';
import { useNavigate, useParams } from 'react-router';
import { useState } from 'react';
import { useTranslation } from 'react-i18next'; 
import DataTableServer from '@/components/common/data-table-server';
import useColumns from './utils/use-alpine-columns';
//import { useGetAlpinebitsQuery } from '@/services/alpinebits';
import { SAMPLE_DATA } from './utils/sample-data';
import { ColumnFiltersState, SortingState } from '@tanstack/react-table';
import { IconLoader } from '@tabler/icons-react';

function ChannelAddEditPage() {
  const { t } = useTranslation();
  const { id } = useParams();
  const navigate = useNavigate();

  const [formSubmitHandler, setFormSubmitHandler] = useState<(() => void) | null>(null);

  const handleSaveClick = () => {
    if (formSubmitHandler) {
      formSubmitHandler(); 
    }
  };

 /*Datatable*/
  const columns = useColumns();

  const [sorting, setSorting] = useState<SortingState>([
    { id: 'created_at', desc: true },
  ]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [pagination, setPagination] = useState({
    page: 0,
    limit: 10,
  });
  const [total, setTotal] = useState(0);
    
  // const { data, isLoading: isDataLoading } = useGetAlpinebitsQuery(
  //   {
  //     key: 'ALPINEBITS',
  //     status: true,
  //     page: pagination.page + 1,
  //     limit: pagination.limit,
  //     sortBy: 'created_at',
  //     sortOrder: sorting[0]?.desc ? 'desc' : 'asc',        
  //   },
  //   {
  //     selectFromResult: ({ data, ...rest }) => {
  //       return {
  //         data: data?.result,
  //         ...rest,
  //       };
  //     },
  //   }
  // );

  const isDataLoading = false;

  return (
    <>
      <div className="mx-[35px] mb-[10px]">
        <div className="flex items-center space-x-2">
          <button
            className="font-poppins font-normal text-sm leading-5 tracking-normal text-[#e64560] bg-transparent border-none cursor-pointer"
            onClick={() => navigate('/channel-manager')}
          >
            {t('SIDEBAR.CHANNEL_MANAGER')}
          </button>
          <span>&gt;</span>
          <span className="font-poppins font-normal text-sm leading-5 tracking-normal text-[#475569]">
            {id ? t('BUTTON.EDIT_CHANNEL') : t('BUTTON.ADD_CHANNEL')}
          </span>
        </div>
      </div>

      <div className="mx-[35px] bg-white border border-gray-200 rounded-lg pb-6 space-y-6 overflow-hidden">
        <div className="bg-white border-[#e2e8f0] w-full">
          <div className="flex justify-between p-6 bg-white shadow-[0_0_11.2px_0_rgba(0,0,0,0.1)] items-center">
            <p className="w-[914px] h-6 font-poppins font-medium text-lg leading-6 tracking-normal">
              {id ? t('BUTTON.EDIT_CHANNEL') : t('BUTTON.ADD_CHANNEL')}
            </p>
            <div className="flex items-center">
              <Button
                className="w-40 h-9 rounded-md p-2.5 gap-2 bg-[#e64560] cursor-pointer hover:bg-[#E64560]/90"
                variant="default"
                onClick={handleSaveClick}
              >
                {t('BUTTON.SAVE')}
              </Button>
            </div>
          </div>
        </div>
        <div className="ml-6 space-x-5 border-b-[3px] px-1 border-red-500 text-center items-center inline-block">
          {t('BUTTON.CONFIGURATION')} 
        </div>
        <div className="space-x-5">
          <Card>
            <CardContent className="mt-0 mx-6 p-4 border border-gray-200 rounded-lg space-y-6">
              {isDataLoading ? (
                <IconLoader className="ml-2 h-4 w-4 animate-spin text-[#e64560]" />
              ) : (
                <ChannelForm setSubmitHandler={setFormSubmitHandler} />
              )}
            </CardContent>
          </Card>
        </div>
        
        <div className="mx-[25px] bg-white overflow-hidden">
          <div className="mb-2 font-bold">
            Sync Logs
          </div>
          {isDataLoading ? (
            <IconLoader className="ml-2 h-4 w-4 animate-spin text-[#e64560]" />
          ) : (
              <DataTableServer
                columns={columns}
                data={SAMPLE_DATA.data ?? []}
                setColumnFilters={setColumnFilters}
                setPagination={setPagination}
                setSorting={setSorting}
                sorting={sorting}
                columnFilters={columnFilters}
                pagination={pagination}
                total={total}
              />
          )}
        </div>
      </div>
    </>
  );
}

export default ChannelAddEditPage;