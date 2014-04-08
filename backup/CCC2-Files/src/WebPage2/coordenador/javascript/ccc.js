function show_info(){
    $("#div_inicio").hide();
    $("#div_contato").hide();
    $("#div_sobre").show();
    
    var $thisLi = $("#bt_sobre").parent('li');
    var $ul = $thisLi.parent('ul');

    if (!$thisLi.hasClass('active'))
    {
        $ul.find('li.active').removeClass('active');
        $thisLi.addClass('active');
    }
    console.log("info")
}

function show_inicio(){
    $("#div_contato").hide();
    $("#div_sobre").hide();
    $("#div_inicio").show();

    var $thisLi = $("#bt_inicio").parent('li');
    var $ul = $thisLi.parent('ul');

    if (!$thisLi.hasClass('active'))
    {
        $ul.find('li.active').removeClass('active');
        $thisLi.addClass('active');
    }
    console.log("inicio")
}

function show_contato(){
    $("#div_contato").hide();
    $("#div_inicio").hide();
    $("#div_sobre").show();    

    var $thisLi = $("#bt_cntc").parent('li');
    var $ul = $thisLi.parent('ul');

    if (!$thisLi.hasClass('active'))
    {
        $ul.find('li.active').removeClass('active');
        $thisLi.addClass('active');
    }
    console.log("contatos")
}


