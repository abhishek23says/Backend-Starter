 
/* eslint-disable max-len */
const { handleSuccess, getPagination } = require("../../utils/commonFunctions"); 
const { Op } = require('sequelize');
const models = require('../models');
const { ErrorMessage, SuccessMesage } = require('../../utils/responseMessages');
const {
  throwIfBadRequestError,
  throwIfNoDataFoundError,
  throwIfInternalServerError,
} = require("../../utils/customError");
const { create, findAll, findByPk, update, destroy } = require("../../utils/dbOperations");

exports.createPermission = async(permissionData) => { 
  const addedPermission = await create({ model: models.permission, body: permissionData });
  throwIfInternalServerError({condition: !addedPermission , message: ErrorMessage.SERVER_ERROR()});
  
  return handleSuccess({message: SuccessMesage.CREATED("Permission"),data:addedPermission}); 
}; 

exports.fetchPermissionDetails = async ({ page = 1, limit = 10, search }) => {

  const permissionRecords = await findAll({
    model: models.permission,
    condition: search
      ? {
          [Op.or]: [
            { actionName: { [Op.iLike]: `%${search}%` } },
            { description: { [Op.iLike]: `%${search}%` } },
            { method: { [Op.iLike]: `%${search}%` } },
          ],
        }
      : {},
    attributes: [ "id", "actionName", "description", "baseUrl", "path", "method", "createdAt", "updatedAt" ],
    ...getPagination({ page, limit }),
  });
  throwIfNoDataFoundError({ condition: permissionRecords.count, message: ErrorMessage.NOT_FOUND("Permission Records") });

  return handleSuccess({ message: SuccessMesage.FETCHED("Permission"), data: permissionRecords });
}; 

exports.fetchPermissionById = async ({ permissionId }) => {
  const permissionRecord = await findByPk({ model: models.permission, id:permissionId });
  throwIfBadRequestError({ condition: !permissionRecord, message: ErrorMessage.INVALID("Permission Id") });
  return handleSuccess({message: SuccessMesage.FETCHED("Permission"), data: permissionRecord});
}; 

exports.updatePermissionById = async({ permissionId, updateData }) => { 
  const updatedRecord = await update({model: models.permission, condition: { id:permissionId }, updatedBody: updateData , individualHooks: true});
  throwIfInternalServerError({condition: !updatedRecord[0] , message: ErrorMessage.INVALID()});

  return handleSuccess({message: SuccessMesage.UPDATED("Permission")}); 
}; 

exports.deletePermissionById = async({permissionId}) => { 
  const removedPermission = await destroy({model: models.permission, condition: { id:permissionId }});  
  throwIfBadRequestError({condition: !removedPermission , message: ErrorMessage.INVALID("Permission Id") });
  return handleSuccess({message: SuccessMesage.DELETED("Permission")}); 
}; 
