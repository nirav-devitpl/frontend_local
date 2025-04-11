
import { DrawerDescription, DrawerHeader, DrawerTitle } from '@/components/ui/drawer';
// import { CategoryAddEditProps } from '@/models/category';
import CustomerForm from './components/customer-form';

function CustomerAddEditPage({ name, id, handleClose }: any) {
  return (
    <>
      <DrawerHeader className="pl-0">
        <DrawerTitle>Category</DrawerTitle>
        <DrawerDescription>{name} category</DrawerDescription>
      </DrawerHeader>
      <CustomerForm id={id || null} handleClose={handleClose} />
    </>
  );
}

export default CustomerAddEditPage;
