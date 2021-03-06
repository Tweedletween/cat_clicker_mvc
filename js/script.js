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

    get_cur_cat_idx: () => {
      return model.cur_cat_idx;
    },

    get_cur_cat: function() {
      return model.cats[model.cur_cat_idx];
    },

    get_cats: function() {
        return model.cats;
    },

    save_cur_cat_info: function(name, path, clicks) {
        if (model.cur_cat_idx !== null) {
            model.cats[model.cur_cat_idx]['path'] = path;
            model.cats[model.cur_cat_idx]['name'] = name;
            model.cats[model.cur_cat_idx]['cnt'] = parseInt(clicks);
        }
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


        this.edit_area = $('#edit_area');
        this.edit_area.hide();

        this.e_name = $('#e_name');
        this.e_path = $('#e_path');
        this.e_clicks = $('#e_clicks');

        this.admin = $('#admin');
        this.admin.click(() => {
            this.edit_area.show();
        });
        this.admin.hide();

        this.e_save = $('#e_save');
        this.e_save.click(() => {
            controller.save_cur_cat_info(this.e_name.val(),
                this.e_path.val(),
                this.e_clicks.val());

            this.clear_edits();
            this.edit_area.hide();
            this.update_cat_list_item();
            this.render_cat_details();
        });

        this.e_cancel = $('#e_cancel');
        this.e_cancel.click(() => {
            this.clear_edits();
            this.edit_area.hide();
        });
    },

    clear_edits: function() {
        this.e_name.val('');
        this.e_path.val('');
        this.e_clicks.val('');
    },

    update_cat_list_item: function() {
        var new_name = controller.get_cur_cat()['name'];
        var cur_cat_idx = controller.get_cur_cat_idx();
        var li_to_modify = this.cat_list.children('li').eq(cur_cat_idx);
        li_to_modify.text(new_name);
    },

    render_cat_details: function() {
        this.show_case = $('#show_case');
        var htmlStr = '';
        var cat = controller.get_cur_cat();
        htmlStr = `<h1>${cat['name']}</h1><img src=${cat['path']}><br><p>Clicks: ${cat['cnt']}</p>`
        this.show_case.html( htmlStr );
        this.admin.show();
    }
};

controller.init();
