import {renderProducts, getCachedProducts} from "./render-products.js"

let size = 10;
renderProducts(".products__list", size);

const products = getCachedProducts(size);