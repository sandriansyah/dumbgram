const {user} = require('../../models')

const joi = require('joi')
const bcrypt =require('bcrypt')
const jwt = require('jsonwebtoken')

exports.register = async (req,res)=>{

        const data = req.body 

        const schema = joi.object({
        email: joi.string().email().min(4).required(),
        username: joi.string().min(4).required(),
        password: joi.string().min(4).required(),
        fullname: joi.string().min(4).required(),
        image: joi.string().min(4).required(),
        bio: joi.string().min(4).required(),
    })

    const { error } = schema.validate(data)

    if(error){
        console.log(error)
        return res.status(400).send({
            error:error
        })
    }
    try{

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(data.password,salt)

    await user.create({
        email: data.email,
        username: data.username,
        password: hashedPassword,
        fullname: data.fullname,
        image: data.image,
        bio: data.bio,
    })

    
    res.status(200).send({
        status: "success"
    })

    }catch(error){
        console.log(error)
        res.send({
            status:"error"
        })
    }   
}

exports.login = async (req,res)=>{

        const data = req.body 

        const schema = joi.object({
        email: joi.string().email().min(4).required(),
        password: joi.string().min(4).required(),
    })

    const { error } = schema.validate(data)

    if(error){
        return res.status(400).send({
            error:error.details[0].message
        })
    }
    try{

    const existData = await user.findOne({
        where:{
            email:data.email,
        },
        attributes:{
            exclude:['fullname','createdAt','updatedAt']
        }
    })

    if(!data.email){
        return res.send({
            status:'failed',
            message : "email and password not match"
        })
    }

    const isValid = await bcrypt.compare(data.password,existData.password)

    if(isValid==false){
        return res.send({
            status:"failed",
            message:"email and password not match"
        })
    }

    const SECRET_KEY = 'this is secret key'
    const dataToken ={
        id: existData.id,
        username: existData.username,
        email: existData.email,
    }

    const token = jwt.sign(dataToken,SECRET_KEY)

    res.status(200).send({
        status: "success",
        data:{
            username: existData.username,
            email: existData.email,
            token,
        }
    })

    }catch(error){
        console.log(error)
        res.send({
            status:"error"
        })
    }   
}