const add = (cart, req) => {
  cart.contents.push(req.body);
  return JSON.stringify(cart, null, 4);
};
const change = (cart, req) => {
  const find = cart.contents.find(el => el.id_product === +req.params.id);
  find.quantity += req.body.quantity;
  return JSON.stringify(cart, null, 4);
};
const del = (cart, req) => {
  //Как отлаживать так и не понял
  debugger
  cart.contents.splice((req.body), 1);
  return JSON.stringify(cart, null, 4);
};

module.exports = {
  add,
  change,
  del
};
