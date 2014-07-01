(function ($, _) {
  'use strict';

  var _private = {
    group: function (photos) {
      if (Object.prototype.toString.call(photos) != '[object Array]') {
        return null
      }

      var result = {};
      _.map(photos, function (item) {
        var dateStr = _private.formatDate(new Date(item.time));

        result[dateStr] = result[dateStr] || [];
        result[dateStr].push(item);
      });

      return result;
    },
    formatDate: function (date) {
      if (Object.prototype.toString.call(date) != '[object Date]') {
        return '';
      }

      var currDate = date.getDate();
      var currMonth = date.getMonth() + 1;
      var currYear = date.getFullYear();

      return currYear + '-' + currMonth + '-' + currDate;
    },
    resizePhotos: function (photos) {
      return _.forEach(_private.group(photos), function (photoGroup) {
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

          //photo.imageURL = 'http://placehold.it/910x977';
          photo.width = ~~w;
          photo.height = ~~h;
        });
      });
    },
    onScroll: function () {
      // let it cache the photos before scroll to bottom
      if ($(window).scrollTop() + $(window).height() > $(document).height() - 85) {

        if (this.urls.indexOf(this.url) !== -1) {
          return;
        }

        console.log('getJSON for ' + this.url);
        this.urls.push(this.url);
        $.getJSON(this.url).done(_.bind(_private.success, this, true));
      }
    },
    success: function (isAppend, data) {
      this.url = data.nextURL;

      var html = this.template({
        photos: _private.resizePhotos(data.photos)
      });

      if (!isAppend) {
        this.$el.html(html);
      } else {
        this.$el.append(html);
      }
    }
  };

  var PhotoSync = function (el, options) {
    this.template = _.template($('script[name="photos"]').html());
    this.urls = [];
    this.url = 'http://photo-sync.herokuapp.com/photos';
    this.$el = $(el);

    $.getJSON(this.url).done(_.bind(_private.success, this, false));
    $(window).scroll(_.bind(_.throttle(_private.onScroll, 200), this));
  };

  new PhotoSync('#app');

}(jQuery, _));