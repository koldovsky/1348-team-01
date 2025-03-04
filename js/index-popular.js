import {renderProducts} from "./render-products.js"

const response = await fetch('api/products.json');
const products = await response.json();
renderProducts(products, ".products__list", 10);