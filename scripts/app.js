var form = document.getElementById("submission");
        
        async function handleSubmit(event) {
          event.preventDefault();
          var status = document.getElementById("submission");
          var data = new FormData(event.target);
          fetch(event.target.action, {
            method: form.method,
            body: data,
            headers: {
                'Accept': 'application/json'
            }
          }).then(response => {
            if (response.ok) {
              status.innerHTML = "Your Message was Successfully Sent";
              form.reset()
            } else {
              response.json().then(data => {
                if (Object.hasOwn(data, 'errors')) {
                  status.innerHTML = data["errors"].map(error => error["message"]).join(", ")
                } else {
                  status.innerHTML = "Oops! There was a problem submitting your form"
                }
              })
            }
          }).catch(error => {
            status.innerHTML = "Oops! There was a problem Sending your Message"
          });
        }
        form.addEventListener("submit", handleSubmit)