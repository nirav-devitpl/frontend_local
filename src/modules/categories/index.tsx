import Loader from "@/components/common/loader";
import { useDeleteCategoryMutation, useGetCategoriesQuery } from "@/services/category";
import { useEffect, useState } from "react";
import useColumns from "./utils/use-columns";
import { Button } from "@/components/custom/button";
import { Card, CardContent } from "@/components/ui/card";
import { Drawer, DrawerContent } from "@/components/ui/drawer";
import { Plus } from "lucide-react";
import CategoryAddEditPage from "./add-edit";
import DataTable from "@/components/common/data-table";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import DeleteModal from "@/components/common/delete-modal";
import showToast from "@/components/common/toast";
import { IconBinaryTree } from "@tabler/icons-react";
import TreeView from "./components/tree-view";

/**
 * @memberof categories
 * @name CategoryPage
 * @description CategoryPage component renders screen with list of categories with option to sort and search fields.
 * @returns {JSX.Element} - The rendered CategoryPage component.
 */

function CategoryPage() {
  const [isOpen, setIsOpen] = useState(false);
  const [id, setId] = useState<string | null>(null);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [isOpenTree, setIsOpenTree] = useState(false);

  const { data, isLoading, refetch } = useGetCategoriesQuery("CATEGORIES", {
    selectFromResult: ({ data, ...rest }) => ({
      data: data?.result,
      ...rest,
    }),
  });

  const [deleteCategory] = useDeleteCategoryMutation();


  const handleClose = () => {
    setIsOpen(false);
  }

  const handleOpen = (id: string | null) => {
    setIsOpen(true);
    setId(id);
  }

  const handleOpenTree = () => {
    setIsOpenTree(true);
  }
  const handleCloseTree = () => {
    setIsOpenTree(false);
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

  const columns = useColumns(handleOpen, handleOpenDeleteModal);


  useEffect(() => {
    refetch();
  }, [data]);
  return (
    <>
      <div className="flex justify-between px-4 py-2 items-center h-[52px]">
        <h1 className="font-semibold text-lg">Categories</h1>
        <div className="flex items-center">
          <Button className='ml-2 flex items-center' variant="default" onClick={() => handleOpen(null)} ><Plus size={15} className='mr-1' />Add Category</Button>
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
          <CategoryAddEditPage name={"Add"} id={id} handleClose={handleClose} />
        </DrawerContent>
      </Drawer>

      <Dialog open={openDeleteModal} onOpenChange={setOpenDeleteModal}>
        <DialogContent className="p-4 w-[400px]">
          <DeleteModal
            message={"Are you sure you want to delete this category?"}
            handleDelete={() => handleDelete(id ?? "")}
          />
        </DialogContent>
      </Dialog>

      <Drawer direction='right' open={isOpenTree} onOpenChange={setIsOpenTree} onClose={handleCloseTree}>
        <DrawerContent className='p-4'>
          <TreeView handleCloseTree={handleCloseTree} />
        </DrawerContent>
      </Drawer>
    </>
  );
}

export default CategoryPage;
