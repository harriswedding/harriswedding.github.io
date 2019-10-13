

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
        success: function (){
          console.log("success!")
        }
      });
  }
})

var inputs = `
<div class="form-group row">
  <label class="col-sm-2 col-form-label" for="#firstname">First Name</label>
  <div class="col-sm-10">
    <input class="form-control" type="text" name="FirstName" id="firstname" placeholder="First Name"/>
  </div>
</div>

<div class="form-group row">
  <label class="col-sm-2 col-form-label" for="#lastname">Last Name</label>
  <div class="col-sm-10">
    <input class="form-control" type="text" name="LastName" id="lastname" placeholder="Last Name"/>
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

$('#add-person').on('click', function(e) {
  $("<form id='rsvp-form-" + (++numInputs) + "' class='text-left'>" + inputs + "</form>").insertAfter("#rsvp-form-" + (numInputs-1));

})
