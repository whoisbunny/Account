import React, { useEffect, useState } from "react";
import Select from "react-select";
import Modal from "@/components/ui/Modal";
import { useSelector, useDispatch } from "react-redux";
import Textinput from "@/components/ui/Textinput";
import Textarea from "@/components/ui/Textarea";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import Flatpickr from "react-flatpickr";

import {
  addTransaction,
  getTransactions,
  toggleAddModal,
} from "../../store/features/transaction/transactionSlice";

const styles = {
  multiValue: (base, state) => {
    return state.data.isFixed ? { ...base, opacity: "0.5" } : base;
  },
  multiValueLabel: (base, state) => {
    return state.data.isFixed
      ? { ...base, color: "#626262", paddingRight: 6 }
      : base;
  },
  multiValueRemove: (base, state) => {
    return state.data.isFixed ? { ...base, display: "none" } : base;
  },
  option: (provided, state) => ({
    ...provided,
    fontSize: "14px",
  }),
};
const MethodOptions = [
  {
    value: "Online",
    label: "Online",
  },
  {
    value: "Cash",
    label: "Cash",
  },
];
const AddTransaction = ({ invoiceOption, accountOption }) => {
  const { openTransactionModal } = useSelector((state) => state.transaction);
  const [picker, setPicker] = useState(new Date());

  const dispatch = useDispatch();

  const FormValidationSchema = yup
    .object({
      // name: yup.string().required("Name is required"),
    })
    .required();

  const {
    register,
    control,
    reset,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: yupResolver(FormValidationSchema),
    mode: "all",
  });

  const onSubmit = (data) => {
    data.date = picker;
    data.partyName = data.partyName.value;
    data.TransactionMethod = data.TransactionMethod.value;
    let inv = data.referenceOfInvoices?.map((el)=>el.value);
    data.referenceOfInvoices = JSON.stringify(inv);

    dispatch(addTransaction(data));
    setTimeout(() => {
      dispatch(getTransactions());
      reset();
      dispatch(toggleAddModal(false));
    }, 300);
  };

  return (
    <div>
      <Modal
        title="Add Transaction"
        labelclassName="btn-outline-dark"
        activeModal={openTransactionModal}
        onClose={() => dispatch(toggleAddModal(false))}
      >
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 ">
          <div>
            <label htmlFor="default-picker" className=" form-label">
              Invoice Date
            </label>

            <Flatpickr
              className="form-control py-2"
              value={picker}
              onChange={(date) => setPicker(date)}
              id="default-picker"
            />
          </div>

          <div className={errors.partyName ? "has-error" : ""}>
            <label className="form-label" htmlFor="icon_s">
              partyName
            </label>
            <Controller
              name="partyName"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  options={accountOption}
                  styles={styles}
                  className="react-select"
                  classNamePrefix="select"
                  id="icon_s"
                />
              )}
            />
            {errors.partyName && (
              <div className=" mt-2  text-danger-500 block text-sm">
                {errors.partyName?.message || errors.partyName?.label.message}
              </div>
            )}
          </div>
          <div className={errors.referenceOfInvoices ? "has-error" : ""}>
            <label className="form-label" htmlFor="icon_s">
              referenceOfInvoices
            </label>
            <Controller
              name="referenceOfInvoices"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  options={invoiceOption}
                  styles={styles}
                  className="react-select"
                  classNamePrefix="select"
                  id="icon_s"
                  isMulti
                />
              )}
            />
            {errors.referenceOfInvoices && (
              <div className=" mt-2  text-danger-500 block text-sm">
                {errors.referenceOfInvoices?.message ||
                  errors.referenceOfInvoices?.label.message}
              </div>
            )}
          </div>

          <Textinput
            name="amount"
            type="number"
            label="amount"
            placeholder=" amount"
            register={register}
            error={errors.amount}
          />

          <div className={errors.TransactionMethod ? "has-error" : ""}>
            <label className="form-label" htmlFor="icon_s">
              Transaction Method
            </label>
            <Controller
              name="TransactionMethod"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  options={MethodOptions}
                  styles={styles}
                  className="react-select"
                  classNamePrefix="select"
                  id="icon_s"
                />
              )}
            />
            {errors.TransactionMethod && (
              <div className=" mt-2  text-danger-500 block text-sm">
                {errors.TransactionMethod?.message ||
                  errors.TransactionMethod?.label.message}
              </div>
            )}
          </div>

          <div className="ltr:text-right rtl:text-left">
            <button className="btn btn-dark  text-center">Add</button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default AddTransaction;
