import Loader from "@/components/common/loader";
import { useDeleteCategoryMutation, useGetCategoriesQuery } from "@/services/category";
import { useEffect, useState } from "react";
import useColumns from "../utils/use-columns";
import { Button } from "@/components/custom/button";
import { Card, CardContent } from "@/components/ui/card";
import { Plus } from "lucide-react";
import DataTable from "@/components/common/data-table";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import DeleteModal from "@/components/common/delete-modal";
import showToast from "@/components/common/toast";
import { useAppSelector } from "@/hooks/use-rtk-hooks";
import { RootState } from "@/store";
import { useGetChannelsQuery } from "@/services/channel";

/**
 * @memberof categories
 * @name InactiveChannelPage
 * @description InactiveChannelPage component renders screen with list of channel with option to sort and search fields.
 * @returns {JSX.Element} - The rendered InactiveChannelPage component.
 */

function InactiveChannelPage() {
  const [isOpen, setIsOpen] = useState(false);
  const [id, setId] = useState<string | null>(null);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  const { data, isLoading, refetch } = useGetChannelsQuery(
    { status: 'inactive' }, {
      selectFromResult: ({ data, ...rest }) => {
        return {
          data: data?.result?.data,
          ...rest,
        };
      },
    }
  );

  const { channelTab } = useAppSelector(
    (state: RootState) => state.utility.us
  );

  const [deleteCategory] = useDeleteCategoryMutation();

  const handleOpen = (id: string | null) => {
    setIsOpen(true);
    setId(id);
  }

  const handleOpenDeleteModal = (id: string) => {
    setOpenDeleteModal(true);
    setId(id);
  }
  const handleDelete = async (id: string) => {
    await deleteCategory(id)
      .then((res: any) => {
        showToast(res?.data?.message, "success");
        setOpenDeleteModal(false);
      })
      .catch((error: any) => {
        showToast(error?.data?.message, "error");
      });
  };

  const columns = useColumns(handleOpenDeleteModal);


  useEffect(() => {
    refetch();
  }, [data]);
  return (
    <>
      
      <Card>
        <CardContent className="p-4">
          {isLoading ? (
            <Loader />
          ) : (
            <>
            <DataTable columns={columns} data={data || []} />
            </>
          )}
        </CardContent>
      </Card>
      {/* <Drawer direction='right' open={isOpen} onOpenChange={setIsOpen} onClose={handleClose}>
        <DrawerContent className='p-4'>
          <CategoryAddEditPage name={"Add"} id={id} handleClose={handleClose} />
        </DrawerContent>
      </Drawer> */}

      <Dialog open={openDeleteModal} onOpenChange={setOpenDeleteModal}>
        <DialogContent className="p-4 w-[400px]">
          <DeleteModal
            message={"Are you sure you want to delete this category?"}
            handleDelete={() => handleDelete(id ?? "")}
          />
        </DialogContent>
      </Dialog>

      
    </>
  );
}

export default InactiveChannelPage;
