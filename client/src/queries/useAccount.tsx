import accountApiRequest from "@/apiRequests/account";
import {

  CreateEmployeeAccountBodyType,
  UpdateEmployeeAccountBodyType,

} from "@/schemaValidations/account.schema";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useAccountMe = () => {
  return useQuery({
    queryKey: ["account-profile"],
    queryFn: () => accountApiRequest.me(),
  });
};

export const useUpdateMeMutation = () => {
  return useMutation({
    mutationFn: accountApiRequest.updateMe,
  });
};

export const useChangePasswordMutation = () => {
  return useMutation({
    mutationFn: accountApiRequest.changePassword,
  });
};

export const useGetAccountList = () => {
  return useQuery({
    queryKey: ["accounts"],
    queryFn: () => accountApiRequest.list(),
  });
};

export const useGetAccount = ({ id, enabled }: { id: number, enabled: boolean }) => {
  return useQuery({
    queryKey: ["accounts", id],
    queryFn: () => accountApiRequest.getEmployee(id),
    enabled
  });
};

export const useUpdateAccountMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      id,
      ...body
    }: UpdateEmployeeAccountBodyType & { id: number }) => {
      return accountApiRequest.updateEmployee(id, body);
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["accounts"],
        exact: true,
      });
    },
  });
};

export const useAddAccountMutation = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (body: CreateEmployeeAccountBodyType) => accountApiRequest.addEmployee(body),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["accounts"], 
            })
        }
    })
}

export const useDeleteAccountMutation = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id: number) => accountApiRequest.deleteEmployee(id),
        onSuccess: ()=>{
            queryClient.invalidateQueries({
                queryKey: ['accounts'],
            })
        }
    })
}