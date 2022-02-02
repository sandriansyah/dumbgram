const {message,user} = require('../../models')

exports.addMessage = async (req,res)=>{
    try{

        const data = req.body
        const {id} = req.params

        await message.create({
            message: data.message,
            idRecived: id
        })
        console.log(data)
        res.send({
            status: "success",
            message: await message.findAll({
                attributes:{
                    exclude:["idSender","idRecived","createdAt","updatedAt"]
                },
                include:{
                    model:user,
                    as:"recived",
                    attributes:{
                        exclude:["email","password","bio","createdAt","updatedAt"]
                    }
                }
            })
        })


    }catch(error){

        console.log(error)
        res.send({
            status:"error"
        })

    }
}