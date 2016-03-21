$('.aboutBoxes').hide();
$('#ContactForm').hide();
$('#ordinancesTable').hide();

$('li').hover(function() {
  $(this).toggleClass('pulse animated');
});

$('#contact').on('click', function(event) {
  $('#ContactForm').show();
  $('#logoLanding').hide();
  $('#about').hide();
  $('#about').hide();
  $('#about').hide();
  $('#ordinancesTable').hide();
  history.pushState("contactus ","contactus","contactus");
});

$('#ordinance').on('click', function(event) {
  $('#ordinancesTable').show();
  $('#ContactForm').hide();
  $('#logoLanding').hide();
  $('#about').hide();
  $('#about').hide();
  $('#about').hide();
  history.pushState("ordinances","ordinances","ordinances");
});

$('#home').on('click', function(event) {
  window.open("index.html","_self");
});

$('#submit').on('click', function(event) {
  event.preventDefault();
  var form = $('#contactus').serializeArray();
  var object = {
    firstName: form[0].value,
    lastName: form[1].value,
    email: form[2].value,
    number: form[3].value,
    message: form[4].value
  };
  console.log(object);
  $.post('/contact', {info: object}, function(data) {
  }).done(function(data) {
    if (data.flag === true) {
      $('#form').empty();
      $('#form').append("<h1 class='formData'>"+ data.message +"</h1>");
      $('#form').append('<img class="dataImg" src="/images/dataImg.jpg">');
      $('#form').addClass('dataToCenter');
    }
    else {
      alert('working');
      $('#formTitle').html(data.message);

    }

  });
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
  $('#ordinancesTable').css('width', $width);
  $('#ordinancesTable').css('height', $height);
  if ($width > 640) {
    $('li').css('display', 'inline-block');
    $('nav').css('width', '50%');
  }
  else {
    $('li').css('display', 'none');
    $('nav').css('width', '100px');
  }
}
sizing();

$(window).resize(function(event) {
  sizing();
});

$('main').scroll(function() {
   if($('main').scrollTop() == $(window).height()) {
     $('#crew').addClass('bounceInRight animated');
     $('#weDo').addClass('bounceInLeft animated');
     $('#howIs').addClass('bounceInRight animated');
     $('.aboutBoxes').show();
   }
});

$('nav').hover(function() {
  if ($(window).width() <= 640) {
    $('li').css('display', 'inline-block');
    $('#title').css('display', 'none');
    $('nav').css({'width': '100%',
                  'background-color': 'rgba(0, 0, 0, 0.54)',
                  'color': 'white',
    });
    $('#navBurg').css({'filter': 'invert(100%)',
                      '-webkit-filter': 'invert(100%)',
                      '-moz-filter': 'invert(100%)',
                      'width': '78px'
    });
  }
}, function() {
  if ($(window).width() <= 640) {
    $('li').css('display', 'none');
    $('#title').css('display', 'block');
    $('nav').css({'width': '100px',
                  'background-color': 'rgba(0, 0, 0, 0)',
                  'color': 'black',
    });
    $('#navBurg').css({'filter': 'invert(0%)',
                      '-webkit-filter': 'invert(0%)',
                      '-moz-filter': 'invert(0%)',
                      'width': '300px'
    });
  }
});

if(window.location.href.indexOf('contactus') > -1){
  $('#ContactForm').show();
  $('#logoLanding').hide();
  $('#about').hide();
  $('#about').hide();
  $('#about').hide();
  $('#ordinancesTable').hide();
}

if(window.location.href.indexOf('ordinances') > -1){
  $('#ordinancesTable').show();
  $('#ContactForm').hide();
  $('#logoLanding').hide();
  $('#about').hide();
  $('#about').hide();
  $('#about').hide();
}
