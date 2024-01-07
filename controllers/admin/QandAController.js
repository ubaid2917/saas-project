const QandA = require("../../models/admin/productQandAModel");
const Product = require("../../models/admin/productModel");

async function loadQandA(req, res) {
  try {
    const product = await Product.find({});

    if (!product) {
      res.status(200).send("product not found");
    }
    res.render("admin/createQandA.ejs", { product });
  } catch (error) {
    console.log(error.message);
  }
}

async function createQandA(req, res) {
  try {
    const user = req.body.user;
    const product = req.body.product;
    const question = req.body.question;

    const qanda = new QandA({
      user,
      product,
      question,
    });

    qanda.save();

    res.status(200).send("your question has been created");
  } catch (error) {
    console.log(error.message);
  }
}

async function showQandA(req, res) {
  try {
    const qanda = await QandA.find({}).populate("product", "name");

    if (!qanda) {
      res.status(200).send("qanda have no data");
    }

    res.render("admin/showQandA.ejs", { qanda });
  } catch (error) {
    console.log(error.message);
  }
}

async function replyQandA(req, res) {
  try {
    const product = await Product.find({});

    if (!product) {
      res.status(200).send("product not found");
    }
    const qandaid = req.params.id;

    const qanda = await QandA.findById(qandaid).populate("product", 'name');

    if (!qanda) {
      res.status(200).send("data  not found");
    }
    res.status(200).render("admin/replyqanda.ejs", { qanda, product });
  } catch (error) {
    console.log(error.message);
  }
}
 
async function makereplyQandA(req, res) {
    try {
        const qandaid = req.params.id;

        if (!qandaid) {
            res.status(200).send("QandA ID is not defined");
        }

        const user = req.body.user;
        const question = req.body.question;
        const answer = req.body.answer;
        const status = answer ? 'answered' : 'pending';

        const qanda = await QandA.findByIdAndUpdate(qandaid, {
            user,
            question,
            answer,
            status,
        });

        res.status(200).send("Reply has been submitted");
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal Server Error");
    }
}   


async function deleteQandA(req,res){
    try{
        const qandaId = req.params.id;

        if(!qandaId){
         res.status(200).send("paramtere id is not found");
        } 
        const qanda = await QandA.findByIdAndDelete(qandaId);

        if(!qanda){
            res.status(200).send("data is not found");
        }

        res.status(200).send("data successfully deleted");
    }catch(error){
        console.log(error.message);
    }
}

module.exports = {
  loadQandA,
  createQandA,
  showQandA,
  replyQandA,
  makereplyQandA, 
  deleteQandA,
};
