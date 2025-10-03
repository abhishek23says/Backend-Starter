const { 
  createPermission, 
  fetchPermissionDetails, 
  fetchPermissionById, 
  updatePermissionById, 
  deletePermissionById, 
} = require('../services/permission'); 
const response = require('../../utils/response'); 

exports.insertPermission = async(req, res) => { 
  const result = await createPermission(req.body); 
  return response.created(res, result); 
}; 

exports.retrievePermission = async(req, res) => { 
  const result = await fetchPermissionDetails(req.query); 
  return response.ok(res, result); 
}; 

exports.retrievePermissionById = async(req, res) => { 
const result = await fetchPermissionById(req.params); 
  return response.ok(res, result); 
}; 

exports.modifyPermission = async(req, res) => { 

  const result = await updatePermissionById({...req.params, updateData:req.body}); 
  return response.ok(res, result); 
}; 

exports.removePermission = async(req, res) => { 
  const result = await deletePermissionById(req.params); 
  return response.ok(res, result); 
}; 
