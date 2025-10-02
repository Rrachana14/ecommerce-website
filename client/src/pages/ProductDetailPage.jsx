import React, { useEffect, useState } from "react";
import Nav from "../components/Nav";
import ProductDetail from "../components/ProductDetail";
import { useParams } from "react-router-dom";

const ProductDetailPage = ()=>{
    const { productId } = useParams();
    return(
        <div>
            <Nav/>
            <ProductDetail  productId = {productId}/>
        </div>
    )
}

export default ProductDetailPage;