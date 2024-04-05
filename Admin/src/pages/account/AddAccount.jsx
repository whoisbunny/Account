import React, { useEffect, useState } from "react";
import Select from "react-select";
import Modal from "@/components/ui/Modal";
import { useSelector, useDispatch } from "react-redux";
import Textinput from "@/components/ui/Textinput";
import Textarea from "@/components/ui/Textarea";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import Fileinput from "../../components/ui/Fileinput";
import {
  addAccount,
  getAccounts,
  toggleAddModal,
} from "../../store/features/account/accountSlice";

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
const options = [
  {
    value: "Creditor",
    label: "Creditor",
  },

  {
    value: "Debtor",
    label: "Debtor",
  },
  {
    value: "Bank",
    label: "Bank",
  },
  {
    value: "General",
    label: "General",
  },
  {
    value: "Cash",
    label: "Cash",
  },
];
const AddAccount = () => {
  const { openAccountModal } = useSelector((state) => state.account);
  const dispatch = useDispatch();

  const FormValidationSchema = yup
    .object({
      name: yup.string().required("Name is required"),
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
    // data.type = data.type.value;
    data.type = "Creditor";

    dispatch(addAccount(data));
    setTimeout(() => {
      dispatch(getAccounts());
      reset();
      dispatch(toggleAddModal(false));
    }, 300);
  };

  return (
    <div>
      <Modal
        title="Add Account"
        labelclassName="btn-outline-dark"
        activeModal={openAccountModal}
        onClose={() => dispatch(toggleAddModal(false))}
      >
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 ">
          <Textinput
            name="name"
            label="Account Holder Name"
            placeholder=" Name"
            register={register}
            error={errors.name}
          />

          <Textinput
            type="tel"
            name="phoneNumber"
            label="Phone Number"
            placeholder="Phone Number"
            register={register}
            error={errors.phoneNumber}
          />
          <Textinput
            type="text"
            name="gst"
            label="GST Number"
            placeholder="GST Number"
            register={register}
            error={errors.gst}
          />
          <Textarea
            name={"address"}
            label="Address"
            placeholder="Address"
            register={register}
            error={errors.address}
          />
          {/* <div className={errors.type ? "has-error" : ""}>
            <label className="form-label" htmlFor="icon_s">
              Account Type
            </label>
            <Controller
              name="type"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  options={options}
                  styles={styles}
                  className="react-select"
                  classNamePrefix="select"
                  id="icon_s"
                />
              )}
            />
            {errors.type && (
              <div className=" mt-2  text-danger-500 block text-sm">
                {errors.type?.message || errors.type?.label.message}
              </div>
            )}
          </div> */}

          <div className="ltr:text-right rtl:text-left">
            <button className="btn btn-dark  text-center">Add</button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default AddAccount;
