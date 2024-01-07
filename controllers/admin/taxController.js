const Tax = require('../../models/admin/taxModel');


async function createTax(req,res){
    try {
        
        const name = req.body.name;
        const type = req.body.type;
        const amount = req.body.amount;
        const status = req.body.status;

        const checkName = await Tax.findOne({ name });
        
        if(checkName){
            res.status(200).send("Tax Already Exist");
            return;
        } 

        const taxData = new Tax({
            name,
            type,
            amount,
            status,
        })

        await taxData.save();

        res.status(200).send("Successfully created tax");
    } catch (error) {
        console.log(error.message);
    }
}

module.exports = {
    createTax,
}