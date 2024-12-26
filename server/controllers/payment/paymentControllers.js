const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);


// payment controller
exports.processpayment = async(req,res)=>{
    const {totalamount} = req.body;

    try{
        const myPayment = await stripe.paymentIntents.create({
            amount:totalamount,
            currency:"inr",
            description:"ecommerce_description",
            metadata:{
                company:"EcommerceProject"
            }
        });
        console.log(myPayment);
        res.status(200).json(myPayment.client_secret);
    } catch (error){
        res.status(400).json(error);
    }
}