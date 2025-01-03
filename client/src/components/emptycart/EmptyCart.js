import React from 'react'
import { useNavigate } from 'react-router-dom'

const EmptyCart = () => {

    const navigate = useNavigate();
  return (
    <>
        <div className="container-fluid mt-100">
            <div className="row">
                <div className="col-md-12">
                    <div className="card">
                        <div className="card-body cart">
                            <div className="col-sm-12 empty-cart-cls text-center">
                                <img src='https://i.imgur.com/dCdflKN.png' width="130" height="130" className='img-fluid mb-4 mr-3' alt="" />
                                <h3><strong>Your Cart Is Empty</strong></h3>
                                <h4>Add Something To make me happy :)</h4>
                                <button className='btn btn-primary cart-btn-transform m-3'
                                onClick={()=>navigate("/products")}
                                >Continue Shopping</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default EmptyCart
