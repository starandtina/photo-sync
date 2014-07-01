import {
  HomeView, PhotosView
}
from './views';

class Router extends Backbone.Router {

  constructor() {
    this.routes = {
      '': 'home',
      'photos': 'Photos'
    };
    super();
  }

  home() {
    console.log('Route#home');
    var view = new HomeView();
    $('#app').html(view.render().$el);
  }

  Photos() {
    console.log('Route#Photos');
    var view = new PhotosView();
    $('#app').html(view.render().$el);
  }

}

export
default Router;