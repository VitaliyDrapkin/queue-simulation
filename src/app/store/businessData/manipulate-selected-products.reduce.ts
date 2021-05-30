export function addSelectedProductToOrderEditor(state, payload) {
  let isOrderExist = false;
  const updatedEditOrderProducts = [...state.editOrderProducts].map(
    (product) => {
      if (product.product.id === payload.productId) {
        isOrderExist = true;
        return { ...product, count: product.count + 1 };
      }
      return product;
    }
  );
  if (!isOrderExist) {
    const newProduct = {
      ...state.products.find((product) => product.id === payload.productId),
    };
    updatedEditOrderProducts.push({ count: 1, product: newProduct });
  }
  return {
    ...state,
    editOrderProducts: updatedEditOrderProducts,
  };
}

export function removeSelectedProductFromEditor(state, payload) {
  const updatedEditOrderProducts = [...state.editOrderProducts]
    .map((product) => {
      if (product.product.id === payload.productId) {
        return { ...product, count: product.count - 1 };
      }
      return product;
    })
    .filter((product) => product.count);

  return {
    ...state,
    editOrderProducts: updatedEditOrderProducts,
  };
}
