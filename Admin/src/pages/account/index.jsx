import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import useWidth from "@/hooks/useWidth";
import Button from "@/components/ui/Button";
import GridLoading from "@/components/skeleton/Grid";
import TableLoading from "@/components/skeleton/Table";
import { ToastContainer } from "react-toastify";


import AccountList from "./AccountList";
import AddAccount from "./AddAccount";
import EditAccount from "./EditAccount";
import { getAccounts, toggleAddModal } from "../../store/features/account/accountSlice";

const AccountPostPage = () => {
  const [filler, setfiller] = useState("list");
  const { width, breakpoints } = useWidth();
  const [isLoaded, setIsLoaded] = useState(false);

  const { accounts } = useSelector((state) => state.account);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAccounts());
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
          Account
        </h4>
        <div
          className={`${
            width < breakpoints.md ? "space-x-rb" : ""
          } md:flex md:space-x-4 md:justify-end items-center rtl:space-x-reverse`}
        >
          <Button
            icon="heroicons-outline:plus"
            text="Add Account"
            className="btn-dark dark:bg-slate-800  h-min text-sm font-normal"
            iconClass=" text-lg"
            onClick={() => dispatch(toggleAddModal(true))}
          />
        </div>
      </div>

      {isLoaded && filler === "list" && (
        <TableLoading count={accounts?.length} />
      )}

      {filler === "list" && !isLoaded && (
        <div>
          <AccountList accounts={accounts} />
        </div>
      )}
      <AddAccount />
      <EditAccount />
    </div>
  );
};

export default AccountPostPage;
