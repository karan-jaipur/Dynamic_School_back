
const {Schema,default:mongoose}=require('mongoose')


const practiceSchema=new Schema({
    name:{
        type:String
    },
    price:{
        type:Number
    }

})

const b= mongoose.model('practice',practiceSchema)

module.exports=b;