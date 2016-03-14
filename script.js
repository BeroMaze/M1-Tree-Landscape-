$('.aboutBoxes').hide();
$('#ContactForm').hide();

$('li').hover(function() {
  $(this).toggleClass('pulse animated');
});

$('#contact').on('click', function(event) {
  $('#ContactForm').show();
  $('#logoLanding').hide();
  $('#about').hide();
  $('#about').hide();
  $('#about').hide();
});

$('#home').on('click', function(event) {
  window.open("index.html","_self")
});
function sizing() {
  $width = $(window).width();
  $height = $(window).height();
  $('html').css('width', $width);
  $('html').css('height', $height);
  $('body').css('width', $width);
  $('body').css('height', $height);
  $('main').css('width', $width);
  $('main').css('height', $height);
  $('#logoLanding').css('width', $width);
  $('#logoLanding').css('height', $height);
  $('#about').css('width', $width);
  $('#about').css('height', $height-80);
  $('#logo').css('width', $width);
  $('#logo').css('height', $height);
  $('#ContactForm').css('width', $width);
  $('#ContactForm').css('height', $height-90);
}
sizing();

$('main').scroll(function() {
   if($('main').scrollTop() == $(window).height()) {
     $('#crew').addClass('bounceInRight animated');
     $('#weDo').addClass('bounceInLeft animated');
     $('#howIs').addClass('bounceInRight animated');
     $('.aboutBoxes').show();
   }
});
