
import { DrawerDescription, DrawerHeader, DrawerTitle } from '@/components/ui/drawer';
import { CategoryAddEditProps } from '@/models/category';
import CategoryForm from './components/category-form';

function CategoryAddEditPage({ name, id, handleClose }: CategoryAddEditProps) {
  return (
    <>
      <DrawerHeader className="pl-0">
        <DrawerTitle>Category</DrawerTitle>
        <DrawerDescription>{name} category</DrawerDescription>
      </DrawerHeader>
      <CategoryForm id={id || null} handleClose={handleClose} />


    </>
  );
}

export default CategoryAddEditPage;
