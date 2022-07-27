import PaymentModalForm from "../components/Modal/PaymentModalForm";
import { initState } from "../core/store";

export const isOpenModalState = initState({
  key: "isOpenModalState",
  defaultValue: {
    isOpen: false,
    data: null,
    component: PaymentModalForm,
  },
});
