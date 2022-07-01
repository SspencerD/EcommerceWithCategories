import React from 'react'
import '../Css/CardsStyles.css'

const CardsComponent = (props) => {
const{item} = props

  return (
    <div className="card">
  <figure>
    <img src={item.image} alt="imagen"/>
  </figure>
  <section className="details">
    <div className="product-name">
      <h1>
      <p>{item.name}</p></h1>
      <h1 className="price">$ {item.cost}</h1>
    </div>

    <div className="options">
      <div className='product_description'>
        <h1>formato</h1>
        <p>{item.capacity}ml</p>
      </div>

      <div  className="product_description">
        <h1>Stock</h1>
        <p>{item.stock} unidades</p>
      </div>
    </div>
    <a href="#" className="btn">ver detalles</a>
  </section>
</div>
   
//     <div className="card">
//     <div className="content">
//         {/* <p className="card-result-number">Result # {resultNumber+1}</p> */}
//         <img src={item.image} alt="no hay imagen" width='200px' height='250px'/>
//         <h3>{item.name}</h3>
//         <p>{item.value}</p>
//         <p>{item.measure}</p>
//         <p>{item.stock}</p>
//     </div>
// </div>
  )
}

export default CardsComponent