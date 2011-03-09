/*
  TINTED SHEEN
  Bookmarklet, & browser extensions to cure that winning Charlie Sheen hangover.

  by Greg Leuch <http://gleuch.com> / @gleuch

  MIT License - http://creativecommons.org/licenses/MIT

  ------------------------------------------------------------------------------------
 
*/


Array.prototype.in_array = function(p_val, sensitive) {for(var i = 0, l = this.length; i < l; i++) {if ((sensitive && this[i] == p_val) || (!sensitive && this[i].toLowerCase() == p_val.toLowerCase())) {return true;}} return false;};
function rgb2hex(rgb) {rgb = rgb.replace(/\s/g, "").replace(/^(rgb\()(\d+),(\d+),(\d+)(\))$/, "$2|$3|$4").split("|"); return "#" + hex(rgb[0]) + hex(rgb[1]) + hex(rgb[2]);} 
function hex(x) {var hexDigits = new Array("0", "1", "2", "3", "4", "5", "6", "7", "8","9", "A", "B", "C", "D", "E", "F"); return isNaN(x) ? "00" : hexDigits[(x-x%16)/16] + hexDigits[x%16];}


Array.prototype.in_array = function(p_val, sensitive) {for(var i = 0, l = this.length; i < l; i++) {if ((sensitive && this[i] == p_val) || (!sensitive && this[i].toLowerCase() == p_val.toLowerCase())) {return true;}} return false;};
function rgb2hex(rgb) {rgb = rgb.replace(/\s/g, "").replace(/^(rgb\()(\d+),(\d+),(\d+)(\))$/, "$2|$3|$4").split("|"); return "#" + hex(rgb[0]) + hex(rgb[1]) + hex(rgb[2]);} 
function hex(x) {var hexDigits = new Array("0", "1", "2", "3", "4", "5", "6", "7", "8","9", "A", "B", "C", "D", "E", "F"); return isNaN(x) ? "00" : hexDigits[(x-x%16)/16] + hexDigits[x%16];}


function tinted_sheen_start($_) {
  $_.fn.reverse = function(){return this.pushStack(this.get().reverse(), arguments);};

  (function($_) {
    $_.tinted_sheen = function(data, c) {
      if (!$_.tinted_sheen.settings.finish) $_.tinted_sheen.init();
      $_(data).tinted_sheen(c);
      if (!$_.tinted_sheen.settings.finish) $_.tinted_sheen.finish();
    };

    $_.fn.tinted_sheen = function(c) {
      return this.filter(function() {return $_.tinted_sheen.filter(this);}).each(function() {$_.tinted_sheen.tint(this, c);});
    };

    $_.extend($_.tinted_sheen, {
      settings : {hide_bg : true, href : false, page_height : 0, search: /(charlie(\s|\-|\_)?)?(sheen|porn\sfamily|\#winning|\#tigerblood|tiger\sblood|adonis\sdna|\#sheenskorner|sheen\'s\skorner|\#fastball)/img, replace: '<span class="tinted_sheen" style="color: %C; background-color: %C;">$1$2$3</span>', starred: '****** ******', init : false, finish : false},

      pluck : function(str) {return str.replace(/(charlie\s)(sheen)/img, '****** ******').replace(/(sheen|\#winning)/img, '******');},

      filter : function(self) {
        if (self.nodeType == 1) {
          var tag = self.tagName.toLowerCase();
          return !(self.className.match('tinted_sheen') || tag == 'head' || tag == 'img' || tag == 'textarea' || tag == 'option' || tag == 'style' || tag == 'script');
        } else {
          return true;
        }
      },

      tint : function(self, c) {
        $_(self).css({'text-shadow' : 'none'});

        if (self.nodeType == 3) {
          if (self.nodeValue.replace(/\s/ig, '') != '') {
            if (!c) c = $_(self).parent() ? $_(self).parent().css('color') : '#000000';
            text = self.nodeValue.replace($_.tinted_sheen.settings.search, $_.tinted_sheen.settings.replace.replace(/\%C/mg, c) );
            $_(self).after(text);
            self.nodeValue = '';
          }
        } else if (self.nodeType == 1) {
          c = rgb2hex($_(self).css('color'));
          if ($_(self).children().length > 0) {
            $_.tinted_sheen($_(self).contents(), c);
          } else if ($_(self).children().length == 0) {
            text = $_(self).html().replace($_.tinted_sheen.settings.search, $_.tinted_sheen.settings.replace.replace(/\%C/mg, c) );
            $_(self).html(text);
          }
        }
      },

      init : function() {
        $_.tinted_sheen.settings.init = true;
      },

      finish : function() {
        $_(document).each(function() {this.title = $_.tinted_sheen.pluck(this.title);});

        $_('img, input[type=image]').each(function() {
          try {
            if ($_(this).attr('alt').match($_.tinted_sheen.settings.search) || $_(this).attr('title').match($_.tinted_sheen.settings.search) || $_(this).attr('src').match($_.tinted_sheen.settings.search)) {
              var r = $_(this), w = r.width(), h = r.height(), c = rgb2hex($_(this).css('color'));
              r.css({background: c, width: r.width(), height: r.height()}).attr('src', 'http://assets.gleuch.com/blank.png').width(w).height(h);
            }
          } catch(e) {}
        });

        $_('input[type=text]').each(function() {if ($_(this).val().match($_.tinted_sheen.settings.search) ) $_(this).val( $_.tinted_sheen.pluck($_(this).val()) );});
        $_('textarea, option').each(function() {if ($_(this).html().match($_.tinted_sheen.settings.search) ) $_(this).html( $_.tinted_sheen.pluck($_(this).html()) );});

        var s = document.createElement("style");
        s.innerHTML = ".tinted_sheen {font-size: inherit !important; "+ ($_.tinted_sheen.settings.hide_bg ? "background-image: none !important;" : "") +"} .bg_tinted_sheen {"+ ($_.tinted_sheen.settings.hide_bg ? "background-image: none !important;" : "") +"}";
        $_('head').append(s);

        $_.tinted_sheen.settings.href = location.href;
        $_.tinted_sheen.settings.page_height = $_('body').height();

        $_.tinted_sheen.settings.finish = true;
      }
    });
  })($_);

  $_.tinted_sheen('body', '#000000');

  /* Allow AJAX detection */
  setInterval(function() {
    var h = $_('body').height(), ch = $_.tinted_sheen.settings.page_height;

    if (location.href != $_.tinted_sheen.settings.href || Math.abs(ch-h) > 20 ) {
      $_.tinted_sheen.settings.href = location.href;
      $_.tinted_sheen.settings.page_height = h;
      $_.tinted_sheen.settings.init = false;
      $_.tinted_sheen.settings.finish = false;
      $_.tinted_sheen('body', '#000000');
    }
  }, 1000);
}






/* Let start blocking the #winning */
try {
  if (!jQuery('body').hasClass('tigerblood')) {
    jQuery('body').addClass('tigerblood');
    tinted_sheen_start(jQuery);
  }
} catch(err) {}