# Code Citations

## License: MIT
https://github.com/maxstue/kijk/tree/29fdde0a9810ee4fac1c69316fe03a049b37291e/apps/nextjs-web/src/components/data-table/data-table.tsx

```
value={(table.getColumn('name')?.getFilterValue() as string) ?? ''}
                onChange={(event) => table.getColumn('name')?.setFilterValue(event.target.value)}
                className='
```


## License: unknown
https://github.com/stormy251/stormy-adams/tree/f3a011654413c4d593731318353e2a59fa554d03/src/components/services/ServicesDataTable.tsx

```
<div className='rounded-md border'>
              <Table>
                <TableHeader>
                  {table.getHeaderGroups().map((headerGroup) => (
                    <TableRow key={headerGroup.id}>
                      {headerGroup.headers.map((header) => {
```


## License: Apache_2_0
https://github.com/supabase/supabase/tree/11f728889ff6e9576cd2bb4b1096b962e6acc38a/packages/ui/src/components/shadcn/stories/DataTable.storiesFIX%20LATER.tsx

```
{headerGroup.headers.map((header) => {
                        return (
                          <TableHead key={header.id}>
                            {header.isPlaceholder
                              ? null
                              : flexRender(header.column.columnDef.header, header.getContext())}
                          </TableHead>
                        )
                      }
```


## License: unknown
https://github.com/notturnomio/asqabar-admin/tree/a116c7c9d0a873cba1ad948805386b00d1afef0d/components/ui/dataTable.tsx

```
div className='rounded-md border'>
              <Table>
                <TableHeader>
                  {table.getHeaderGroups().map((headerGroup) => (
                    <TableRow key={headerGroup.id}>
                      {headerGroup.headers.map((header) => {
                        return
```


## License: unknown
https://github.com/phewstaff/data-table-test-task/tree/7ee57ff7963058da339409f02ea4095078aa96ac/app/users/data-table.tsx

```
<Table>
                <TableHeader>
                  {table.getHeaderGroups().map((headerGroup) => (
                    <TableRow key={headerGroup.id}>
                      {headerGroup.headers.map((header) => {
                        return (
                          <TableHead key={header.id}
```

