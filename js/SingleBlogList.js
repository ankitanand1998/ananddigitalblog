// API endpoint URL
const apiUrl = "https://script.google.com/macros/s/AKfycbyb9BCYJHvrpUH5RtXTPh2cEWyuDXRyIaJ4wI6xfhKorVgjju591AEd6s5llQOrPTaa-w/exec";

// Function to fetch data and populate the blog cards
async function fetchBlogData() {
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    const blogCardsContainer = document.getElementById("blogCardsContainer");

    // Loop through each item in the data array and create blog cards
    data.forEach(item => {
      const blogCard = document.createElement("div");
      blogCard.classList.add("blog-card");

      blogCard.innerHTML = `
        <div class="blog-card-banner">
          <img src="${item.bannerImg}" alt="${item.heading}" width="250" class="blog-banner-img" />
        </div>
        <div class="blog-content-wrapper">
          <button class="blog-topic text-tiny">${item.category}</button>
          <h3>
           
          <a href="'singlepost.html?filename=${item.filename}'" class="h3" onclick="redirectToSinglePost('${item.filename}')">${item.heading}</a>
          </h3>
          <p class="blog-text">${item.description}</p>
          <div class="wrapper-flex">
            <div class="profile-wrapper">
              <img src="${item.bannerImg}" alt="" width="50" />
            </div>
            <div class="wrapper">
              <a href="#" class="h4">${item.author}</a>
              <p class="text-sm">
                <time datetime="${item.date}">${new Date(item.date).toDateString()}</time>
                <span class="separator"></span>
                <ion-icon name="time-outline"></ion-icon>
                <time datetime="PT${item.readingTime}M">${item.readingTime} min</time>
              </p>
            </div>
          </div>
        </div>
      `;

      document.getElementById('loadingMessage').style.display = 'none';
    document.getElementById('blogListContainer').style.display = 'block';
      // Append the blog card to the container
      blogCardsContainer.appendChild(blogCard);
    });
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

// Function to redirect to singlepost.html with filename as part of the URL
function redirectToSinglePost(filename) {
  // Redirect to singlepost.html with the filename as a query parameter

  
  window.location.href = `singlepost.html?filename=${encodeURIComponent(filename)}`;
}
// Call the function to fetch and display blog data
fetchBlogData();