const{followers,user} = require('../../models')

exports.addFollowers = async (req,res) =>{
    try{

        const {id} = req.params 
        const {idFollowers} = req.body 

        console.log(id)
        console.log(idFollowers)

        await followers.create({
            idUser : id,
            idFollowers : idFollowers,
        })

        res.send({
            status:"success",
        })


    }catch(error){
        console.log(error)
        res.send({
            statsus:"error",
        })
    }
}