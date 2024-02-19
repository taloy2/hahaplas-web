//Json
fetch('data.json')
  .then(response => response.json())
  .then(data => {
    // Loop through categories
    data.forEach(category => {
      const productListElement = document.getElementById(`${category.category}ProductList`);

      // Loop through products in the category
      category.products.forEach(product => {
        const productItem = document.createElement("div");
        productItem.classList.add('col-md-4', 'mb-4'); 

        // Generate HTML for each product
        productItem.innerHTML = `
          <div class="card">
            <img src="${product.img}" class="card-img-top product-image" alt="${product.product_name}">
            <div class="card-body">
              <h5 class="card-title">${product.product_name}</h5>
              <p class="card-text">Price: $${product.product_price}</p>
              <p class="card-text">Date Added: ${product.product_dateAdded}</p>
              <button class="btn btn-primary" onclick="addToCart('${product.product_name}')">Add to Cart</button>
              <span>0</span> Clicks
            </div>
          </div>
        `;

        // Append the product to the category section
        productListElement.appendChild(productItem);
      });
    });
  })
  .catch(error => console.error('Error fetching data:', error));

// Navigate to a specific page
function navigateTo(page) {
  // Hide all content sections
  const contentSections = document.querySelectorAll('main');
  contentSections.forEach(section => {
      section.style.display = 'none';
  });

  // Show the selected content section
  const selectedSection = document.getElementById(`${page}ProductList`);
  selectedSection.style.display = 'block';

  // Fetch and render data for the selected section
  fetchDataAndRender(page);
}

// Initial navigation to the home page
navigateTo('home');

// Define addToCart function globally
function addToCart(productName) {
  let clickCount = parseInt(document.getElementById(`clickCount${productName}`).innerText);
  clickCount++;
  document.getElementById(`clickCount${productName}`).innerText = clickCount;
}
