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
    onSortingChange: (updaterOrValue) => {
      if (typeof updaterOrValue === 'function') {
        setSorting(updaterOrValue([]));
      } else {
        setSorting(updaterOrValue);
      }
    },
    onPaginationChange: (updaterOrValue) => {
      if (typeof updaterOrValue === 'function') {
        setPagination(updaterOrValue(pagination));
      } else {
        setPagination(updaterOrValue);
      }
    },
    onColumnFiltersChange: (updaterOrValue) => {
      if (typeof updaterOrValue === 'function') {
        setColumnFilters(updaterOrValue([]));
      } else {
        setColumnFilters(updaterOrValue);
      }
    },
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
                    className={cn(
                      'pt-6',
                      isFirstColumn && 'pl-10'
                    )}
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

        <div className="flex items-center space-x-2">
          {/* Pagination */}
          <button
            className={cn(
              'px-2 py-1 border rounded',
              !table.getCanPreviousPage() && 'opacity-50 cursor-not-allowed'
            )}
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            {'<'}
          </button>
          {Array.from({ length: Math.max(table.getPageCount(), 1) }, (_, index) => (
            <button
              key={index}
              className={cn(
              'font-poppins font-normal text-sm leading-5 tracking-normal relative flex items-center justify-center',
              pagination.pageIndex === index
                ? 'w-6 h-6 rounded-full bg-[#e64560] text-white'
                : 'text-black'
              )}
              onClick={() => setPagination({ ...pagination, pageIndex: index })}
            >
              {index + 1}
            </button>
          ))}
          <button
            className={cn(
              'px-2 py-1 border rounded',
              !table.getCanNextPage() && 'opacity-50 cursor-not-allowed'
            )}
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            {'>'}
          </button>
        </div>
      </div>
    </>
  );
}

export default DataTableServer;