async function searchUsersByUsername(username) {
    try {
      const response = await fetch(`http://your-api-url.com/users/search?username=${encodeURIComponent(username)}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        const users = await response.json();
        console.log('Search results:', users);
        return users;
      } else if (response.status === 400) {
        console.warn('Invalid or missing username');
      } else {
        throw new Error('Failed to search users');
      }
    } catch (error) {
      console.error('Error searching users:', error);
    }
  }
  