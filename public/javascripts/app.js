
/*!
 * Express Project v1.0
 * Name : kumari shelja
 * Student Id: 301296403
 * Date : Febraury 7, 2023
 */


// Function to Handle form submission 
$( document ).ready(function() {


$("#formsubmitted").submit(function (event) {
    alert("Your message was sent, thank you!");
    document.location = '/';
    event.preventDefault();
});



$(".delete").click(function(e) {

    var id = $(this).val();

    $.ajax({
        type: "DELETE",
        url: "/delete/"+id,
        success: function(result) {
            alert('Deleted Successfully');
            location.reload();
        },
        error: function(result) {
            alert('error');
        }
    });
});












});