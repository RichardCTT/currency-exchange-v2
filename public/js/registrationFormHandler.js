document.getElementById('userForm').addEventListener('submit', function(e) {
    e.preventDefault();
  
    const formData = new FormData(this);
    const data = {
      username: formData.get('username'),
      email: formData.get('email'),
      password: formData.get('password')
    };
  
    fetch('http://127.0.0.1:3000/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(response => {
      if (!response.ok) throw new Error('Network response was not OK');
      return response.json();
    })
    .then(result => {
      alert('Successfully registered!');
      e.target.reset();
    })
    .catch(error => {
      console.error('Error:', error);
      alert('Something went wrong.');
    });
  });
  