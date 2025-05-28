document.querySelector("form").addEventListener("submit", async function (e) {
  e.preventDefault();

  const fullName = document.getElementById("fullName").value;
  const emailName = document.getElementById("emailName").value;
  const messageContent = document.getElementById("messageContent").value;

  const captchaToken = grecaptcha.getResponse();
  if (!captchaToken) {
    alert("Please verify that you are not a robot!");
    return;
  }

  try {
    const response = await fetch("https://portfolio-backend-2gbm.onrender.com/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ fullName, emailName, messageContent, captchaToken}),
    });

    const result = await response.json();

    if (response.ok) {
      const successfullSend = document.querySelector(".message-status-container");
      successfullSend.style.display = "block";
      successfullSend.innerHTML = "<p>Message sent successfully!</p>";
      successfullSend.classList.add("show")

      setTimeout(() => {
        successfullSend.style.display = "none";
        successfullSend.innerHTML = "";
      }, 5000);

      document.querySelector("form").reset();
      grecaptcha.reset();
    } else {
      alert(result.error || "Something went wrong.");
    }
  } catch (error) {
    alert("Something went wrong.");
    console.error(error);
  }
});