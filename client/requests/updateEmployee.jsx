// In the '@/requests/updateEmployee' module
export async function updateEmployeeDetails(data) {
    try {
      // Make an API call to update the employee data on the server
      // For example, using fetch or Axios or any other HTTP client
      const response = await fetch('http://localhost:4000/employees', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
  
      if (!response.ok) {
        throw new Error('Failed to update employee details.');
      }
    } catch (error) {
      // Handle errors if any occurred during the API call
      console.error('Error updating employee details:', error);
      throw error;
    }
  }
  