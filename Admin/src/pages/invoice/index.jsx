import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import useWidth from "@/hooks/useWidth";
import Button from "@/components/ui/Button";
import GridLoading from "@/components/skeleton/Grid";
import TableLoading from "@/components/skeleton/Table";
// import { toggleAddModal } from "./store";
import { ToastContainer } from "react-toastify";

import AddInvoice from "./AddInvoice";
import EditInvoice from "./EditInvoice";
import InvoicesList from "./InvoicesList";
import {
  getInvoices,
  toggleAddModal,
} from "../../store/features/invoice/invoiceSlice";

const InvoicePostPage = () => {
  const [filler, setfiller] = useState("list");
  const { width, breakpoints } = useWidth();
  const [isLoaded, setIsLoaded] = useState(false);

  const { invoices } = useSelector((state) => state.invoice);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getInvoices());
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
          Invoice
        </h4>
        <div
          className={`${
            width < breakpoints.md ? "space-x-rb" : ""
          } md:flex md:space-x-4 md:justify-end items-center rtl:space-x-reverse`}
        >
          <Button
            icon="heroicons-outline:plus"
            text="Add Invoice"
            className="btn-dark dark:bg-slate-800  h-min text-sm font-normal"
            iconClass=" text-lg"
            onClick={() => dispatch(toggleAddModal(true))}
          />
        </div>
      </div>

      {isLoaded && filler === "list" && (
        <TableLoading count={invoices?.length} />
      )}

      {filler === "list" && !isLoaded && (
        <div>
          <InvoicesList invoices={invoices} />
        </div>
      )}
      <AddInvoice />
      <EditInvoice />
    </div>
  );
};

export default InvoicePostPage;
