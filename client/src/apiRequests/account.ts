import http from '@/lib/http'
import { AccountResType, ChangePasswordBodyType, UpdateMeBodyType } from '@/schemaValidations/account.schema'

const accountApiRequest = {
  me: () => http.get<AccountResType>('/accounts/me'), // được dùng khi đã xác thực
  sMe: (accessToken: string) => http.get<AccountResType>('/accounts/me', {  //Sử dụng sMe khi bạn có access token và muốn gửi nó cùng với yêu cầu để xác thực.
    headers:{
      Authorization: `Bearer ${accessToken}`
    } //gọi ở server component
  }),
  updateMe: (body: UpdateMeBodyType) => http.put<AccountResType>('/accounts/me', body),
  changePassword: (body: ChangePasswordBodyType) => { return http.put< AccountResType>('/accounts/change-password', body)},


}
export default accountApiRequest