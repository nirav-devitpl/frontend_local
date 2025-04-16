import { Button } from '@/components/custom/button';
import { IconPencil } from '@tabler/icons-react';
import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router';
 
 
export default function useColumns(
    handleOpenModal: (id: string) => void,
    handleActivateModel: (id: string) => void,
    isActiveTab: boolean
) {
    const navigate = useNavigate();

    //Datatable columns
    const columns: ColumnDef<any>[] = [
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
                        Name
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                );
            },
        },
        {
            accessorKey: 'code',
            id: 'code',
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
                        Code
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                );
            },
        },
        {
            accessorKey: 'type',
            id: 'type',
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
                    {isActiveTab ? (
                        <Button
                            size="action"
                            variant="action"
                            className="text-red-500 bg-red-500/10 hover:bg-red-500/30 cursor-pointer"
                            title="Edit"
                            onClick={() =>
                                navigate(`/channel-manager/edit/${row?.original?.id}`)
                            }
                        >
                            <IconPencil size={15} />
                        </Button>
                    ) : (
                        <Button
                            size="action"
                            variant="action"
                            className="text-red-500 bg-red-500/10 hover:bg-red-500/30 cursor-pointer"
                            title="Activate"
                            onClick={() =>
                                handleActivateModel(row?.original?.id ?? '')
                            }
                        >
                            <svg
                                width="20"
                                height="20"
                                viewBox="0 0 20 20"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M10 18.3327V14.166M7.5 6.66602V1.66602M12.5 6.66602V1.66602M15 6.66602V10.8327C15 11.7167 14.6488 12.5646 14.0237 13.1897C13.3986 13.8148 12.5507 14.166 11.6667 14.166H8.33333C7.44928 14.166 6.60143 13.8148 5.97631 13.1897C5.35119 12.5646 5 11.7167 5 10.8327V6.66602H15Z"
                                    stroke="#F81E1E"
                                    strokeWidth="1.3"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        </Button>
                    )}
                    {isActiveTab ? (
                        <Button
                            size="action"
                            variant="action"
                            className="text-red-500 bg-red-500/10 hover:bg-red-500/30 cursor-pointer"
                            title="Deactivate"
                            onClick={() =>
                                handleOpenModal(row?.original?.id ?? '')
                            }
                        >
                            <svg
                                width="20"
                                height="20"
                                viewBox="0 0 20 20"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M10 18.3327V14.166M7.5 6.66602V1.66602M12.5 6.66602V1.66602M15 6.66602V10.8327C15 11.7167 14.6488 12.5646 14.0237 13.1897C13.3986 13.8148 12.5507 14.166 11.6667 14.166H8.33333C7.44928 14.166 6.60143 13.8148 5.97631 13.1897C5.35119 12.5646 5 11.7167 5 10.8327V6.66602H15Z"
                                    stroke="#F81E1E"
                                    strokeWidth="1.3"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        </Button>
                    ) : (
                        <Button
                            size="action"
                            variant="action"
                            className="text-red-500 bg-red-500/10 hover:bg-red-500/30 cursor-pointer"
                            title="Delete"
                            onClick={() =>
                                handleOpenModal(row?.original?.id ?? '')
                            }
                        >
                            <Trash2 size={15} />
                        </Button>
                    )}
                </div>
            ),
        },
    ];
    return columns;
}