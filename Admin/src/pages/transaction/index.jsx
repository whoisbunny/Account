import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import useWidth from "@/hooks/useWidth";
import Button from "@/components/ui/Button";
import GridLoading from "@/components/skeleton/Grid";
import TableLoading from "@/components/skeleton/Table";
import { ToastContainer } from "react-toastify";


import TransactionList from "./TransactionList";
import AddTransaction from "./AddTransaction";
import EditTransaction from "./EditTransaction";
import { getTransactions, toggleAddModal } from "../../store/features/transaction/transactionSlice";
import { getAccounts } from "../../store/features/account/accountSlice";
import { getInvoices } from "../../store/features/invoice/invoiceSlice";

const TransactionPostPage = () => {
  const dispatch = useDispatch();
  const [filler, setfiller] = useState("list");
  const { width, breakpoints } = useWidth();
  const [isLoaded, setIsLoaded] = useState(false);

  const { transactions } = useSelector((state) => state.transaction);
    const { accounts } = useSelector((state) => state.account);
    const { invoices } = useSelector((state) => state.invoice);

    useEffect(() => {
      dispatch(getAccounts());
      dispatch(getInvoices());
    }, []);

    const invoiceOption = [];
    const accountOption = [];
    accounts.forEach((el) => {
      accountOption.push({
        value: el._id,
        label: el.name,
      });
    });
    invoices.forEach((el) => {
      invoiceOption.push({
        value: el._id,
        label: el.invoiceNumber,
      });
    });


  useEffect(() => {
    dispatch(getTransactions());
  }, []);

  useEffect(() => {
    setIsLoaded(true);
    setTimeout(() => {
      setIsLoaded(false);
    }, 1500);
  }, [filler]);

  return (
    <div>
      <ToastContainer />
      <div className="flex flex-wrap justify-between items-center mb-4">
        <h4 className="font-medium lg:text-2xl text-xl capitalize text-slate-900 inline-block ltr:pr-4 rtl:pl-4">
          Transaction
        </h4>
        <div
          className={`${
            width < breakpoints.md ? "space-x-rb" : ""
          } md:flex md:space-x-4 md:justify-end items-center rtl:space-x-reverse`}
        >
          <Button
            icon="heroicons-outline:plus"
            text="Add Transaction"
            className="btn-dark dark:bg-slate-800  h-min text-sm font-normal"
            iconClass=" text-lg"
            onClick={() => dispatch(toggleAddModal(true))}
          />
        </div>
      </div>

      {isLoaded && filler === "list" && (
        <TableLoading count={transactions?.length} />
      )}

      {filler === "list" && !isLoaded && (
        <div>
          <TransactionList transactions={transactions} />
        </div>
      )}
      <AddTransaction
        invoiceOption={invoiceOption}
        accountOption={accountOption}
      />
      <EditTransaction
        invoiceOption={invoiceOption}
        accountOption={accountOption}
      />
    </div>
  );
};

export default TransactionPostPage;
