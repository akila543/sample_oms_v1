import {combineReducers} from 'redux';
import dealsProductData from './dealsProductDataReducer.js';
import electronicsProductData from './electronicsProductDataReducer.js';
import fashionProductData  from './fashionProductDataReducer.js';
import applianceProductData  from './applianceProductDataReducer.js';
import cartData from './cartHandlerReducer.js';

const allReducers = combineReducers({
  dealsProductData:dealsProductData,
  electronicsProductData:electronicsProductData,
  fashionProductData:fashionProductData,
  applianceProductData:applianceProductData,
  cartData:cartData
});

export default allReducers
