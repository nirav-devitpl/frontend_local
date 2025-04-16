import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  SortingState,
  getSortedRowModel,
  ColumnFiltersState,
  getFilteredRowModel,
} from '@tanstack/react-table';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { cn } from '@/lib/utils';
import { useTranslation } from 'react-i18next';

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  sorting: SortingState;
  pagination: { page: number; limit: number };
  columnFilters: ColumnFiltersState;
  setSorting: (sorting: SortingState) => void;
  setPagination: (pagination: { page: number; limit: number }) => void;
  setColumnFilters: (columnFilters: ColumnFiltersState) => void;
  total: number;
}

function DataTableServer<TData, TValue>({
  columns,
  data,
  sorting,
  pagination,
  columnFilters,
  setSorting,
  setPagination,
  setColumnFilters,
  total,
}: DataTableProps<TData, TValue>) {
  const { t } = useTranslation(); 

  const table = useReactTable({
    columns,
    data,
    manualPagination: true,
    manualSorting: true,
    manualFiltering: true,
    pageCount: Math.ceil(total / pagination.limit),
    onSortingChange: setSorting,
    onPaginationChange: setPagination,
    onColumnFiltersChange: setColumnFilters,
    state: {
      sorting: sorting.length ? sorting : [{ id: 'updatedOn', desc: true }],
      pagination,
      columnFilters,
    },
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    rowCount: total,
  });

  return (
    <>
      <div className="table-border-radius bg-white rounded-lg overflow-hidden border">
        <Table>
          <TableHeader className="rounded-t-lg font-semibold text-secondary-foreground h-16">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header, index) => {
                  const isFirstColumn = index === 0;
                  return (
                    <TableHead
                      key={header.id}
                      className={cn('pt-6', isFirstColumn && 'pl-10')}
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                  className="w-[1317px] h-[76px] pt-[16px] gap-[24px] border-b border-gray-200"
                >
                  {row.getVisibleCells().map((cell, index) => {
                    const isFirstColumn = index === 0;
                    return (
                      <TableCell
                        className={cn('py-2 px-3', isFirstColumn && 'pl-10')}
                        key={cell.id}
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))
            ) : (
              <TableRow className="w-[1317px] h-[76px] pt-[16px] gap-[24px] border-b border-gray-200">
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  {t('TABLE.NO_RESULTS')}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-between space-x-2 py-6 text-sm">
        <div className="space-x-2 flex items-center justify-between">
          <div className="flex items-center">
            <p className="flex-shrink-0">{t('TABLE.RECORDS')}:&nbsp;&nbsp;</p>
            <Select
              onValueChange={(value) =>
                setPagination({ ...pagination, limit: Number(value), page: 0 })
              }
              value={pagination.limit.toString()}
            >
              <SelectTrigger className={cn('h-8')}>
                <SelectValue placeholder={t('TABLE.RECORDS')} />
              </SelectTrigger>

              <SelectContent className="w-[70px]">
                {[10, 30, 50, 100].map((ps, idx) => (
                  <SelectItem
                    key={`page-size-${ps + idx}`}
                    value={ps.toString()}
                  >
                    {ps}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <p>
            Showing{' '}
            {Math.min(
              table.getRowCount(),
              pagination.page * pagination.limit + 1
            )}
            -
            {Math.min(
              table.getRowCount(),
              (pagination.page + 1) * pagination.limit
            )}{' '}
            of Total&nbsp;
            {table.getRowCount()} Records
          </p>
        </div>

        <div className="flex items-center space-x-2">
            <button
            className={cn(
              'px-2 py-1 rounded',
              !table.getCanPreviousPage() ? 'opacity-50' : 'cursor-pointer'
            )}
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M13.3 17.3008L8.70005 12.7008C8.60005 12.6008 8.52938 12.4924 8.48805 12.3758C8.44672 12.2591 8.42572 12.1341 8.42505 12.0008C8.42505 11.8674 8.44605 11.7424 8.48805 11.6258C8.53005 11.5091 8.60072 11.4008 8.70005 11.3008L13.3 6.70078C13.4834 6.51745 13.7167 6.42578 14 6.42578C14.2834 6.42578 14.5167 6.51745 14.7 6.70078C14.8834 6.88411 14.975 7.11745 14.975 7.40078C14.975 7.68411 14.8834 7.91745 14.7 8.10078L10.8 12.0008L14.7 15.9008C14.8834 16.0841 14.975 16.3174 14.975 16.6008C14.975 16.8841 14.8834 17.1174 14.7 17.3008C14.5167 17.4841 14.2834 17.5758 14 17.5758C13.7167 17.5758 13.4834 17.4841 13.3 17.3008Z" fill="#CBD5E1"/>
            </svg>
            </button>
          {Array.from({ length: Math.max(table.getPageCount(), 1) }, (_, index) => (
            <button
              key={index}
              className={cn(
              'font-poppins font-normal text-sm leading-5 tracking-normal relative flex items-center justify-center px-2',
              pagination.page === index
                ? 'w-6 h-6 rounded-full bg-[#e64560] text-white'
                : 'text-[#64748b] cursor-pointer'
              )}
              onClick={() => setPagination({ ...pagination, page: index })}
            >
              {index + 1}
            </button>
          ))}
            <button
            className={cn(
              'px-2 py-1 rounded',
              table.getCanNextPage() ? 'cursor-pointer' : 'opacity-50'
            )}
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M8.70005 17.3008C8.51672 17.1174 8.42505 16.8841 8.42505 16.6008C8.42505 16.3174 8.51672 16.0841 8.70005 15.9008L12.6 12.0008L8.70005 8.10078C8.51672 7.91745 8.42505 7.68411 8.42505 7.40078C8.42505 7.11745 8.51672 6.88411 8.70005 6.70078C8.88338 6.51745 9.11671 6.42578 9.40005 6.42578C9.68338 6.42578 9.91672 6.51745 10.1 6.70078L14.7 11.3008C14.8 11.4008 14.871 11.5091 14.913 11.6258C14.955 11.7424 14.9757 11.8674 14.975 12.0008C14.975 12.1341 14.954 12.2591 14.912 12.3758C14.87 12.4924 14.7994 12.6008 14.7 12.7008L10.1 17.3008C9.91672 17.4841 9.68338 17.5758 9.40005 17.5758C9.11671 17.5758 8.88338 17.4841 8.70005 17.3008Z" fill="#64748B"/>
            </svg>
            </button>
        </div>
      </div>
    </>
  );
}

export default DataTableServer;