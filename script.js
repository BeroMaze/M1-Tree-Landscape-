$('.aboutBoxes').hide();
$('#ContactForm').hide();
$('#ordinancesTable').hide();
$('#quoteForm').hide();
var imageUploaded;

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
  $('#submit').unbind("click");
  $('#submit').css('opacity', '.3');
  var form = $('#contactus').serializeArray();
  // console.log(form);
  var object = {
    firstName: form[0].value,
    lastName: form[1].value,
    email: form[2].value,
    number: form[3].value,
    message: form[4].value
  };
  if ((object.firstName.length >= 2) && (object.lastName.length >= 2) && (object.number.length >= 10) && (object.message.length >= 2) && (document.getElementById('email').checkValidity())) {
    $.post('/contact', {info: object}, function(data) {
    }).done(function(data) {
      if (data.flag === true) {
        $('#form').empty();
        $('#form').append("<h1 class='formData'>"+ data.message +"</h1>");
        $('#form').append('<img class="dataImg" src="/images/dataImg.jpg">');
        $('#form').addClass('dataToCenter');
      }
      else {
        $('#formTitle').html(data.message);

      }
    });
  }
  else {
    alert('Please fill out form completely.');
  }
});

$(":file").change(function () {
    if (this.files && this.files[0]) {
      var reader = new FileReader();
      reader.onload = imageIsLoaded;
      reader.readAsDataURL(this.files[0]);
    }
});
function imageIsLoaded(e) {
    imageUploaded = e.target.result;
    // console.log(imageUploaded);
    $('#thumb').attr('src', e.target.result);
    // console.log(e);
}


$('#submitQ').on('click', function(event) {
  event.preventDefault();
  $('#submitQ').unbind("click");
  $('#submitQ').css('opacity', '.3');
  var form = $('#quoteF').serializeArray();
  var object = {
    firstName: form[0].value,
    lastName: form[1].value,
    email: form[2].value,
    number: form[3].value,
    streetAdress: form[4].value,
    cityState: form[5].value,
    zipCode: form[6].value,
    needed: $('#selestQ').val(),
    pic: imageUploaded,
    message: form[7].value
  };
  // console.log(object.firstName.length);
  if ((object.firstName.length >= 2) && (object.lastName.length >= 2) && (object.number.length >= 10) && (object.streetAdress.length >= 2) && (object.cityState.length >= 2) && (object.zipCode.length >= 4) && (object.message.length >= 2) && (document.getElementById('emailQ').checkValidity())) {
    $.post('/quote', {info: object}, function(data) {
    }).done(function(data) {
      if (data.flag === true) {
        $('#formQ').empty();
        $('#formQ').append("<h1 class='formData'>"+ data.message +"</h1>");
        $('#formQ').append('<img class="dataImg" src="/images/dataImg.jpg">');
        $('#formQ').addClass('dataToCenter');
        $('.formData').css('margin-top', '6px');
        $('.formData').css('margin-bottom', '6px');
      }
      else {
        $('#formTitle').html(data.message);

      }
    });
  }
  else {
    alert('Please fill out form completely.');
  }
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
    //  console.log('to top');
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
