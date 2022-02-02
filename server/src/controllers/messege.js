const {messege,user} = require('../../models')

exports.addMessege = async (req,res)=>{
    try{

        const data = req.body
        const {id} = req.params

        await messege.create({
            messege: data.messege,
            idRecived: id
        })

        res.send({
            status: "success",
            messege: await messege.findAll({
                attributes:{
                    exclude:["idUser","idRecived","createdAt","updatedAt"]
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