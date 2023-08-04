const adminModel = require('./adminModel');

module.exports.getDataFromDBService = () => {
     return adminModel.find({})
          .exec()
          .then((result) => {
               return { data: result };
          })
          .catch((error) => {
               throw error;
          });
};


module.exports.createAdminDBServer = async (adminDetails) => {
     try {
          const adminModelData = new adminModel(adminDetails);
          await adminModelData.save();
          return true;
     } catch (error) {
          return false;
     }
};

module.exports.updateOneAdminDBService = (id, adminDetails) => {
     console.log(adminDetails);
     return adminModel.findByIdAndUpdate(id, adminDetails)
          .then((result) => {
               return result;
          })
          .catch((error) => {
               throw error;
          });
};

module.exports.removeOneAdminDBService = (id) => {
     return adminModel.findOneAndDelete(id)
       .then((result) => {
         return result;
       })
       .catch((error) => {
         throw error;
       });
   };
   