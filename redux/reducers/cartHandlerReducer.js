module.exports = (state = {
  count: 0,
  cartItems: [],
  selectedItem: {}
}, action) => {
  switch (action.type) {
    case "handleCart":
      return {
        selectedItem:state.selectedItem,
        count: state.count + 1,
        cartItems: [...state.cartItems,action.payload]
      }
      break;
    case "removeItem":
      return {
        selectedItem:state.selectedItem,
        count: state.count - 1,
        cartItems: state.cartItems.filter((item, i) => {
          if (i !== action.index)
            return item
        })
      }
      break;
    case "increament":
    console.log(action.index);
      return {
        selectedItem:state.selectedItem,
        count: state.count,
        cartItems: state.cartItems.map((item, i) => {

          if (i === action.index) {
            if (parseInt(item.productQuantity + 1) <= parseInt(item.totalProductQuantity)) {
              item.purchasedCost = parseInt(item.purchasedCost) + parseInt(item.offerPrice);
              item.productQuantity = parseInt(item.productQuantity) + 1;
              return item
            }
            return item
          }
          return item
        })
      }
      break;
    case "decreament":
      return {
        selectedItem:state.selectedItem,
        count: state.count,
        cartItems: state.cartItems.map((item, i) => {

          if (i === action.index) {
            if (parseInt(item.productQuantity - 1) >= 1) {
              item.purchasedCost = parseInt(item.purchasedCost) - parseInt(item.offerPrice);
              item.productQuantity = parseInt(item.productQuantity) - 1;
              return item
            }
            return item
          }
          return item
        })
      }
      break;
    case "selectedProduct":
      return {count: state.count, cartItems: state.cartItems, selectedItem: action.payload}
      break;
  }
  return state
}
