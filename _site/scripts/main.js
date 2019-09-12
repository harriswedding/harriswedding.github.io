

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
<div>
  <label>First Name</label>
  <input type="text" name="FirstName" placeholder="First Name"/>
</div>

<div>
  <label>Last Name</label>
  <input type="text" name="LastName" placeholder="Last Name"/>
</div>

<div class="d-none">
  <label>Going?</label>
  Yes: <input type="radio" name="Going" value="Yes" checked>
  No: <input type="radio" name="Going" value="No">
</div>
`;

var numInputs = 0;

$('#add-person').on('click', function(e) {
  $("<form id='rsvp-form-" + (++numInputs) + "'>" + inputs + "</form>").insertAfter("#rsvp-form-" + (numInputs-1));

})