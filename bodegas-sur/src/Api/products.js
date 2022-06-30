

export const getAllproducts =() =>{

    return fetch('https://pg-delsur.herokuapp.com/products',{
        method:'GET',
        headers:{
            Accept:'application/json',
            'Content-Type':'application/json',
        },
    }).then((resp)=>{
        const data = resp.json()
        return data
    }).catch((err)=>{
        let error ={ data: { status: "ERROR", message: err.toString() }}
        return error.data
    })

} 