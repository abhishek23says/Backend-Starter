/* eslint-disable max-len */
const router = require('express').Router(); 
const { errorWrapper } = require('../../utils/commonFunctions'); 

const {
  insertPermission, 
  retrievePermission, 
  retrievePermissionById, 
  modifyPermission, 
  removePermission, 
} = require('../controllers/permission'); 
const checkAuth = require("../middlewares/checkAuth"); 
const {validate} = require("../middlewares/validator");
const permission = require("../middlewares/checkPermission");
const  { addPermissionValidation, updatePermissionValidation } = require("../validators/permission");
const { permissionIdValidation } = require('../validators/commonValidators');
const { validation_types_enums } = require('../../utils/enums');

// create
router.post('/',checkAuth, validate({schema: addPermissionValidation }), errorWrapper(insertPermission)); 

// read
router.get('/', checkAuth, permission, errorWrapper(retrievePermission)); 
router.get('/:permissionId',checkAuth, permission, validate({schema: permissionIdValidation , type: validation_types_enums.params}),  errorWrapper(retrievePermissionById)); 

// update
router.put( "/:permissionId", checkAuth, permission, validate({ schema: updatePermissionValidation, type: validation_types_enums.params_body, }), errorWrapper(modifyPermission)); 

// delete
router.delete('/:permissionId', checkAuth, permission, validate({schema: permissionIdValidation , type: validation_types_enums.params}), errorWrapper(removePermission)); 

module.exports = router; 