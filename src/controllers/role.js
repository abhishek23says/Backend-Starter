const {
  createRole,
  fetchRoleDetails,
  fetchRoleById,
  updateRoleById,
  deleteRoleById,
} = require('../services/role'); 
const response = require('../../utils/response'); 

exports.insertRole = async(req, res) => { 
  const result = await createRole(req.body); 
  return response.created(res, result); 
}; 

exports.retrieveRole = async(req, res) => { 
  const result = await fetchRoleDetails(req.query); 
  return response.ok(res, result); 
}; 

exports.retrieveRoleById = async(req, res) => { 
  const result = await fetchRoleById(req.params); 
  return response.ok(res, result); 
}; 

exports.modifyRole = async(req, res) => { 
  const result = await updateRoleById({...req.params, ...req.body}); 
  return response.ok(res, result); 
}; 

exports.removeRole = async(req, res) => { 
  const result = await deleteRoleById(req.params); 
  return response.ok(res, result); 
}; 
