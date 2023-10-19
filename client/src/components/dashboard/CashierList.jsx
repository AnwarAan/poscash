import { TableCell, TableRow } from "@/components/ui/table";
import { useContext } from "react";
import { AuthContext } from "../auth/AuthContext";
import { deleteAPI, getAPI } from "@/repositories/api";
import { Link, useNavigate } from "react-router-dom";
import EditCashier from "@/pages/dashboard/EditCashier";
import {useQuery, useMutation } from "@tanstack/react-query";

const CashierList = ({ cashier, index }) => {    
  // console.log(cashier);
  const { userId } = useContext(AuthContext)
  const data = {cashier}
  // console.log(data);
  // const deleteUser =  async () => {
  //   await deleteAPI(`user/${data.cashierId}`, data)
  //   location.reload()
  // }
  // console.log(ddta);
  const mutation = useMutation({
    mutationFn: () => {
      const cashierId = data.cashier.id
      return deleteAPI(`user/${cashierId}`, data)
    },
    onSuccess: () => {
      location.reload()
    }
  })


  const onClick = () => {
    mutation.mutate()
  }

  return (
    <TableRow>
      <TableCell className="w-1/6 font-medium">{index + 1}</TableCell>
      <TableCell className="w-1/6 font-medium">{cashier.fullname}</TableCell>
      <TableCell className="w-12">{cashier.id}</TableCell>
      <TableCell className="w-12">{cashier.phone_number}</TableCell>
      <TableCell className="w-2/6">
      <div className="flex items-center ">
          <button className="inline-block text-sm px-4 py-2 mx-2 leading-none border rounded text-blue-800 border-blue-600 hover:bg-blue-300 hover:text-blue-500 mt-4 lg:mt-0"
          >
            <Link to={`/dashboard/cashier/edit/${cashier.id}`} state={data} className="flex items-center gap-2">

              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-file-edit"><path d="M4 13.5V4a2 2 0 0 1 2-2h8.5L20 7.5V20a2 2 0 0 1-2 2h-5.5"/><polyline points="14 2 14 8 20 8"/><path d="M10.42 12.61a2.1 2.1 0 1 1 2.97 2.97L7.95 21 4 22l.99-3.95 5.43-5.44Z"/>
                {/* <EditCashier id={{id: data.cashierId}}/>           */}
              </svg>
            </Link>
        </button>

        <button className="inline-block text-sm px-4 py-2 leading-none border rounded text-red-800 border-red-600 hover:bg-red-300 hover:text-red-500 mt-4 lg:mt-0"
          onClick={onClick}
        >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-delete"><path d="M20 5H9l-7 7 7 7h11a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2Z"/><line x1="18" x2="12" y1="9" y2="15"/><line x1="12" x2="18" y1="9" y2="15"/>
        </svg>
        </button>
      </div>
      </TableCell>
    </TableRow>
  );
};

export default CashierList;
