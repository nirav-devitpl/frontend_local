import { Button } from '@/components/custom/button';
import { Badge } from '@/components/ui/badge';
import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown, Trash2 } from 'lucide-react';
import { IconPencilMinus } from '@tabler/icons-react';
import { CategoryResponse } from '@/models/category';



export default function useColumns(handleOpen: (id: string | null) => void, handleOpenDeleteModal: (id: string) => void) {

    //Datatable columns
    const columns: ColumnDef<CategoryResponse>[] = [
        {
            accessorKey: 'name',
            id: 'name',
            enableColumnFilter: true,
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        className='pl-0'
                        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
                    >
                        Name
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                );
            },
        },
        {
            accessorKey: 'parentCategory',
            id: 'parentCategory',
            enableColumnFilter: true,
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        className='pl-0'
                        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
                    >
                        Parent Category
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                );
            },
            cell: ({ row }) => row.original?.parentCategoryDetails?.name || '-'
        },
        {
            accessorFn: (row) => `${row.isActive === true ? 'Active' : 'Inactive'}`,
            id: 'status',
            enableColumnFilter: true,
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        className='pl-0'
                        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
                    >
                        Status
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                );
            },
            cell: ({ row }) => (
                <>
                    <Badge
                        variant={
                            row.getValue('status') === 'Active' ? 'success' : 'destructive'
                        }
                        className='rounded-sm'
                    >
                        {row.getValue('status')}
                    </Badge>
                </>
            ),
        },
        {
            accessorKey: 'actions',
            header: 'Actions',
            enableColumnFilter: false,
            cell: ({ row }) => (
                <>
                    <div className="flex gap-1">

                        <Button
                            size="action"
                            variant="action"
                            className="text-primary bg-primary/10 hover:bg-primary/30"
                            title="Edit"
                            onClick={() => handleOpen(row?.original?._id || null)}
                        >
                            <IconPencilMinus size={15} />
                        </Button>

                        <Button
                            size="action"
                            variant="action"
                            className="text-red-500 bg-red-500/10 hover:bg-red-500/30"
                            title="Delete"
                            onClick={() => handleOpenDeleteModal(row?.original?._id || '')}
                        >
                            <Trash2 size={15} />
                        </Button>

                    </div>
                </>
            )
        }
    ];

    return columns;
}
