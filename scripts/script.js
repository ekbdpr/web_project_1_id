const form = document.querySelector(".comment__section");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = document.querySelector("#username").value;
  const email = document.querySelector("#email").value;
  const comment = document.querySelector("#comment-box").value;

  if (!name || !email || !comment) {
    alert("All fields are required");
    return;
  }

  // Get the container element
  const commentContainer = document.querySelector(".comment-list");

  // Add the comment to the container
  commentContainer.innerHTML += `
    <h2 class="comment-list__username">${name} <span class="comment-list__addons">said:</span> </h2>
    <p class="comment-list__text">${comment}</p>
  `;

  // Send data to the server
  const data = { name, email, comment };
  fetch("/comments", {
    method: "POST",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json" },
  })
    .then((res) => res.json())
    .then((data) => {
      console.log("Comment added successfully", data);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
});

const resetButton = document.querySelector("#reset-button");
resetButton.addEventListener("click", (e) => {
  if (confirm("Are you sure you want to reset the form?")) {
    form.reset();
  } else {
    e.preventDefault();
  }
});
