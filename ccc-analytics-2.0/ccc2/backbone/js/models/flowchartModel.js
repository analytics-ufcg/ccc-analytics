

directory.FlowChart = Backbone.Model.extend({

    urlRoot:"/directory-rest-php/employees",
//    urlRoot:"http://localhost:3000/employees",

    initialize:function () {
        this.reports = new directory.FlowChartCollection();
        this.reports.url = this.urlRoot + "/" + this.id + "/reports";
    }

});

directory.FlowChartCollection = Backbone.Collection.extend({

    model: directory.FlowChart,

    url:"/directory-rest-php/employees"
//    url:"http://localhost:3000/employees"

});