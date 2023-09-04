import { useRouter } from "next/navigation";
import { useSelector } from "react-redux"

export const deleteEmployee = async(id) => {
    const token = useSelector((state) => state.auth.token)

    const empid = id;
    const confirmed = window.confirm(`Are you sure you want to delete this employee - id : ${empid.split('-')[0]}?`);
    
    if (confirmed) {

      try {
        fetch(`http://localhost:4000/employees/${empid}`, {
          method: 'delete',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          }
        });
        window.location.reload();

    } catch (err) {
        alert('Error deleting employee');
      }

    }
    
}