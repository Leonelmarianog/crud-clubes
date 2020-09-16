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
    res.render('club/views/index.html', { clubes });
  }

  /**
   * @param {import("express").Request} req
   * @param {import("express").Response} res
   */
  async update(req, res) {
    const { id: clubId } = req.params;
    const clubToUpdate = await this.clubService.getById(clubId);
    res.render('club/views/form.html', { club: clubToUpdate });
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
    const clubData = { ...req.body };
    const club = fromDataToEntity(clubData);
    const savedClub = await this.clubService.save(club);
    res.redirect(`/club/view/${savedClub.id}`);
  }

  /**
   * @param {import("express").Request} req
   * @param {import("express").Response} res
   */
  async delete(req, res) {
    const { id: clubId } = req.params;
    await this.clubService.delete(clubId);
    res.redirect('/');
  }

  /**
   * @param {import("express").Request} req
   * @param {import("express").Response} res
   */
  async view(req, res) {
    const clubId = req.params.id;
    const club = await this.clubService.getById(clubId);
    res.render('club/views/club.html', { club });
  }
}

module.exports = ClubController;
