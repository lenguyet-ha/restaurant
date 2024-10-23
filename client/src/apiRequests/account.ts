import http from '@/lib/http'
import { AccountListResType, AccountResType, ChangePasswordBodyType, CreateEmployeeAccountBodyType, UpdateEmployeeAccountBodyType, UpdateMeBodyType } from '@/schemaValidations/account.schema'

const prefix = '/accounts'
const accountApiRequest = {
  me: () => http.get<AccountResType>(`${prefix}/me`), // được dùng khi đã xác thực
  sMe: (accessToken: string) => http.get<AccountResType>(`${prefix}/me`, {  //Sử dụng sMe khi bạn có access token và muốn gửi nó cùng với yêu cầu để xác thực.
    headers:{
      Authorization: `Bearer ${accessToken}`
    } //gọi ở server component
  }),
  updateMe: (body: UpdateMeBodyType) => http.put<AccountResType>(`${prefix}/me`, body),
  changePassword: (body: ChangePasswordBodyType) => { return http.put< AccountResType>('/accounts/change-password', body)},
  list: () => http.get<AccountListResType >(`${prefix}`),
  addEmployee: (body: CreateEmployeeAccountBodyType) => {
    return http.post<AccountResType>(prefix, body)
  },
  updateEmployee: (id: number, body: UpdateEmployeeAccountBodyType) => {
    return http.put<AccountResType>(`${prefix}/detaild/:${id}`, body)
  },
  getEmployee:(id: number)=>{
    return http.get<AccountResType>(`${prefix}/detail/:${id}`)
  },
  deleteEmployee:(id: number)=>{
    return http.delete<AccountResType>(`$(prefix)/detail/:${id}`)
  }


}
export default accountApiRequest