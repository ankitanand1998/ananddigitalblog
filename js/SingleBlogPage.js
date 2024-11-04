// Function to get URL parameters
function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

// Get the filename parameter from the URL
const filename1 = getQueryParam('filename');

// Define the API endpoint
const apiUrl = "https://script.google.com/macros/s/AKfycbyTeFAgDzL3ry8LbQm4IJC-CbZgz1gZ5XZ2dhB7r9tRZChj87_hnijS3b_AULLwoQ7r8w/exec";

// Fetch data from the API
async function fetchSpecificBlogPost() {
    // Show loading message
    document.getElementById('loadingMessage').style.display = 'block';
    document.getElementById('content').style.display = 'none';

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        
        // Filter data to find the item that matches the specified filename
        const specificPost = data.find(item => item.filename === filename1);

        if (specificPost) {
            document.getElementById('blog_category').textContent = specificPost.category;
            document.getElementById('blog_heading').textContent = specificPost.heading;
            document.getElementById('blog_date').textContent = specificPost.date;
            document.getElementById('paragraph1').textContent = specificPost.paragraph1;
            document.getElementById('banner_image').src = specificPost.bannerImg;
            document.getElementById('paragraph2').textContent = specificPost.paragraph2;
            document.getElementById('authername').textContent = specificPost.author;
            document.getElementById('meta-title').content = specificPost.metaTitle;
            document.getElementById('meta-keywords').content = specificPost.keywords;
            document.getElementById('meta-description').content = specificPost.metaDescription;
            document.getElementById('canonical-url').href = specificPost.canonicalUrl;
            document.getElementById('og-title').content = specificPost.ogTitle;
            document.getElementById('og-description').content = specificPost.ogDescription;
            document.getElementById('og-image').content = specificPost.bannerImg;
            document.getElementById('og-url').content = specificPost.ogUrl;

            console.log("Fetched specific post:", specificPost);

            // Hide loading message and show content
            document.getElementById('loadingMessage').style.display = 'none';
            document.getElementById('content').style.display = 'block';
        } else {
            console.error("No matching post found for the specified filename.");
        }
    } catch (error) {
        console.error("Error fetching specific blog post:", error);
    }
}

// Call the function to fetch and log the blog data
fetchSpecificBlogPost();
