async function getUserProfile(userId) {
    try {
      const response = await fetch(`http://your-api-url.com/users/${userId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        const data = await response.json();
        console.log('User Profile:', data);
        return data;
      } else if (response.status === 404) {
        console.warn('User not found');
      } else {
        throw new Error('Failed to fetch user profile');
      }
    } catch (error) {
      console.error('Error fetching user profile:', error);
    }
  }
  