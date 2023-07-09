// Example JavaScript code for the admin dashboard

// Execute code when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Code to run after the DOM is loaded
    // Add event listeners, perform AJAX requests, etc.
    
    // Example: Display a welcome message in the console
    console.log('Admin dashboard loaded!');
  // Fetch user data from the server
  fetch('/admin/users')
    .then(response => response.json())
    .then(data => {
      // Render the user data in the user list section
      const userList = document.getElementById('user-list');
      data.users.forEach(user => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
          <strong>Name:</strong> ${user.name} <br>
          <strong>Email:</strong> ${user.email} <br>
          <strong>Profile Image:</strong> ${user.profileImage}
        `;
        userList.appendChild(listItem);
      });
    })
    .catch(error => {
      console.error('Error retrieving user data:', error);
    });
    
    // Get the download link/button element
    const downloadLink = document.getElementById('download-link');

    // Add click event listener to trigger the download
    downloadLink.addEventListener('click', function(event) {
      event.preventDefault();

      // Send a GET request to the backend endpoint for downloading the user list
      fetch('/admin/users/download')
        .then(response => response.blob())
        .then(blob => {
          // Create a temporary download link
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = 'user-list.csv';
          a.style.display = 'none';
          document.body.appendChild(a);

          // Trigger the download
          a.click();

          // Clean up the temporary download link
          URL.revokeObjectURL(url);
          document.body.removeChild(a);
        })
        .catch(error => {
          console.error('Error downloading user list:', error);
        });
    });
  })
  .catch(error => {
    console.error('Error retrieving user data:', error);
  });
