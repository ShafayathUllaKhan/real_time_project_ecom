import React, { useEffect, useState } from 'react'
import Select from 'react-select'
import Form from 'react-bootstrap/Form';
import {useDispatch, useSelector} from 'react-redux'
import { AddProductsslice, getCategory } from '../../redux/slice/productSlice/ProductSlice';
import toast from 'react-hot-toast';

const AddProducts = () => {

    const dispatch = useDispatch();

    const {CategoryData} = useSelector((state)=>state.Product);

    const [inpvalue,setInpvalue] = useState({
        productname:"",
        price:"",
        discount:"",
        quantity:"",
        description:""
    })

    const [productimg,setProductImg] = useState("");
    const [categoryId,setCategoryId] = useState("");

    const [categorystate,setCategoryState] = useState([]);

    const handleChange = (e)=>{
        const {name,value} = e.target;
        setInpvalue({...inpvalue,[name]:value})
    }

    const handlesetCategory = (e)=>{
        const {value} = e;
        setCategoryId(value);
    }

    const handleProductImg = (e)=>{
        setProductImg(e.target.files[0]);
    }

    const handleSubmit = (e)=>{
        e.preventDefault();

        const { productname,price,discount,quantity,description} = inpvalue;

        if(productname == ""){
            toast.error("productname is required!")
        }else if(price == ""){
            toast.error("price is required!")
        }else if(discount == ""){
            toast.error("discount is required!")
        }else if(productimg == ""){
            toast.error("productimg is required!")
        }else if(categoryId == ""){
            toast.error("categoryId is required!")
        }else if(quantity == ""){
            toast.error("quantity is required!")
        }else if(description == ""){
            toast.error("description is required!")
        }else{
            const data = new FormData();
            data.append("productname",productname);
            data.append("productimage",productimg);
            data.append("price",price);
            data.append("discount",discount);
            data.append("quantity",quantity);
            data.append("description",description);

            const config = {
                "Content-Type":"multipart/form-data"
            }

            const datasend = {
                data,
                categoryId,
                config
            }

            dispatch(AddProductsslice(datasend)).then((res)=>{
                if(res.payload){
                    setInpvalue({...inpvalue, productname:"",price:"",discount:"",quantity:"",description:""});
                    setCategoryId("");
                    setProductImg("");
                }
            }).catch((error)=>{
                console.log("error",error)
            })
        }
    }

    useEffect(()=>{
        dispatch(getCategory())
    },[])

    useEffect(()=>{
        let arr = [];

        for(let i=0;i<CategoryData.length;i++){
            let setcategoryvalue = {value:CategoryData[i]._id,label:CategoryData[i].categoryname};
            arr.push(setcategoryvalue)
        }

        setCategoryState(arr)
    },[CategoryData])

    return (
        <>
            <div className="container">
                <section>
                    <div className="form_data">
                        <div className="form_heading">
                            <h1>Add Products</h1>
                        </div>

                        <form>
                            <div className="form_input">
                                <input type='text' value={inpvalue.productname} onChange={handleChange} name="productname" placeholder='Product Name' id="" />
                            </div>

                            <div className="form_input">
                                <Select options={categorystate} onChange={handlesetCategory} placeholder="Product Category"/>
                            </div>

                            <div className="form_input">
                                <input type='text' value={inpvalue.price} onChange={handleChange} name="price" placeholder='Price' id="" />
                            </div>

                            <div className="form_input">
                                <input type='test' value={inpvalue.discount} onChange={handleChange} name="discount" placeholder='Discount' id="" />
                            </div>

                            <div className="form_input">
                                <input type='file' onChange={handleProductImg} name="productimage" id="" />
                            </div>

                            <div className="form_input">
                                <input type='test' value={inpvalue.quantity} onChange={handleChange} name="quantity" placeholder='Quantity' id="" />
                            </div>

                            <Form.Group className="mb-3 mt-2" controlId="exampleForm.ControlTextarea1">
                                <Form.Control as="textarea" value={inpvalue.description} onChange={handleChange} name='description' placeholder='product description' rows={3} />
                            </Form.Group>

                            <button className='btn' onClick={handleSubmit} >Submit</button>

                        </form>
                    </div>
                </section>
            </div>
        </>
    )
}

export default AddProducts
