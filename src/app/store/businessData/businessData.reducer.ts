import { Ingredient } from "./../../models/ingredient.model";
import { Product } from "./../../models/product.model";
import * as BusinessDataActions from "./businessData.actions";
import {
  addSelectedProductToOrderEditor,
  removeSelectedProductFromEditor,
} from "./manipulate-selected-products.reduce";
import { prepareBusinessData } from "./prepare-businessData-reduce";

export interface State {
  products: Product[];
  ingredients: Ingredient[];
  orderEditorProducts: Product[];
  isEditMode: boolean;
  editOrderId: number;
}

const initialState: State = {
  products: [],
  ingredients: [],
  orderEditorProducts: [],
  isEditMode: false,
  editOrderId: -1,
};

export function businessDataReducer(
  state = initialState,
  action: BusinessDataActions.BusinessDataActions
) {
  switch (action.type) {
    case BusinessDataActions.PREPARE_SIMULATION:
      return prepareBusinessData(state, action.payload);

    case BusinessDataActions.START_CREATE_ORDER:
      return { ...state, isEditMode: false, orderEditorProducts: [] };

    case BusinessDataActions.START_EDIT_ORDER:
      return {
        ...state,
        isEditMode: true,
        editOrderId: action.payload.editOrderId,
        orderEditorProducts: [...action.payload.orderProducts],
      };

    case BusinessDataActions.ADD_SELECTED_PRODUCT_TO_ORDER_EDITOR:
      return addSelectedProductToOrderEditor(state, action.payload);

    case BusinessDataActions.REMOVE_SELECTED_PRODUCT_FROM_ORDER_EDITOR:
      return removeSelectedProductFromEditor(state, action.payload);

    default: {
      return state;
    }
  }
}
