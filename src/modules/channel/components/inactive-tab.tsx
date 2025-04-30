import { useEffect, useState } from 'react';
import useColumns from '../utils/use-columns';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import DeleteModal from '@/components/common/delete-modal';
import ActivateModal from '@/components/common/activate-modal';
import showToast from '@/components/common/toast';
import { useAppSelector } from '@/hooks/use-rtk-hooks';
import { RootState } from '@/store';
import {
  useDeleteChannelMutation,
  useActivateChannelMutation, // Import the activate mutation
  useGetChannelsQuery,
} from '@/services/channel';
import DataTableServer from '@/components/common/data-table-server';

import { ColumnFiltersState, SortingState } from '@tanstack/react-table';
import { t } from 'i18next';
import { IconLoader } from '@tabler/icons-react';

/**
 * @memberof channel
 * @name ActiveChannelPage
 * @description ActiveChannelPage component renders screen with list of channel with option to sort and search fields.
 * @returns {JSX.Element} - The rendered ActiveChannelPage component.
 */

function ActiveChannelPage({ ...props }) {
  const [sorting, setSorting] = useState<SortingState>([
    { id: 'created_at', desc: true },
  ]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [pagination, setPagination] = useState({
    page: 0,
    limit: 10,
  });
  const [total, setTotal] = useState(0);
  const [id, setId] = useState<string | null>(null);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openActivateModal, setOpenActivateModal] = useState(false); // State for Activate Modal

  const { data, isLoading, refetch } = useGetChannelsQuery(
    {
      key: 'CHANNELS',
      status: false,
      page: pagination.page + 1,
      limit: pagination.limit,
      sortBy: sorting[0]?.id || 'created_at',
      sortOrder: sorting[0]?.desc ? 'desc' : 'asc',
      channelType: props.filterValue,
      search:props.searchValue,
      // search: columnFilters?.length > 0 ? columnFilters[0]?.value : '',
    },
    {
      selectFromResult: ({ data, ...rest }) => {
        return {
          data: data?.result,
          ...rest,
        };
      },
    }
  );

  const { channelTab } = useAppSelector((state: RootState) => state.utility.us);

  const [deleteChannel] = useDeleteChannelMutation();
  const [activateChannel] = useActivateChannelMutation(); // Activate mutation

  const handleOpenDeleteModal = (id: string) => {
    setOpenDeleteModal(true);
    setId(id);
  };

  const handleOpenActivateModal = (id: string) => {
    setOpenActivateModal(true); // Open Activate Modal
    setId(id);
  };

  const handleDelete = async (id: string) => {
    await deleteChannel(id)
      .then((res: any) => {
        showToast(res?.data?.message, 'success');
        setOpenDeleteModal(false);
        refetch(); // Refresh data after deletion
      })
      .catch((error: any) => {
        showToast(error?.data?.message, 'error');
      });
  };

  const handleActivate = async (id: string) => {
    await activateChannel(id) // Call activate mutation
      .then((res: any) => {
        showToast(res?.data?.message, 'success');
        setOpenActivateModal(false);
        refetch(); // Refresh data after activation
      })
      .catch((error: any) => {
        showToast(error?.data?.message, 'error');
      });
  };

  const columns = useColumns(handleOpenDeleteModal, handleOpenActivateModal, false);

  useEffect(() => {
    setTotal(data?.total ?? 0);
  }, [data]);

  useEffect(() => {
    refetch();
  }, [sorting, columnFilters, pagination]);

  return (
    <>
      <Card>
        <CardContent className="px-4">
          {isLoading ? (
            <IconLoader className="h-6 w-6 animate-spin text-[#e64560]" />
          ) : (
            <DataTableServer
              columns={columns}
              data={data?.data ?? []}
              setColumnFilters={setColumnFilters}
              setPagination={setPagination}
              setSorting={setSorting}
              sorting={sorting}
              columnFilters={columnFilters}
              pagination={pagination}
              total={total}
            />
          )}
        </CardContent>
      </Card>

      <Dialog open={openDeleteModal} onOpenChange={setOpenDeleteModal}>
        <DialogContent className="p-4 w-[400px]">
          <DeleteModal
            message={t('MODAL.DELETE_CONFIRMATION')}
            handleDelete={() => handleDelete(id ?? '')}
          />
        </DialogContent>
      </Dialog>

      <Dialog open={openActivateModal} onOpenChange={setOpenActivateModal}>
        <DialogContent className="p-4 w-[400px]">
          <ActivateModal
            message={t('MODAL.ACTIVATE_CONFIRMATION')}
            handleActivate={() => handleActivate(id ?? '')}
          />
        </DialogContent>
      </Dialog>
    </>
  );
}

export default ActiveChannelPage;