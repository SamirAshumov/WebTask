function fetchBooks(keyword) {
    fetch(`https://www.googleapis.com/books/v1/volumes?q=${keyword}&maxResults=40`)
      .then(response => response.json())
      .then(data => {
        document.getElementById('bookRow').innerHTML = '';
        data.items.forEach(item => {
          const { title, authors, description } = item.volumeInfo;
          const thumbnail = item.volumeInfo.imageLinks?.thumbnail || 'https://via.placeholder.com/128x192.png?text=No+Image';
          const truncatedDescription = description ? (description.length > 200 ? `${description.substring(0, 200)}...` : description) : 'No description available';
          const cardHtml = `
            <div class="col-md-3 mb-4">
              <div class="card h-100">
                <img src="${thumbnail}" class="card-img-top" alt="Book Cover">
                <div class="card-body">
                  <h5 class="card-title">${title}</h5>
                  <p class="card-text">${truncatedDescription}</p>
                  <p class="card-text"><small class="text-muted">Author(s): ${authors ? authors.join(', ') : 'Unknown'}</small></p>
                </div>
              </div>
            </div>
          `;
          document.getElementById('bookRow').innerHTML += cardHtml;
        });
      })
  }
  
  document.getElementById('searchForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const keyword = document.getElementById('searchInput').value.trim();
    if (keyword !== '') {
      fetchBooks(keyword);
    }
  });
  
  fetchBooks('Programming');
  