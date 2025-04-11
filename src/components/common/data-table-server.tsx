import React, { useState } from 'react';
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
import { Button } from '../custom/button';
import { Input } from '../ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { cn } from '@/lib/utils';

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  sorting: SortingState;
  pagination: { pageIndex: number; pageSize: number };
  columnFilters: ColumnFiltersState
  setSorting: (sorting: SortingState) => void;
  setPagination: (pagination: { pageIndex: number; pageSize: number }) => void;
  setColumnFilters: (columnFilters: ColumnFiltersState) => void;
  totalCount: number;
}

function DataTableServer<TData, TValue>({
  columns,
  data,
  setSorting,
  setPagination,
  setColumnFilters,
  totalCount,
  sorting,
  columnFilters,
  pagination
}: DataTableProps<TData, TValue>) {
  
  const table = useReactTable({
    columns,
    data,
    manualPagination: true,
    manualSorting: true,
    manualFiltering: true,
    pageCount: Math.ceil(totalCount / pagination.pageSize),
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
    rowCount: totalCount,
  });
  
  return (
    <>
      <div className="table-border-radius bg-white">
        <Table>
          <TableHeader className="rounded-t-lg font-semibold text-secondary-foreground">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
          {headerGroup.headers.map((header) => {
            return (
              <TableHead key={header.id}>
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
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
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
                  {row.getVisibleCells().map((cell) => (
                    <TableCell className="py-2 px-3" key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow className="w-[1317px] h-[76px] pt-[16px] gap-[24px] border-b border-gray-200">
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-between space-x-2 py-4 text-sm">
        <div className="space-x-2 flex items-center justify-between">
          <div className="flex items-center">
            <p className="flex-shrink-0">Records:&nbsp;&nbsp;</p>
            <Select
              onValueChange={(value) =>
                setPagination({ ...pagination, pageSize: Number(value), pageIndex: 0 })
              }
              value={pagination.pageSize.toString()}
            >
              <SelectTrigger className={cn('h-8')}>
                <SelectValue placeholder="Records" />
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
              pagination.pageIndex * pagination.pageSize + 1
            )}
            -
            {Math.min(
              table.getRowCount(),
              (pagination.pageIndex + 1) * pagination.pageSize
            )}{' '}
            of Total&nbsp;
            {table.getRowCount()} Records
          </p>
        </div>

        <div className="space-x-2">
          <Button
            variant="accent"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="accent"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </>
  );
}

export default DataTableServer;