const AbstractClubController = require('./abstractClubController');
const fromDataToEntity = require('../mapper/clubMapper');

class ClubController extends AbstractClubController {
  /**
   * @param {import("../service/clubService")} clubService
   */
  constructor(uploadMiddleware, clubService) {
    super();
    this.ROUTE_BASE = '/club';
    this.uploadMiddleware = uploadMiddleware;
    this.clubService = clubService;
  }

  /**
   * @param {import("express").Application} app
   */
  configureRoutes(app) {
    const ROUTE = this.ROUTE_BASE;

    app.get(`${ROUTE}`, this.index.bind(this));
    app.get(`${ROUTE}/view/:id`, this.view.bind(this));
    app.get(`${ROUTE}/create`, this.create.bind(this));
    app.get(`${ROUTE}/update/:id`, this.update.bind(this));
    app.post(`${ROUTE}/save`, this.uploadMiddleware.single('crest-url'), this.save.bind(this));
    app.get(`${ROUTE}/delete/:id`, this.delete.bind(this));
  }

  /**
   * @param {import("express").Request} req
   * @param {import("express").Response} res
   */
  async index(req, res) {
    const clubes = await this.clubService.getAll();
    const { message, error } = req.session;
    res.render('club/views/index.html', { clubes, message, error });
    req.session.message = null;
    req.session.error = null;
  }

  /**
   * @param {import("express").Request} req
   * @param {import("express").Response} res
   */
  async update(req, res) {
    try {
      const { id: clubId } = req.params;
      const clubToUpdate = await this.clubService.getById(clubId);
      res.render('club/views/form.html', { club: clubToUpdate });
    } catch (error) {
      req.session.error = error.message;
      res.redirect('/club');
    }
  }

  /**
   * @param {import("express").Request} req
   * @param {import("express").Response} res
   */
  // eslint-disable-next-line class-methods-use-this
  create(req, res) {
    res.render('club/views/form.html');
  }

  /**
   * @param {import("express").Request} req
   * @param {import("express").Response} res
   */
  async save(req, res) {
    try {
      const clubData = { ...req.body };
      if (req.file) {
        const { path } = req.file;
        clubData['crest-url'] = `\\${path}`;
      }
      const club = fromDataToEntity(clubData);
      const savedClub = await this.clubService.save(club);
      if (club.id) {
        req.session.message = `Club ${club.name} with id ${club.id} successfully updated`;
      } else {
        req.session.message = `Club ${savedClub.name} with id ${savedClub.id} successfully created`;
      }
    } catch (error) {
      req.session.error = error.message;
    }
    res.redirect('/club');
  }

  /**
   * @param {import("express").Request} req
   * @param {import("express").Response} res
   */
  async delete(req, res) {
    try {
      const { id: clubId } = req.params;
      const club = await this.clubService.getById(clubId);
      await this.clubService.delete(clubId);
      req.session.message = `Club ${club.name} with id ${club.id} successfully deleted`;
    } catch (error) {
      req.session.error = error.message;
    }
    res.redirect('/club');
  }

  /**
   * @param {import("express").Request} req
   * @param {import("express").Response} res
   */
  async view(req, res) {
    try {
      const clubId = req.params.id;
      const club = await this.clubService.getById(clubId);
      res.render('club/views/club.html', { club });
    } catch (error) {
      req.session.error = error.message;
      res.redirect('/club');
    }
  }
}

module.exports = ClubController;
