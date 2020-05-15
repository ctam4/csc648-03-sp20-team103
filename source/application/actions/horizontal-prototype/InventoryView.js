export const setInventoryID = (inventoryID) => ({
  type: 'INVENTORYVIEW_SET_INVENTORYID',
  inventoryID: inventoryID,
});

export const setName = (name) => ({
  type: 'INVENTORYVIEW_SET_NAME',
  name: name,
});

export const setImage = (image) => ({
  type: 'INVENTORYVIEW_SET_IMAGE',
  image: image,
});

export const setQuantity = (quantity) => ({
  type: 'INVENTORYVIEW_SET_QUANTITY',
  quantity: quantity,
});

export const setUnit = (unit) => ({
  type: 'INVENTORYVIEW_SET_UNIT',
  unit: unit,
});

export const setPrice = (price) => ({
  type: 'INVENTORYVIEW_SET_PRICE',
  price: price,
});

export const setExpirationDate = (expirationDate) => ({
  type: 'INVENTORYVIEW_SET_EXPIRATIONDATE',
  expirationDate: expirationDate,
});
