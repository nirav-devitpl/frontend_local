import Loader from '@/components/common/loader';
import { useEffect, useState } from 'react';
import useColumns from '../utils/use-columns';
import { Card, CardContent } from '@/components/ui/card';
import DataTable from '@/components/common/data-table';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import DeleteModal from '@/components/common/delete-modal';
import showToast from '@/components/common/toast';
import { useAppSelector } from '@/hooks/use-rtk-hooks';
import { RootState } from '@/store';
import {
  useDeleteChannelMutation,
  useGetChannelsQuery,
} from '@/services/channel';
import DataTableServer from '@/components/common/data-table-server';
 
import { ColumnFiltersState, SortingState } from '@tanstack/react-table';
 
/**
 * @memberof channel
 * @name ActiveChannelPage
 * @description ActiveChannelPage component renders screen with list of channel with option to sort and search fields.
 * @returns {JSX.Element} - The rendered ActiveChannelPage component.
 */
 
function ActiveChannelPage() {
  const [sorting, setSorting] = useState<SortingState>([
    { id: 'created_at', desc: true },
  ]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });
  const [totalCount, setTotalCount] = useState(0);
  const [id, setId] = useState<string | null>(null);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
 
  const { data, isLoading, refetch } = useGetChannelsQuery(
    {
      key: 'CHANNELS',
      status: true,
      page: pagination.pageIndex + 1,
      limit: pagination.pageSize,
      sortBy: sorting[0]?.id || 'created_at',
      sortOrder: sorting[0]?.desc ? 'desc' : 'asc',
      // search: columnFilters?.length > 0 ? columnFilters[0]?.value : '',
    },
    {
      selectFromResult: ({ data, ...rest }) => {
        return {
          data: data?.result?.data,
          ...rest,
        };
      },
    }
  );
 
  const { channelTab } = useAppSelector((state: RootState) => state.utility.us);
 
  const [deleteChannel] = useDeleteChannelMutation();
 
  const handleOpenDeleteModal = (id: string) => {
    setOpenDeleteModal(true);
    setId(id);
  };
  const handleDelete = async (id: string) => {
    await deleteChannel(id)
      .then((res: any) => {
        showToast(res?.data?.message, 'success');
        setOpenDeleteModal(false);
      })
      .catch((error: any) => {
        showToast(error?.data?.message, 'error');
      });
  };
 
  const columns = useColumns(handleOpenDeleteModal);
 
  useEffect(() => {
    refetch();
  }, [data]);
 
  useEffect(() => {
    refetch();
  }, [sorting, columnFilters, pagination]);
  return (
    <>
      <Card>
        <CardContent className="p-4">
          {isLoading ? (
            <Loader />
          ) : (
            <>
              {/* <DataTable columns={columns} data={data || []} /> */}
              <DataTableServer
                columns={columns}
                data={data || []}
                setColumnFilters={setColumnFilters}
                setPagination={setPagination}
                setSorting={setSorting}
                sorting={sorting}
                columnFilters={columnFilters}
                pagination={pagination}
                totalCount={totalCount}
              />
            </>
          )}
        </CardContent>
      </Card>
 
      <Dialog open={openDeleteModal} onOpenChange={setOpenDeleteModal}>
        <DialogContent className="p-4 w-[400px]">
          <DeleteModal
            message={'Are you sure you want to delete this channel?'}
            handleDelete={() => handleDelete(id ?? '')}
          />
        </DialogContent>
      </Dialog>
    </>
  );
}
 
export default ActiveChannelPage;