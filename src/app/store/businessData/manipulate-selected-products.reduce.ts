export function addSelectedProductToOrderEditor(state, payload) {
  const newProduct = {
    ...state.products.find((product) => product.id === payload.productId),
  };

  const updatedEditorProducts = [...state.orderEditorProducts, newProduct];
  return {
    ...state,
    orderEditorProducts: updatedEditorProducts,
  };
}

export function removeSelectedProductFromEditor(state, payload) {
  const updatedRemovedProducts = [...state.orderEditorProducts];
  for (let i = 0; i < updatedRemovedProducts.length; i++) {
    if (updatedRemovedProducts[i].id == payload.productId) {
      updatedRemovedProducts.splice(i, 1);
      break;
    }
  }

  return {
    ...state,
    orderEditorProducts: updatedRemovedProducts,
  };
}
