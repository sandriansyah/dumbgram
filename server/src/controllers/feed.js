const {feed,user,like,comment} = require('../../models')

exports.createFeed = async(req,res)=>{
    try{

        const data = req.body 

        await feed.create(data)

        res.send({
            status:"success",
            data: data,
        })

    }catch(error){
        console.log(error)
        res.send({
            status:'filed',
            message:'server error'
        })
    }
}

exports.getfeeds = async (req,res)=>{

    try{
  
        const dataFeed = await feed.findAll({
            attributes:{
                exclude:["createdAt","updatedAt"]
            },
            include:{
                model:user,
                as:"user",
                attributes:{
                    exclude:["email","password","bio","createdAt","updatedAt"]
                }
            }
        })

        res.send({
            status:"success",
            feeds: dataFeed,
        })
    }catch(error){

        console.log(error)
        res.send({
            status:"error",
        })
    }
}

exports.addLike = async (req,res) =>{
    try{

        const data = req.body

        await like.create(data)
        res.send({
            status:"success",
            data: {
                feed: data,
            }
        })

    }catch(error){
        console.log(error)
        res.send({
            status:"error"
        })
    }
}

exports.addComment = async (req,res)=>{
    try{

    const data = req.body
    await comment.create(data)
    console.log(data)
    res.send({
        status:"success",
        data: data,
    })

    }catch(error){
        console.log(error)
        res.send({
            status:"error",
        })
    }
} 

exports.getComments = async (req,res)=>{
    try{
        const {id} = req.params 
        const data = await comment.findAll({
            where:{
                idFeed : id,
            } 
        })
        res.send({
            status:"success",
            data: data
        })

    }catch(error){
        console.log(error)
        res.send({
            statsus:"error"
        })

    }
}