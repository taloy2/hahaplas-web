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
                <p class="card-text">Price: ₱${product.product_price}</p> <!-- Changed $ to ₱ -->
                <p class="card-text">Date Added: ${product.product_dateAdded}</p>
                <button class="btn btn-primary" onclick="addToCart('${product.product_name}', this)">Add to Cart</button>
                <span id="clickCount_${product.product_name}">0</span> Clicks
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

function addToCart(productName, buttonElement) {
  // Get the span element for this product
  const clickCountSpan = document.getElementById(`clickCount_${productName}`);
  
  // Increment the click count
  let clickCount = parseInt(clickCountSpan.textContent);
  clickCount++;
  
  // Update the click count in the span element
  clickCountSpan.textContent = clickCount + " ";

  // Here, you can add the logic to add the product to the cart
}
