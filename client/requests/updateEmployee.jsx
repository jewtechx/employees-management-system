export const updateEmployeeDetails = async(id) => {
    await fetch(`htt://localhost:4343/employees/${id}`,{
        method:'put',
        header:{'Content:Type':'application/json'}
    })
}