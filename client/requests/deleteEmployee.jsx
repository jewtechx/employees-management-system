import { useRouter } from "next/navigation";


export const deleteEmployee = async(id) => {

    const empid = Number(id);
    const confirmed = window.confirm('Are you sure you want to delete this employee?');
    
    if (confirmed) {

      try {
        fetch(`http://localhost:4343/employees/${empid}`, {
          method: 'delete',
          headers: {
            'Content-Type': 'application/json'
          }
        });
        window.location.reload();

    } catch (err) {
        alert('Error deleting employee');
      }

    }
    
}