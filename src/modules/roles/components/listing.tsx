import { useEffect, useState } from 'react';
import useColumns from '../utils/use-columns';
import { Card, CardContent } from '@/components/ui/card';
import DeleteModal from '@/components/common/delete-modal';
import { useGetRolesQuery, useDeleteRoleMutation, useCopyRoleMutation } from '@/services/roles';
import DataTableServer from '@/components/common/data-table-server';
import { ColumnFiltersState, SortingState } from '@tanstack/react-table';
import { useTranslation } from 'react-i18next';
import { Dialog, DialogContent, DialogOverlay } from '@radix-ui/react-dialog';
import showToast from '@/components/common/toast';
import { IconLoader } from '@tabler/icons-react';
import CopyModal from '@/components/common/copy-modal';

/*
 * @memberof roles
 * @name RoleListingPage
 * @description RoleListingPage component renders a list of roles with options to sort, search, filter, and delete roles.
 * @returns {JSX.Element} - The rendered RoleListingPage component.
 */

function RoleListingPage({ ...props }) {
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
  const [openCopyModal, setOpenCopyModal] = useState(false);
  const [deleteRole] = useDeleteRoleMutation();
  const [copyRole] = useCopyRoleMutation();

  const { t } = useTranslation();

  const { data, isLoading, refetch } = useGetRolesQuery(
    {
      key: 'ROLES',
      status: true,
      page: pagination.page + 1,
      limit: pagination.limit,
      sortBy: sorting[0]?.id || 'created_at',
      sortOrder: sorting[0]?.desc ? 'desc' : 'asc',
      roleType: props.filterValue,
      search: props.searchValue,
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

  const handleOpenDeleteModal = (id: string) => {
    setOpenDeleteModal(true);
    setId(id);
  };

  const handleDelete = async (id: string) => {
    await deleteRole(id)
      .then((res: any) => {
        showToast(res?.data?.message, 'success');
        setOpenDeleteModal(false);
        refetch(); // Refresh data after deletion
      })
      .catch((error: any) => {
        showToast(error?.data?.message, 'error');
      });
  };

  const handleOpenCopyModal = (id: string) => {
    setOpenCopyModal(true);
    setId(id);
  };

  const handleCopy = async (id: string) => {
    await copyRole(id)
      .then((res: any) => {
        showToast(res?.data?.message, 'success');
        setOpenCopyModal(false);
        refetch(); // Refresh data after deletion
      })
      .catch((error: any) => {
        showToast(error?.data?.message, 'error');
      });
  };

  const columns = useColumns(handleOpenDeleteModal, handleOpenCopyModal);

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
              data={data ?? []}
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
      
      <Dialog open={openDeleteModal} onOpenChange={setOpenDeleteModal} >
        <DialogOverlay className="fixed inset-0 bg-black/50 z-40" />
          <DialogContent 
          className="fixed z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg p-6 w-[400px] shadow-lg">
          <DeleteModal
            message={t('MODAL.DELETE_CONFIRMATION_ROLE')}
            handleDelete={() => handleDelete(id ?? '')}
          />
        </DialogContent>
      </Dialog>
      <Dialog open={openCopyModal} onOpenChange={setOpenCopyModal} >
        <DialogOverlay className="fixed inset-0 bg-black/50 z-40" />
          <DialogContent 
          className="fixed z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg p-6 w-[400px] shadow-lg">
          <CopyModal
            message={t('MODAL.COPY_CONFIRMATION_ROLE')}
            handleCopy={() => handleCopy(id ?? '')}
          />
        </DialogContent>
      </Dialog>
    </>
  );
}

export default RoleListingPage;