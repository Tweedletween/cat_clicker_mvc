var model = {
    cur_cat_idx: null,
    cats: [
      {'path': 'imgs/cat1.jpg', 'name': 'cat1', 'cnt': 0},
      {'path': 'imgs/cat2.jpg', 'name': 'cat2', 'cnt': 0},
      {'path': 'imgs/cat3.jpg', 'name': 'cat3', 'cnt': 0},
      {'path': 'imgs/cat4.jpg', 'name': 'cat4', 'cnt': 0},
      {'path': 'imgs/cat5.jpg', 'name': 'cat5', 'cnt': 0},
      {'path': 'imgs/cat6.jpg', 'name': 'cat6', 'cnt': 0},
    ]
};


var controller = {
    incr_cat_click: function(i) {
        model.cats[i]['cnt'] += 1;
    },

    set_cur_cat_idx: (i) => {
      model.cur_cat_idx = i;
    },

    get_cur_cat: function() {
      return model.cats[model.cur_cat_idx];
    },

    get_cats: function() {
        return model.cats;
    },

    init: function() {
        view.init();
    }
};


var view = {
    init: function() {
        this.cat_list = $('#cat_list');
        var cats = controller.get_cats();
        for (let i = 0; i < cats.length; i++) {
            var el = $('<li/>').appendTo(this.cat_list);
            el.text(cats[i]['name']);
            el.click(() => {
                controller.incr_cat_click(i);
                console.debug(this);
                controller.set_cur_cat_idx(i);
                this.render_cat_details();
            });
        }
    },

    render_cat_details: function() {
        this.show_case = $('#show_case');
        var htmlStr = '';
        var cat = controller.get_cur_cat();
        htmlStr = `<h1>${cat['name']}</h1><img src=${cat['path']}><br><p>Clicks: ${cat['cnt']}</p>`
        this.show_case.html( htmlStr );
    }
};

controller.init();
