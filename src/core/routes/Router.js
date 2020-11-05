import {$} from '../Dom';
import {ActiveRoute} from './ActiveRoute';
import {Loader} from '../../components/Loader';

export class Router {
  constructor(selector, routes) {
    if (!selector) {
      throw new Error('Selector is required for routing')
    }
    this.$placeholder = $(selector)
    this.routes = routes

    this.loader = new Loader()
    this.page = null

    this.changeHandler = this.changeHandler.bind(this)
    this.init()
  }

  init() {
    window.addEventListener('hashchange', this.changeHandler)
    this.changeHandler()
  }

  async changeHandler() {
    if (this.page) {
      this.page.destroy()
    }
    this.$placeholder.clear().append(this.loader)

    const Page = ActiveRoute.path.includes('excel')
        ? this.routes.excel
        : this.routes.dashboard
    this.page = new Page(ActiveRoute.param)

    const root = await this.page.getRoot()

    this.$placeholder.clear().append(root)
    this.page.afterRender()
  }

  destroy() {
    window.removeEventListener('hashchange', this.changeHandler)
  }
}
