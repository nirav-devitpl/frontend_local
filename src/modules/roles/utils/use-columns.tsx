import { Button } from '@/components/custom/button';
import { IconPencil } from '@tabler/icons-react';
import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown, CopyIcon, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router';
 
 
export default function useColumns(
    handleOpenDeleteModal: (id: string) => void,
) {
    const navigate = useNavigate();

    //Datatable columns
    const columns: ColumnDef<any>[] = [
        // {
        //     accessorKey: 'code',
        //     id: 'code',
        //     enableColumnFilter: false,
        //     header: ({ column }) => {
        //         return (
        //             <Button
        //                 variant="ghost"
        //                 className="pl-0"
        //                 onClick={() =>
        //                     column.toggleSorting(column.getIsSorted() === 'asc')
        //                 }
        //             >
        //                 Code
        //                 <ArrowUpDown className="ml-2 h-4 w-4" />
        //             </Button>
        //         );
        //     },
        // },
        {
            accessorKey: 'name',
            id: 'name',
            enableColumnFilter: false,
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        className="pl-0"
                        onClick={() =>
                            column.toggleSorting(column.getIsSorted() === 'asc')
                        }
                    >
                        Role Name
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                );
            },
        },
        // {
        //     accessorKey: 'in_use',
        //     id: 'in_use',
        //     enableColumnFilter: false,
        //     header: ({ column }) => {
        //         return (
        //             <Button
        //                 variant="ghost"
        //                 className="pl-0"
        //                 onClick={() =>
        //                     column.toggleSorting(column.getIsSorted() === 'asc')
        //                 }
        //             >
        //                 In use
        //                 <ArrowUpDown className="ml-2 h-4 w-4" />
        //             </Button>
        //         );
        //     },
        // },
        // {
        //     accessorKey: 'last_changed',
        //     id: 'last_changed',
        //     enableColumnFilter: false,
        //     header: ({ column }) => {
        //         return (
        //             <Button
        //                 variant="ghost"
        //                 className="pl-0"
        //                 onClick={() =>
        //                     column.toggleSorting(column.getIsSorted() === 'asc')
        //                 }
        //             >
        //                 Code
        //                 <ArrowUpDown className="ml-2 h-4 w-4" />
        //             </Button>
        //         );
        //     },
        // },
        {
            accessorKey: 'actions',
            header: 'Actions',
            enableColumnFilter: false,
            cell: ({ row }) => (
                <div className="flex gap-1">
                    <Button
                        size="action"
                        variant="action"
                        className="text-red-500 bg-red-500/10 hover:bg-red-500/30 cursor-pointer"
                        title="Edit"
                        onClick={() =>
                            navigate(`/roles/edit/${row?.original?.id}`)
                        }
                    >
                        <IconPencil size={15} />
                    </Button>
                    <Button
                        size="action"
                        variant="action"
                        className="text-red-500 bg-red-500/10 hover:bg-red-500/30 cursor-pointer"
                        title="Copy"
                        
                    >
                        <CopyIcon size={15} />
                    </Button>                
                    <Button
                        size="action"
                        variant="action"
                        className="text-red-500 bg-red-500/10 hover:bg-red-500/30 cursor-pointer"
                        title="Delete"
                        onClick={() =>
                            handleOpenDeleteModal(row?.original?.id ?? '')
                        }
                    >
                        <Trash2 size={15} />
                    </Button>
                    
                </div>
            ),
        },
    ];
    return columns;
}