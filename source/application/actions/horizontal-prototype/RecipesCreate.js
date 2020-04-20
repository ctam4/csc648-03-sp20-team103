export const setName = (name) => ({
  type: 'RECIPESCREATE_SET_NAME',
  name: name,
});

export const setServingSize = (serving_size) => ({
  type: 'RECIPESCREATE_SET_SERVING_SIZE',
  serving_size: serving_size,
});

export const setCookingTime = (cooking_time) => ({
  type: 'RECIPESCREATE_SET_COOKING_TIME',
  cooking_time: cooking_time,
});
