
// global i18n object

var i18n = new(function() {
  var default_lng = "en";
  var supported_lngs = [
    default_lng, // default language
    "de", // translations found in locale/de.js
  ];
  this.translate = function() {
    var lng = settings.ui_language;
    if (lng == "auto") {
      // get user agent's language
      lng = navigator.language.replace(/-.*/,"").toLowerCase();
      if ($.inArray(lng,supported_lngs) == -1) {
        lng = default_lng;
        return false;
      }
    }
    if (lng == default_lng)
      return true; // nothing to do here :)

    // load language pack
    $.ajax("locales/"+lng+".js",{async:false,dataType:"json"}).success(function(data){
      td = $.extend(td,data);
      i18n.translate_ui();
      // todo: nicer implementation
    }).error(function(){
      alert("foo!!!");
    });
  }
  this.translate_ui = function() {
    // look for all object with the class "t"
    $(".t").each(function(nr,element) {
      // get translation term(s)
      var terms = $(element).attr("t");
      terms = terms.split(";");
      for (var i=0; i<terms.length; i++) {
        var term = terms[i];
        var tmp = term.match(/^(\[(.*)\])?(.*)$/);
        var what = tmp[2];
        var key  = tmp[3];
        var val = td[key];
        if (what === "html") {
          $(element).html(val);
        } else if (what !== undefined) {
          $(element).attr(what,val);
        } else {
          $(element).text(val);
        }
      }
    });
  }
  this.t = function(key) {
    return td[key];
  }

  // default texts
  var td = {
    "map_controlls.zoom_to_data": "zoom onto data",
    "map_controlls.localize_user": "pan to user location",
    "map_controlls.select_bbox": "manually select bbox",
    "map_controlls.toggle_wide_map": "toggle wide map",
    "map_controlls.clear_data": "clear data overlay",

    "dialog.dismiss": "dismiss",
    "dialog.cancel": "cancel",
    "dialog.save": "save",
    "dialog.delete": "delete",
    "dialog.close": "close",
    "dialog.done": "done",
    "dialog.repair_query": "repair query",
    "dialog.continue_anyway": "continue anyway",
    "dialog.show_data": "show data",

    "error.query.title": "Query Error",
    "error.query.expl": "An error occured during the execution of the overpass query! This is what overpass API returned:",
    "error.ajax.title": "Ajax Error",
    "error.ajax.expl": "An error occured during the execution of the overpass query!",
    "error.browser.title": "Your browser is not supported :(",
    "error.browser.expl.1": "<p>The browser you are currently using, is (most likely) not capable of running (significant parts of) this Application. <small>It must support <a href=\"http://en.wikipedia.org/wiki/Web_storage#localStorage\">Web Storage API</a> and <a href=\"http://en.wikipedia.org/wiki/Cross-origin_resource_sharing\">cross origin resource sharing (CORS)</a>.</small></p>",
    "error.browser.expl.2": "<p>Note that you may have to enable cookies and/or \"local Data\" for this site on some browsers (such as Firefox and Chrome).</p>",
    "error.browser.expl.3": "<p>Please upgrade to a more up-to-date version of your browser or switch to a more capable one! Recent versions of <a href=\"http://www.opera.com\">Opera</a>, <a href=\"http://www.google.com/intl/de/chrome/browser/\">Chrome</a> and <a href=\"http://www.mozilla.org/de/firefox/\">Firefox</a> have been tested to work. Alternatively, you can still use the <a href=\"http://overpass-api.de/query_form.html\">Overpass_API query form</a>.</p>",

    "waiter.processing_query": "processing query...",
    "waiter.export_as_image": "exporting as image...",

    "the end":""
  };
})(); // end create overpass object













