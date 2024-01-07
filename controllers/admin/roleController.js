const Role = require("../../models/roleModel");

async function createRole(req, res) {
  try {
    const name = req.body.name;
    const role = req.body.role;

    const checkName = await Role.findOne({ name });

    if (checkName) {
      res.status(200).send(" Role name is already created ");
      return;
    }
    const roleData = new Role({
      name,
      role,
    });

    await roleData.save();

    if (!roleData) {
      res.status(200).send(" Role name is already created ");
      return;
    }
    res.status(200).send("Role created successfully");
  } catch (error) {
    console.log(error.message);
  }
}

async function editRole(req, res) {
  try {
    const roleId = req.params.id;
    if (!roleId) {
      res.status(200).send("Role not found");
      return;
    }
    const roleData = await Role.findById(roleId);

    if (!roleData) {
      res.status(200).send("Role not found");
    }
    res.status(200).send(roleData);
  } catch (error) {
    console.log(error.message);
  }
}
async function updateRole(req, res) {
  try {
    const roleId = req.params.id;

    if (!roleId) {
      res.status(200).send(error.message);
      return;
    }

    const name = req.body.name;
    const role = req.body.role;

    const roleData = await Role.findByIdAndUpdate(roleId, {
      name,
      role,
    });   

    res.status(200).send("Role updated successfully")
  } catch (error) {
    console.log(error.message);
  }
}   

async function deleteRole(req,res){
    try {
         const roleId = req.params.id; 
         if(!roleId){
            res.status(200).send("Role not found");
            return; 
         }   

         const roleData =  await Role.findByIdAndDelete(roleId); 
        
         if(!roleData){
            res.status(200).send("Role not found");
            return;   
         }  

         res.status(200).send("Role deleted")
    } catch (error) {
       console.log(error.message); 
    }
}

module.exports = {
  createRole,
  editRole,
  updateRole,
  deleteRole,
};
