import Loader from "@/components/common/loader";
import { useEffect, useState } from "react";
import useColumns from "./utils/use-columns";
import { Button } from "@/components/custom/button";
import { Card, CardContent } from "@/components/ui/card";
import { Drawer, DrawerContent } from "@/components/ui/drawer";
import { Plus } from "lucide-react";
import CustomerAddEditPage from "./add-edit";
import DataTable from "@/components/common/data-table";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import DeleteModal from "@/components/common/delete-modal";
import showToast from "@/components/common/toast";
import { useDeleteCustomerMutation, useGetCustomersQuery } from "@/services/customer";


/**
 * @memberof customer
 * @name CustomerPage
 * @description CustomerPage component renders screen with list of customer with option to sort and search fields.
 * @returns {JSX.Element} - The rendered CustomerPage component.
 */

function CustomerPage() {
  const [isOpen, setIsOpen] = useState(false);
  const [id, setId] = useState<string | null>(null);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  const { data, isLoading, refetch } = useGetCustomersQuery("CATEGORIES", {
    selectFromResult: ({ data, ...rest }) => ({
      data: data?.result.data,
      ...rest,
    }),
  });

  const [deleteCustomer] = useDeleteCustomerMutation();


  const handleClose = () => {
    setIsOpen(false);
  }

  const handleOpen = (id: string | null) => {
    setIsOpen(true);
    setId(id);
  }


  const handleOpenDeleteModal = (id: string) => {
    setOpenDeleteModal(true);
    setId(id);
  }
  const handleDelete = async (id: string) => {
    await deleteCustomer(id)
      .then((res: any) => {
        showToast(res?.data?.message, "success");
        setOpenDeleteModal(false);
      })
      .catch((error: any) => {
        showToast(error?.data?.message, "error");
      });
  };

  const columns = useColumns(handleOpen, handleOpenDeleteModal);

  


  useEffect(() => {
    refetch();
  }, [data]);
  return (
    <>
      <div className="flex justify-between px-4 py-2 items-center h-[52px]">
        <h1 className="font-semibold text-lg">Customers</h1>
        <div className="flex items-center">
          <Button className='ml-2 flex items-center' variant="default" onClick={() => handleOpen(null)} ><Plus size={15} className='mr-1' />Add Customer</Button>
        </div>
      </div>
      <Card>
        <CardContent className="p-4">
          {isLoading ? (
            <Loader />
          ) : (
            <DataTable columns={columns} data={data || []} />
          )}
        </CardContent>
      </Card>
      <Drawer direction='right' open={isOpen} onOpenChange={setIsOpen} onClose={handleClose}>
        <DrawerContent className='p-4'>
          <CustomerAddEditPage name={"Add"} id={id} handleClose={handleClose} />
        </DrawerContent>
      </Drawer>

      <Dialog open={openDeleteModal} onOpenChange={setOpenDeleteModal}>
        <DialogContent className="p-4 w-[400px]">
          <DeleteModal
            message={"Are you sure you want to delete this customer?"}
            handleDelete={() => handleDelete(id ?? "")}
          />
        </DialogContent>
      </Dialog>

     
    </>
  );
}

export default CustomerPage;
