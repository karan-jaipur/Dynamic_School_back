const product=require('../model/practiceSchema')

const allpractice=async(req,res)=>{
    const practice=await product.find()
    if(!practice || practice.lenght==0){
        res.status(200).json({
            success:true,
        })
       
    }
    {
        res.status(500).json({
            success:false,
            practice:practice
        })
    }
}

module.exports=allpractice