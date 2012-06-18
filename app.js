
var ItemView = Backbone.View.extend({

  tagName: 'li',
  className: 'item',

  template: _.template('<span class=id><%= id %></span> ' +
                       '<span class=name><%= name %></span> ' +
                       '<a href="#" class=remove>X</a>'),

  events: {
    'click .name': 'clickName',
    'click .id': 'clickId',
    'click .remove': 'removeModel'
  },

  initialize: function() {
    _.bindAll(this);
    this.model.on('destroy', this.remove);
  },

  render: function() {
    var content = this.template(this.model.toJSON());
    this.$el.html(content);
    return this;
  },

  clickName: function() {
    console.log(this.model.get('id'));
  },

  clickId: function() {
    console.log(this.model.get('name'));
  },

  removeModel: function() {
    this.model.destroy();
  }

});

var ModuleView = Backbone.View.extend({

  views: [],

  initialize: function() {
    _.bindAll(this);
    this.collection.on('reset', this.renderAll);
  },

  renderAll: function() {
    var _this = this;

    this.collection.each(function(model){
      var view = new ItemView({model: model});
      _this.views.push(view);

      var content = view.render().el;
      _this.$('.list').append(content);
    });
    

  },

  render: function() {
    this.$el.html('<h1>Stations</h1><ul class=list></ul>');
    return this;
  }


});

var Model = Backbone.Model.extend({

});

var Collection = Backbone.Collection.extend({
  model: Model,
  url: '/stations.json'
});

var collection = new Collection;

var view = new ModuleView({collection: collection});
$('#container').append(view.render().el);

collection.fetch();

