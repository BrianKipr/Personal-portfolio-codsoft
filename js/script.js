document.addEventListener("DOMContentLoaded", function() {
  var form = document.getElementById("form");

  async function handleSubmit(event) {
      event.preventDefault();
      var status = document.getElementById("my-form-status");
      var data = new FormData(event.target);
      var name = document.getElementById("name").value;

      try {
          let response = await fetch(event.target.action, {
              method: form.method,
              body: data,
              headers: {
                  'Accept': 'application/json'
              }
          });

          if (response.ok) {
              alert(`${name}, I have received your message. Thank you for reaching out.`);
              form.reset();
          } else {
              let result = await response.json();
              if (result.errors) {
                  status.innerHTML = result.errors.map(error => error.message).join(", ");
              } else {
                  status.innerHTML = "Oops! There was a problem submitting your form.";
              }
          }
      } catch (error) {
          status.innerHTML = "Oops! There was a problem submitting your form.";
      }
  }

  form.addEventListener("submit", handleSubmit);
});
