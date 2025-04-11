import { Button } from '@/components/custom/button';
import { Badge } from '@/components/ui/badge';
import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown, Trash2 } from 'lucide-react';



export default function useColumns(handleOpen: (id: string | null) => void, handleOpenDeleteModal: (id: string) => void) {

    //Datatable columns
    const columns: ColumnDef<any>[] = [
        {
            accessorKey: 'cstName',
            id: 'cstName',
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
            accessorKey: 'cstBillType',
            id: 'cstBillType',
            enableColumnFilter: true,
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        className='pl-0'
                        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
                    >
                        Code
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                );
            },
        },
        {
            accessorKey: 'cstContact',
            id: 'cstContact',
            enableColumnFilter: true,
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        className='pl-0'
                        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
                    >
                        Channel Type
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                );
            },
        },
    
        
        
          
        {
            accessorKey: 'actions',
            header: 'Actions',
            enableColumnFilter: false,
            cell: ({ row }) => (
                    <div className="flex gap-1">

                        
                        <Button
                            size="action"
                            variant="action"
                            className="text-red-500 bg-red-500/10 hover:bg-red-500/30"
                            title="Delete"
                            onClick={() => handleOpenDeleteModal(row?.original?.cstId || '')}
                        >
                            <Trash2 size={15} />
                        </Button>

                    </div>
            )
        }
    ];

    return columns;
}
