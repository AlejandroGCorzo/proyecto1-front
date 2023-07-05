import { addProduct, removeProduct } from "./wishListSlice"

export const addProductToWishlist = (product)=>{
    return function (dispatch){
        dispatch(addProduct(product))
    }
}
export const removeProductFromWishlist = (productId)=>{
    return function (dispatch){
        dispatch(removeProduct(productId))
    }
}
export const clearWishlist = ()=>{
    return function (dispatch){
        dispatch(clearWishlist())
    }
}