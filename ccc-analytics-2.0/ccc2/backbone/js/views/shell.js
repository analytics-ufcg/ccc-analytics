var position;

directory.ShellView = Backbone.View.extend({

    initialize: function () {
       position = 1;
    },

    render: function () {
        this.$el.html(this.template());
        return this;
    },

    events:{
        "click #grade1":"fluxograma",
        "click #grade2":"blocagemComum",
        "click #bloc1":"blocagem1",
        "click #bloc2":"blocagem2",
        "click #bloc3":"blocagem3",
        "click #bloc4":"blocagem4",
        "click #correlacao":"correlacao",
        "click #taxareprovacao":"taxareprovacao"
    },

    fluxograma:function () {
        if(position==1) console.log("Já está no Fluxograma");
        else{
            //directory.coursesView.setPositions("http://analytics.lsd.ufcg.edu.br/ccc/getDisciplinasPorPeriodo", 0);
            directory.coursesView.setPositions("data/grade-disciplinas-por-periodo.json", 0);
            directory.coursesView.connect("data/prereq.json");
            position = 1;
            console.log("Fluxograma Comum");
        } 
    },

    blocagemComum:function () {
        if(position==2) console.log("Já está no Blocagem Comum");
        else{
            directory.coursesView.setPositions("data/maiores_frequencias_por_disciplina_ordenado_obrigatorias.json", 1);
            position = 2;
            console.log("Blocagem Comum");

        } 
        
    },

    blocagem1:function () {
        
        if(position==3) console.log("Já está no Blocagem 1");
        else{
            directory.coursesView.setPositions("data/cls_fa/1_cluster.json", 0);
            position = 3;
            console.log("Blocagem 1");

        } 
        
    },

    blocagem2:function () {
         if(position==4) console.log("Já está no Blocagem 2");
        else{
            directory.coursesView.setPositions("data/cls_fa/2_cluster.json", 0);
            position = 4;
            console.log("Blocagem 2");

        } 
        
    },

    blocagem3:function () {
         if(position==5) console.log("Já está no Blocagem 3");
        else{
            directory.coursesView.setPositions("data/cls_fa/3_cluster.json", 0);
            position = 5;
            console.log("Blocagem 3");

        }     
        
    },

    blocagem4:function () {
        if(position==6) console.log("Já está no Blocagem 4");
        else{
            directory.coursesView.setPositions("data/cls_fa/4_cluster.json", 0);
            position = 6;
            console.log("Blocagem 4");

        }    
    },
    
    correlacao:function () {
        if(position==7) console.log("Já está na Correlação");
        else{
            //directory.coursesView.setPositions("http://analytics.lsd.ufcg.edu.br/ccc/getDisciplinasPorPeriodo", 0);
            if(position!=1) directory.coursesView.setPositions("data/grade-disciplinas-por-periodo.json", 0);
            
            directory.coursesView.correlacao("data/US06_matrizCorrelacaoFiltrada_spearman.json");
            position = 7;
            console.log("Correlacao");
        }    
    },
    
    taxareprovacao:function () {
        if(position==8) console.log("Já está na Taxa Reprovacao");
        else{
            //directory.coursesView.setPositions("http://analytics.lsd.ufcg.edu.br/ccc/getDisciplinasPorPeriodo", 0);
            directory.coursesView.taxaReprovacao("data/media_disciplinas.json", 0);

            position = 8;
            console.log("taxareprovacao");

        }    
    }
});