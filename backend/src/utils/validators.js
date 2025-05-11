import Joi from 'joi';

const applicationSchema = Joi.object({
  role: Joi.string().required(),
  companyId: Joi.string().required(),
  status: Joi.string().valid(
    'APPLIED', 'INTERVIEW', 'OFFER', 'REJECTED', 'ACCEPTED', 'CLOSED'
  ),
  source: Joi.string().valid('REFERRAL', 'LINKEDIN', 'CAREERS_PAGE', 'OTHER')
});

const emailSchema = Joi.object({
  subject: Joi.string().required().max(120),
  content: Joi.string().required().min(50),
  employeeId: Joi.string().required()
});

const userSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required()
});

export { applicationSchema, emailSchema, userSchema };