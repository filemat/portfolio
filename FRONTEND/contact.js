document.querySelector("form").addEventListener("submit", async function (e) {
  e.preventDefault();

  const fullName = document.getElementById("fullName").value;
  const emailName = document.getElementById("emailName").value;
  const messageContent = document.getElementById("messageContent").value;

  try {
    const response = await fetch("http://localhost:3000/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ fullName, emailName, messageContent }),
    });

    const result = await response.json();

    if (response.ok) {
      alert("Message sent successfully!");
      document.querySelector("form").reset();
    } else {
      alert(result.error || "Something went wrong.");
    }
  } catch (error) {
    alert("Something went wrong.");
    console.error(error);
  }
});