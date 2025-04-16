import { Button } from '@/components/custom/button';
import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown } from 'lucide-react';
 
 
export default function useColumns() {    

    //Datatable columns
    const columns: ColumnDef<any>[] = [
        {
            accessorKey: 'id',
            id: 'id',
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
                        Id
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                );
            },
        },
        {
            accessorKey: 'direction',
            id: 'direction',
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
                        Direction
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                );
            },
        },
        {
            accessorKey: 'protocol',
            id: 'protocol',
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
                        Protocol
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                );
            },
        },
        {
            accessorKey: 'createdAt',
            id: 'createdAt',
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
                        Created At
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                );
            },
        },
        {
            accessorKey: 'updatedAt',
            id: 'updatedAt',
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
                        Updated At
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                );
            },
        },
        
    ];
    return columns;
}