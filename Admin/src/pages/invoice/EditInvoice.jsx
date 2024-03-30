import React, { useState, useEffect } from "react";
import Select, { components } from "react-select";
import Modal from "@/components/ui/Modal";
import { useSelector, useDispatch } from "react-redux";
import Icon from "@/components/ui/Icon";
import Textarea from "@/components/ui/Textarea";
import Flatpickr from "react-flatpickr";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast } from "react-toastify";
import FormGroup from "@/components/ui/FormGroup";
import { toggleEditModal } from "../../store/features/invoice/invoiceSlice";

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

const EditInvoice = () => {
  const { editModal, editItem } = useSelector((state) => state.invoice);
  const dispatch = useDispatch();

  const FormValidationSchema = yup
    .object({
      name: yup.string().required("Title is required"),
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

  useEffect(() => {
    reset(editItem);
  }, [editItem]);

  const onSubmit = (data) => {
    // const {
    //   name,
    //   description,
    //   category,
    //   quantity,
    //   price,
    //   thumbnailImage,
    //   galleryImages,
    // } = data;
    // const formData = new FormData();
    // formData.append("name", name);
    // formData.append("description", description);
    // formData.append("category", category?.value);
    // formData.append("price", price);
    // formData.append("quantity", quantity);
    // formData.append("thumbnailImage", images ? images : thumbnailImage);
    // selectedFiles2
    //   ? selectedFiles2.forEach((file) => {
    //       formData.append("galleryImages", file);
    //     })
    //   : formData.append("galleryImages", JSON.stringify(galleryImages));
    // let data2 = {
    //   id: editItem?._id,
    //   formData: formData,
    // };
    // dispatch(editProducts(data2));
    // setTimeout(() => {
    //   dispatch(resetImageState());
    //   dispatch(getProducts());
    //   dispatch(toggleEditModal(false));
    //   reset();
    // }, 300);
  };

  return (
    <Modal
      title="Edit Invoice"
      activeModal={editModal}
      onClose={() => dispatch(toggleEditModal(false))}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 ">
        <FormGroup error={errors.name}>
          <input
            type="text"
            defaultValue={editItem.name}
            className="form-control py-2"
            {...register("name")}
          />
        </FormGroup>

        <FormGroup error={errors.price}>
          <input
            type="number"
            defaultValue={editItem.price}
            className="form-control py-2"
            {...register("price")}
          />
        </FormGroup>

        <Textarea
          name={"description"}
          register={register}
          label="Description"
          defaultValue={editItem?.description}
          placeholder="Description"
        />
        <FormGroup error={errors.quantity}>
          <input
            type="number"
            defaultValue={editItem.quantity}
            className="form-control py-2"
            {...register("quantity")}
          />
        </FormGroup>

        <div className="ltr:text-right rtl:text-left">
          <button className="btn btn-dark  text-center">Update</button>
        </div>
      </form>
    </Modal>
  );
};

export default EditInvoice;
