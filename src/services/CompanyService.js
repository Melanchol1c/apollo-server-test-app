import models from '../models';

const CompanyService = {
  getAll() {
    return models.Company.findAll();
  },

  getCompanyById(id) {
    return models.Company.findOne({ where: { id } });
  },

  async create(fields) {
    const result = await models.Company.create(fields, {
      returning: true,
      plain: true,
    });

    if (result) {
      return result[1].dataValues;
    }

    return null;
  },

  async update(id, fields) {
    const result = await models.Company.update(fields, {
      where: { id },
      returning: true,
      plain: true,
    });

    if (result) {
      return result[1].dataValues;
    }

    return null;
  },
};

export default CompanyService;
