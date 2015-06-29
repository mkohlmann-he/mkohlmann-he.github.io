$(document).ready(function () {

    $("p#ddd > label > strong").html(getdate());

    jQuery.validator.addMethod('vdate', function (value, element, param) {
    return this.optional(element) || /^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[1,3-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/.test( value );
    }, 'Please enter a date value (dd/mm/yyyy)');

    $('#blogform').validate({
        rules: {
            t: {
                required: true,
                vdate: true
            }
        },
        submitHandler: function (form) { 
            return false;
        }
    });

});

function getdate(){
      var today = new Date();
      var dd = today.getDate();
      var mm = today.getMonth()+1;
      var yyyy = today.getFullYear();
      if(mm < 10) {
        mm = "0" + mm;
      }
      var curr = mm + '/' + dd + '/' + yyyy;
      return curr;

}

function post(){
  //var urlLocal = "entries.json"
  var urlRemote = "https://mkohlmann-he.github.io/entries.json"
  var jsonField = ('{"entries":['  + '<br />');
  $.getJSON(urlRemote, function(data) {
    $.each(data.entries, function(key, val) {
      var single = '{"date":"' + val.date + '", "title":"' + val.title + '", "text":"' + val.text.replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, '\\"') + '"}';
      //console.log(single);
      console.log("inside");
      jsonField += (single);
      if((data.entries.length - 1) != key){
        jsonField += (',<br />');
      } else {
        jsonField += (',<br />');
        // new post
        var t = getdate();
        var h = $("input#h").val();
        var c = $("textarea#c").val();
        c = $("textarea#c").val().replace(/\n/g, "&lt;br&gt;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, '\\"');
        var added = '{"date":"' + t + '", "title":"' + h + '", "text":"' + c + '"}';
        jsonField += (added);
        jsonField += ('<br />]}');
      }
    });
    console.log(jsonField)
    document.getElementById("json").innerHTML = jsonField;
  });


  $("body").css('background-color', '#FFFFFF');
  $("html").css('background-color', '#FFFFFF');
  $("#getnewpost").hide();
}

