import http from "@/lib/http";
import { CreateTableBodyType, TableListResType, TableResType, UpdateTableBodyType } from "@/schemaValidations/table.schema";

export const tableApiRequest = {
    list: () => http.get<TableListResType>("tables"),
    getTable: (id: number) => http.get<TableListResType>(`tables/${id}`),
    add: (body: CreateTableBodyType) => http.post<TableListResType>("tables", body),
    updateTable: (id: number, body: UpdateTableBodyType) => http.put<TableResType>(`tables/${id}`, body),
    deleteTable: (id: number) => http.delete<TableResType>(`tables/${id}`)
}