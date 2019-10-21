$('.toast').toast({
  // autohide: false,
  delay: 10000
});

 // $('.toast').toast('show');

// Show add button on going=yes
$('input[name=Going]').change(function() {
  if(this.value == 'Yes') {
    $('#add-person').removeClass('d-none');
  }
  else {
    $('#add-person').addClass('d-none');
    $('.guest-form').remove();
    numInputs = 0;
  }
});

// Remove Guest
$('body').on('click', '.remove-guest', function() {
  $(this).closest('.guest-form').remove();
  numInputs -= 1;
  var forms = $('.guest-form');
  for(var i = 0; i < forms.length; i++) {
    var idParts = $(forms[i]).attr('id').split('-');
    var id = parseInt(idParts[2]);
    var newId = i+1;
    if(id > newId) {
      $(forms[i]).attr('id', 'rsvp-form-'+newId);
    }
  }
});

// RSVP Form
$('#submit-form').on('click', function(e) {
  e.preventDefault();

  for (var i = 0; i <= numInputs; i++)
  {
    var $form = $('form#rsvp-form-' + i), url = 'https://script.google.com/macros/s/AKfycbwJGNRBIC_PiNAODMXxxeEGaMWN83mP8xy6Gj93yv3LeQLKWvJ_/exec';
    var jqxhr = $.ajax({
        url: url,
        method: "GET",
        dataType: "json",
        data: $form.serialize(),
        beforeSend: function() {
          $('#form-spinner').removeClass('d-none');
          $('#submit-form').attr('disabled', 'true');
        },
        complete: function() {
          $('#form-spinner').addClass('d-none');
        },
        success: function (){
          $('#success-toast').toast('show');
          console.log("success!");
          $('#submit-form').attr('disabled', 'true');
          $('.guest-form').remove();
          clearInputs();
        },
        error: function () {
          $('#error-toast').toast('show');
          console.log("error");
          $('#submit-form').attr('disabled', 'false');
        }
      });
  }
})

function clearInputs() {
  $('#goingyes0').prop('checked', false);
  $('#goingno0').prop('checked', false);
}

// Generated inputs
var inputs = `
<div class="form-group row">
  <div class="col-lg-2">
    <label>Additional Guest</label>
  </div>
  <div class="col-lg-9">
    <div class="form-group row">
      <div class="col">
        <input class="form-control" type="text" name="FirstName" id="firstname" placeholder="First Name" autocomplete="off"/>
      </div>
    </div>
    <div class="form-group row">
      <div class="col">
        <input class="form-control" type="text" name="LastName" id="lastname" placeholder="Last Name" autocomplete="off"/>
      </div>
    </div>
  </div>
  <div class="col-lg-1 text-right">
    <button class="btn btn-outline-danger remove-guest" type="button" data-remove=""><i class="fas fa-times"></i></button>
  </div>
</div>
<div class="row d-none">
  <div class="col-2">Going</div>
  <div class="col-10">
    <div class="custom-control custom-radio custom-control-inline">
      <input type="radio" id="goingyes" name="Going" value="Yes" class="custom-control-input" checked>
      <label class="custom-control-label" for="goingyes">Yes</label>
    </div>
    <div class="custom-control custom-radio custom-control-inline">
      <input type="radio" id="goingno" name="Going" value="No" class="custom-control-input">
      <label class="custom-control-label" for="goingno">No</label>
    </div>
  </div>
</div>
`;

var numInputs = 0;

// Add name fields on add person
$('#add-person').on('click', function(e) {
  $("<form id='rsvp-form-" + (++numInputs) + "' class='guest-form'>" + inputs + "</form>").insertAfter("#rsvp-form-" + (numInputs-1));
  $('#rsvp-form-'+numInputs+' .remove-guest').attr('data-remove', numInputs);
})
