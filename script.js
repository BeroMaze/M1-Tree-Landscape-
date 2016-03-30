$('.aboutBoxes').hide();
$('#ContactForm').hide();
$('#ordinancesTable').hide();
$('#quoteForm').hide();

$('li').hover(function() {
  $(this).toggleClass('pulse animated');
});

$('#contact').on('click', function(event) {
  $('#ContactForm').show();
  $('#logoLanding').hide();
  $('#about').hide();
  $('#ordinancesTable').hide();
  $('#quoteForm').hide();
  history.pushState("contactus ","contactus","contactus");
});

$('#quote').on('click', function(event) {
  $('#quoteForm').show();
  $('#ContactForm').hide();
  $('#logoLanding').hide();
  $('#about').hide();
  $('#ordinancesTable').hide();
  history.pushState("quoteit","quoteit","quoteit");
});

$('#ordinance').on('click', function(event) {
  $('#ordinancesTable').show();
  $('#ContactForm').hide();
  $('#logoLanding').hide();
  $('#about').hide();
  $('#quoteForm').hide();
  history.pushState("ordinances","ordinances","ordinances");
});


$('#aboutUs').on('click', function(event) {
  $('#about').show();
  $('#crew').addClass('bounceInRight animated');
  $('#weDo').addClass('bounceInLeft animated');
  $('#howIs').addClass('bounceInRight animated');
  $('.aboutBoxes').show();
  $('#ordinancesTable').hide();
  $('#ContactForm').hide();
  $('#logoLanding').hide();
  $('#quoteForm').hide();
  history.pushState("aboutus","aboutus","aboutus");
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

var imageUploaded;
var filname;

$('input[type="file"]').change(function(){
  var f = this.files[0];
  var name = f.name;
  imageUploaded = $(this)[0].value;
  filename = imageUploaded.replace(/^.*\\/, "");
  console.log(f);
  console.log(name);
  console.log(filename);
});

$('#submitQ').on('click', function(event) {
  event.preventDefault();
  var form = $('#quoteF :input').serializeArray();
  var object = {
    firstName: form[0].value,
    lastName: form[1].value,
    email: form[2].value,
    number: form[3].value,
    streetAdress: form[4].value,
    cityState: form[5].value,
    zipCode: form[6].value,
    needed: $('#selestQ').val(),
    pic: filename,
    message: form[7].value

  };
  console.log(object);
  $.post('/quote', {info: object}, function(data) {
  }).done(function(data) {
    // if (data.flag === true) {
    //   $('#form').empty();
    //   $('#form').append("<h1 class='formData'>"+ data.message +"</h1>");
    //   $('#form').append('<img class="dataImg" src="/images/dataImg.jpg">');
    //   $('#form').addClass('dataToCenter');
    // }
    // else {
    //   alert('working');
    //   $('#formTitle').html(data.message);
    //
    // }

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
  if ($width < 500) {
    $("#title").html('M1<br>TREE AND LANDSCAPE LLC');
  }
}
sizing();

$(window).resize(function(event) {
  sizing();
});

$('main').scroll(function() {
   if($('main').scrollTop() === $(window).height()) {
     $('#crew').addClass('bounceInRight animated');
     $('#weDo').addClass('bounceInLeft animated');
     $('#howIs').addClass('bounceInRight animated');
     $('.aboutBoxes').show();
     history.pushState("aboutUs","aboutUs","aboutUs");
   }
});
$('main').scroll(function() {
   if($('main').scrollTop() === 0){
     $('#crew').removeClass('bounceInRight animated');
     $('#weDo').removeClass('bounceInLeft animated');
     $('#howIs').removeClass('bounceInRight animated');
     $('.aboutBoxes').hide();
     history.pushState("home","home","home");
     console.log('to top');
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

if((window.location.href.indexOf('contactus') > -1)||(window.location.href.indexOf('contactUs') > -1)){
  $('#ContactForm').show();
  $('#logoLanding').hide();
  $('#about').hide();
  $('#ordinancesTable').hide();
  $('#quoteForm').hide();
}

if(window.location.href.indexOf('ordinances') > -1){
  $('#ordinancesTable').show();
  $('#ContactForm').hide();
  $('#logoLanding').hide();
  $('#about').hide();
  $('#quoteForm').hide();
}
if((window.location.href.indexOf('aboutus') > -1) || (window.location.href.indexOf('aboutUs') > -1)){
  $('#about').show();
  $('#crew').addClass('bounceInRight animated');
  $('#weDo').addClass('bounceInLeft animated');
  $('#howIs').addClass('bounceInRight animated');
  $('.aboutBoxes').show();
  $('#ordinancesTable').hide();
  $('#ContactForm').hide();
  $('#logoLanding').hide();
  $('#quoteForm').hide();
}

if((window.location.href.indexOf('quoteit') > -1) || (window.location.href.indexOf('quoteit') > -1)){
  $('#quoteForm').show();
  $('#about').hide();
  $('#crew').addClass('bounceInRight animated');
  $('#weDo').addClass('bounceInLeft animated');
  $('#howIs').addClass('bounceInRight animated');
  $('.aboutBoxes').show();
  $('#ordinancesTable').hide();
  $('#ContactForm').hide();
  $('#logoLanding').hide();
}
