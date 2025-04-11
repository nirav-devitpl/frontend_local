import Selectable from '@/components/common/dropdown';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { cn, formattedOptions } from '@/lib/utils';
import {
  useCreateCategoryMutation,
  useGetCategoriesQuery,
  useGetCategoryByIdQuery,
  useUpdateCategoryMutation,
} from '@/services/category';
import { categorySchema } from '@/validation-schema/category';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form';
import { z } from 'zod';
import showToast from '@/components/common/toast';
import { Button } from '@/components/custom/button';
import { useEffect } from 'react';
import { CategoryFormData } from '@/models/category';

/**
 * Function to render the category form
 * @param id category id
 * @param handleClose function to handle the close event
 * @returns category form component
 */
function CategoryForm({
  id,
  handleClose,
}: {
  id: string | null;
  handleClose: () => void;
}) {
  const { data: categories, isLoading: isCategoriesLoading } =
    useGetCategoriesQuery('CATEGORIES', {
      selectFromResult: ({ data, ...rest }) => ({
        data: data?.result,
        ...rest,
      }),
    });

  const [createCategory] = useCreateCategoryMutation();
  const { data: category } = useGetCategoryByIdQuery(id, { skip: !id });
  const [updateCategory] = useUpdateCategoryMutation();
  const form = useForm<z.infer<typeof categorySchema>>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: '',
      parentCategory: {
        label: '',
        value: '',
      },
      status: 'active',
    },
  });

  /**
   * Function to handle the form submission
   * @param data form data
   */
  const onSubmit = (data: z.infer<typeof categorySchema>) => {
    const payload = {
      id: id ?? '',
      name: data.name,
      parentCategory: data.parentCategory?.value || null,
      status: data.status === 'active' ? true : false,
    };
    const action = id ? updateCategory : createCategory;
    action(payload)
      .then((res) => {
        showToast(res?.data?.message, 'success');
        handleClose();
      })
      .catch((err) => {
        showToast(err?.data?.message, 'error');
      });
  };

  /**
   * Function to handle the form submission
   * @param data form data
   * @description This function is used to reset the form values
   */
  useEffect(() => {
    if (id) {
      const payload: CategoryFormData = {
        name: category?.result?.name,
        parentCategory: {
          label: category?.result?.parentCategoryDetails?.name,
          value: category?.result?.parentCategoryDetails?._id,
        },
        status: category?.result?.isActive ? 'active' : 'inactive',
      };
      form.reset(payload);
    }
  }, [id, category?.result, form.reset]);

  return (
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          {/* Name */}
          <FormField
            control={form.control}
            name="name"
            render={({ field, fieldState }) => (
              <FormItem>
                <FormLabel
                  className={cn('h-9', {
                    'text-foreground': fieldState.invalid,
                  })}
                >
                  Name <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    className={cn('h-9', {
                      'border-red-500 focus:outline-red-500':
                        fieldState.invalid,
                    })}
                    placeholder="Enter category name"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-sm">
                  {fieldState.error?.message}
                </FormMessage>
              </FormItem>
            )}
          />

          {/* Parent Category */}
          <FormField
            control={form.control}
            name="parentCategory"
            render={({ field }) => (
              <FormItem>
                <div className="flex justify-start gap-1.5 items-center mt-5">
                  <FormLabel>Parent Category</FormLabel>
                </div>
                <FormControl>
                  <Selectable
                    list={formattedOptions(categories, '_id', 'name')}
                    handleSelectOnChange={field.onChange}
                    selectValue={field.value}
                    isLoading={isCategoriesLoading}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          {/* Status */}
          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem className="mt-5">
                <FormLabel>Status</FormLabel>
                <div className="flex gap-2">
                  <FormControl>
                    <RadioGroup
                      className="flex justify-start gap-1.5 items-start mt-2.5"
                      onValueChange={field.onChange}
                      value={field.value}
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="active" id="typeOfCompany1" />
                        <p className="text-sm text-[#484848]">Active</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="inactive" id="typeOfCompany2" />
                        <p className="text-sm text-[#484848]">Inactive</p>
                      </div>
                    </RadioGroup>
                  </FormControl>
                </div>
              </FormItem>
            )}
          />

          <Button type="submit" className="mt-4 w-full">
            {id ? 'Update' : 'Create'}
          </Button>
        </form>
      </Form>
  );
}

export default CategoryForm;
