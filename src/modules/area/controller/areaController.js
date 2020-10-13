const AbstractController = require('../../abstractController');
const { fromDataToEntity } = require('../mapper/areaMapper');

class AreaController extends AbstractController {
  /**
   * @param {import('../service/areaService')} areaService
   */
  constructor(areaService) {
    super();
    this.ROUTE_BASE = '/area';
    this.areaService = areaService;
  }

  /**
   * @param {import('express').Application} app
   */
  configureRoutes(app) {
    const ROUTE = this.ROUTE_BASE;

    app.get(`${ROUTE}`, this.index.bind(this));
    app.get(`${ROUTE}/create`, this.create.bind(this));
    app.post(`${ROUTE}/save`, this.save.bind(this));
    app.get(`${ROUTE}/update/:areaId`, this.update.bind(this));
    app.get(`${ROUTE}/delete/:areaId`, this.delete.bind(this));
  }

  /**
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   */
  async index(req, res) {
    const areas = await this.areaService.getAll();
    const { message, error } = req.session;
    res.render('area/views/index.html', { areas, message, error });
    req.session.message = null;
    req.session.error = null;
  }

  /**
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   */
  // eslint-disable-next-line class-methods-use-this
  async create(req, res) {
    res.render('area/views/form.html');
  }

  /**
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   */
  async save(req, res) {
    try {
      const { body: areaData } = req;
      const area = fromDataToEntity(areaData);
      const savedArea = await this.areaService.save(area);
      if (area.id) {
        req.session.message = `Area ${area.name} with id ${area.id} successfully updated`;
      } else {
        req.session.message = `Area ${savedArea.name} with id ${savedArea.id} successfully created`;
      }
    } catch (error) {
      req.session.error = error.message;
    }
    res.redirect('/area');
  }

  /**
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   */
  async update(req, res) {
    try {
      const { areaId } = req.params;
      const area = await this.areaService.getById(areaId);
      res.render('area/views/form.html', { area });
    } catch (error) {
      req.session.error = error.message;
      res.redirect('/area');
    }
  }

  /**
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   */
  async delete(req, res) {
    try {
      const { areaId } = req.params;
      const area = await this.areaService.getById(areaId);
      await this.areaService.delete(areaId);
      req.session.message = `Area ${area.name} with id ${area.id} sucessfully deleted`;
    } catch (error) {
      req.session.error = error.message;
    }
    res.redirect('/area');
  }
}

module.exports = AreaController;
