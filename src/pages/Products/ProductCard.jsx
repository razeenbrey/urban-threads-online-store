function ProductCard( {product, onProductClick} ){
    return(
        <div className="card product-card" style={{width: "18rem"}} onClick={onProductClick}>
            <img src={product.imageURL} className="card-img-top" alt="..."/>
            <div className="card-body">
                <h5 className="card-title">{product.name}</h5>
                <p className="card-text">{product.price}</p>
                <a href="#" className="btn btn-primary">Buy</a>

            </div>
        </div>
    )
}

export default ProductCard;