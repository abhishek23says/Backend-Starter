/* eslint-disable max-len */
const { handleSuccess, getPagination } = require("../../utils/commonFunctions");
const models = require("../models");
const {
  InternalServerError,
  BadRequestError,
  throwIfDataFoundError,
  throwIfNoDataFoundError,
  throwIfInternalServerError,
  throwIfBadRequestError,
} = require("../../utils/customError");
const { ErrorMessage, SuccessMesage } = require("../../utils/responseMessages");
const {
  findOne,
  create,
  findAll,
  findByPk,
  update,
  destroy,
} = require("../../utils/dbOperations");

const message = "Email Template";

// ✅ Add new template
exports.addEmailTemplate = async ({ userId, subject, html, name }) => {
  const templateRecord = await findOne({
    model: models.emailTemplate,
    condition: { name },
  });

  throwIfDataFoundError({
    condition: templateRecord,
    message: ErrorMessage.ALREADY_EXISTS("Name"),
  });

  const templateAdded = await create({
    model: models.emailTemplate,
    body: { subject, createdBy: userId, updatedBy: userId, html, name },
  });

  throwIfInternalServerError({
    condition: !templateAdded,
    message: ErrorMessage.SERVER_ERROR(),
  });

  return handleSuccess({ message: SuccessMesage.CREATED(message) });
};

// ✅ List all templates with pagination
exports.listEmailTemplates = async ({ page = 1, limit = 10 }) => {
  const templateRecords = await findAll({
    model: models.emailTemplate,
    ...getPagination({ page, limit }),
  }); 
 console.log(templateRecords)
  throwIfNoDataFoundError({
    condition: templateRecords || templateRecords.length === 0,
    message: ErrorMessage.NOT_FOUND("Email Templates"),
  });

  return handleSuccess({
    message: SuccessMesage.FETCHED(message),
    data: templateRecords,
  });
};

// ✅ Get template by ID
exports.getTemplateById = async ({ emailTemplateId}) => {
  const templateRecord = await findByPk({
    model: models.emailTemplate,
    id:emailTemplateId,
  });

  throwIfBadRequestError({
    condition: !templateRecord,
    message: ErrorMessage.INVALID("Email Template Id"),
  });

  return handleSuccess({
    message: SuccessMesage.FETCHED(message),
    data: templateRecord,
  });
};

// ✅ Get template by Name
exports.getTemplateByName = async ({ emailTemplateName }) => {
  const templateRecord = await findOne({
    model: models.emailTemplate,
    condition: { name:emailTemplateName },
  });

  throwIfBadRequestError({
    condition: !templateRecord,
    message: ErrorMessage.INVALID("Email Template Name"),
  });

  return handleSuccess({
    message: SuccessMesage.FETCHED(message),
    data: templateRecord,
  });
};

// ✅ Update template by ID
exports.updateTemplateById = async ({ emailTemplateId, updateBody }) => {
  const updatedRecord = await update({
    model: models.emailTemplate,
    condition: { id:emailTemplateId},
    updatedBody: updateBody,
    individualHooks: true,
  });

  throwIfInternalServerError({
    condition: !updatedRecord[0],
    message: ErrorMessage.INVALID(),
  });

  return handleSuccess({ message: SuccessMesage.UPDATED(message) });
};

// ✅ Delete template by ID
exports.removeTemplateById = async ({emailTemplateId }) => {
  const removedTemplate = await destroy({
    model: models.emailTemplate,
    condition: { id:emailTemplateId },
  });

  throwIfBadRequestError({
    condition: !removedTemplate,
    message: ErrorMessage.INVALID("Email Template Id"),
  });

  return handleSuccess({ message: SuccessMesage.DELETED(message) });
};
