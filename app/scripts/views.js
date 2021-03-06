class PhotosView extends Backbone.View {

  initialize() {
    this.template = _.template($('script[name="photos"]').html());
    this.url = 'http://photo-sync.herokuapp.com/photos';
    this.urls = [];

    // should throttle it and avoid calling multiple times
    $(window).scroll(_.bind(_.throttle(this.onScroll, 200), this));
  }

  render() {
    this.$el.html('<h1>loading photos...</h1>');

    var _this = this;
    _this.urls.push(_this.url);
    $.getJSON(this.url).done(_.bind(this.success, this, false));

    return this;
  }

  group(photos) {
    if (Object.prototype.toString.call(photos) != '[object Array]') {
      return null
    }

    var result = {};
    _.map(photos, function (item) {
      var dateStr = this.formatDate(new Date(item.time));

      result[dateStr] = result[dateStr] || [];
      result[dateStr].push(item);
    }, this);

    return result;
  }

  formatDate(date) {
    if (Object.prototype.toString.call(date) != '[object Date]') {
      return '';
    }

    var currDate = date.getDate();
    var currMonth = date.getMonth() + 1;
    var currYear = date.getFullYear();

    return currYear + '-' + currMonth + '-' + currDate;
  }

  resizePhotos(photos) {
    return _.forEach(this.group(photos), function (photoGroup) {
      var maxWH = 160;

      _.forEach(photoGroup, function (photo) {
        var w = photo.width;
        var h = photo.height;
        var ratio = parseFloat(w / h);

        if (w > maxWH || h > maxWH) {
          if (w > h) {
            w = maxWH;
            h = w / ratio;
          } else {
            h = maxWH;
            w = h * ratio;
          }
        }

        photo.width = ~~w;
        photo.height = ~~h;
      });
    });
  }

  onScroll() {
    // let it cache the photos before scroll to bottom
    if ($(window).scrollTop() + $(window).height() > $(document).height() - 85) {

      if (this.urls.indexOf(this.url) !== -1) {
        return;
      }

      console.log('getJSON for ' + this.url);
      this.urls.push(this.url);
      $.getJSON(this.url).done(_.bind(this.success, this, true));
    }
  }

  success(isAppend, data) {
    this.url = data.nextURL;

    var html = this.template({
      photos: this.resizePhotos(data.photos)
    });

    if (!isAppend) {
      this.$el.html(html);
    } else {
      this.$el.append(html);
    }
  }

}

class HomeView extends Backbone.View {

  initialize() {
    this.template = $('script[name="home"]').html();
  }

  render() {
    this.$el.html(_.template(this.template));
    return this;
  }

}

export {
  PhotosView, HomeView
};