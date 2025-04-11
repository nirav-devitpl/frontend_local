import React, { useState } from "react";
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
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "../custom/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { cn } from "@/lib/utils";
import { useTranslation } from "react-i18next";

/**
 * @interface DataTableProps
 * @property {Array<ColumnDef>} columns - Array of column definitions used to configure the table structure and behavior.
 * @property {Array} data - Array of data objects to be displayed in the table.
 */
interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

/**
 * @memberof common
 * @name DataTable
 * @description DataTable component renders a dynamic , sortable , filterable and paginated table for displaying structured data.
 * @interface DataTableProps props - The properties to be passed to the component.
 * @param {ColumnDef[]} columns - Array of column definitions used to configure the table structure and behavior.
 * @param {Array} data - Array of data objects to be displayed in the table.
 * @returns {JSX.Element} - The rendered Form for Module component.
 */
function DataTable<TData, TValue>({
  columns,
  data,
}: Readonly<DataTableProps<TData, TValue>>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );

  
  const { t } = useTranslation();

  const [pagination, setPagination] = useState({
    pageIndex: 0, //initial page index
    pageSize: 10, //default page size
  });
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onPaginationChange: setPagination,
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      pagination,
      columnFilters,
    },
  });

  return (
    <>
      <div className="rounded-sm border">
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
          </TableHeader>
          <TableBody>
        {table.getRowModel().rows?.length ? (
          table.getRowModel().rows.map((row) => (
            <TableRow
          key={row.id}
          data-state={row.getIsSelected() && "selected"}
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
          <TableRow>
            <TableCell
          colSpan={columns.length}
          className="h-24 text-center "
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
            <p className="flex-shrink-0">Records:&nbsp;</p>
            <Select
              onValueChange={(value) =>
                setPagination((prev) => ({
                  ...prev,
                  pageSize: Number(value),
                  pageIndex: 0,
                }))
              }
              value={pagination.pageSize.toString()}
            >
              <SelectTrigger className={cn("h-8")}>
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
            Showing{" "}
            {Math.min(
              table.getRowCount(),
              pagination.pageIndex * pagination.pageSize + 1
            )}
            -
            {Math.min(
              table.getRowCount(),
              (pagination.pageIndex + 1) * pagination.pageSize
            )}{" "}
            of Total&nbsp;
            {table.getRowCount()} Records
          </p>
        </div>

        <div className="space-x-2">
          <Button
            variant="default"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            {t("BUTTON.PREVIOUS")}
          </Button>
          <Button
            variant="default"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            {t("BUTTON.NEXT")}
          </Button>
        </div>
      </div>
    </>
  );
}

export default DataTable;
