import React from 'react'

const CardsComponent = (props) => {
const{item} = props
  return (
    <div className="card">
    <div className="content">
        {/* <p className="card-result-number">Result # {resultNumber+1}</p> */}
        <img src={item.image} alt="no hay imagen" width='200px' height='250px'/>
        <h3>{item.name}</h3>
        <p>{item.value}</p>
        <p>{item.measure}</p>
        <p>{item.stock}</p>
    </div>
</div>
  )
}

export default CardsComponent