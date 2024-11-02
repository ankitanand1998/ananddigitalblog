async function fetchMetaDetails() {
      try {
        const response = await fetch('https://script.google.com/macros/s/AKfycbwTWjzU0HImPek4PkTiU2J9eweGQhsCfeM5K-C8s6_IfbLMExIRUBwd1eWq0eWMaeykpQ/exec'); // Replace with your API URL
        const data = await response.json();
        const cleanData = {
        title: data[0]['"title"'],
        description: data[0]['"description"'],
        keywords: data[0]['"keywords"'],
        ogTitle: data[0]['"ogTitle"'],
        ogDescription: data[0]['"ogDescription"'],
        canonicalUrl: data[0]['"canonicalUrl"'],
        ogUrl: data[0]['"ogUrl"']
       };

    console.log(cleanData);

        // Update meta tags dynamically
        document.title = cleanData.title || document.title;
       
       

       document.querySelector('meta[name="description"]').setAttribute("content", cleanData.description || "");
        document.querySelector('meta[name="keywords"]').setAttribute("content", cleanData.keywords || "");
        document.querySelector('meta[property="og:title"]').setAttribute("content", cleanData.ogTitle || "");
        document.querySelector('meta[property="og:description"]').setAttribute("content", cleanData.ogDescription || "");

        // Set canonical URL and og:url
        const canonicalUrl = document.getElementById('canonical-url');
        canonicalUrl.setAttribute('href', cleanData.canonicalUrl || canonicalUrl.getAttribute('href'));

        document.querySelector('meta[property="og:url"]').setAttribute('content', cleanData.ogUrl || canonicalUrl.getAttribute('href'));

        
      } catch (error) {
        console.error('Error fetching meta details:', error);
      }
    }

    // Call the function to fetch and set meta details
    fetchMetaDetails();

 