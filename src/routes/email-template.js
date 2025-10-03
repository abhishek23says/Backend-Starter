const router = require("express").Router();
const { errorWrapper } = require('../../utils/commonFunctions');
const { validate } = require("../middlewares/validator");
const checkAuth = require('../middlewares/checkAuth');
const checkPermission = require('../middlewares/checkPermission');
const {
  addEmailTemplate,
  getTemplateById,
  getTemplateByName,
  listEmailTemplates,
  removeTemplateById,
  updateTemplateById,
} = require("../controllers/emailTemplate");
const { createEmailTemplateValidation, updateEmailTemplateValidation } = require("../validators/emailTemplate");
const { nameValidation, idValidation } = require("../validators/commonValidators");

// create
router.post('/' ,checkAuth,/* checkPermission,*/ validate(createEmailTemplateValidation), errorWrapper(addEmailTemplate));

// Read
router.get('/', checkAuth, /* checkPermission,*/ errorWrapper(listEmailTemplates));
router.get('/:emailTemplateId', checkAuth, /* checkPermission,*/ errorWrapper(getTemplateById));
router.get('/name/:emailTemplateName', checkAuth, /* checkPermission,*/ /* validate(nameValidation), */errorWrapper(getTemplateByName));

// Update
router.put('/:emailTemplateId', checkAuth, /* checkPermission,*/ errorWrapper(updateTemplateById));

// Delete
router.delete('/:emailTemplateId', checkAuth, /* checkPermission,*/errorWrapper(removeTemplateById));

module.exports = router;