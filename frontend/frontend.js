var editFormData;

function getFormData() {
    return {
      firstName:document.getElementById("firstName").value,
      lastName:document.getElementById("lastName").value
    }
}
function clearFormData() {
        document.getElementById("firstName").value = "";
        document.getElementById("lastName").value = "";
}

function setFormData(firstName,lastName) {
    document.getElementById("firstName").value = firstName;
    document.getElementById("lastName").value = lastName;
}

// set the message for form status
function setSuccessMessage(message) {
    document.getElementById("message").innerHTML = message;
}
function editDataCall(id) {
    // call get user details by id API
    fetch("http://localhost:8000/api//todo/"+ id,{
        method:"GET"
    }).then((res)=>res.json()).then((response)=>{
        //console.log("Edit info",response);
        //editFormData =  response[0];
        editFormData = response
        setFormData(editFormData.firstName,editFormData.lastName)

    })
}

// callled this function when user click on button
function submitForm() {
            addUser();
        //if(!editFormData()) {addUser();} // if the editFormData is undefined then call addUser()
        //else {editData();}
}
function EditForm(){
    editData();
}
// add user function 
function addUser() {
        let payload  = getFormData();
        fetch("http://localhost:8000/api/create/list",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(payload)
        }).then((res)=>res.json()).then((response)=>{
            setSuccessMessage(response.message)
                // clear input email and name
                clearFormData();
                getData(); // reload table 
        })
}

// edit data 
function editData() {
    var formData = getFormData();
    formData['id'] = editFormData.id; // get _id from selected user
        fetch("http://localhost:8000/api/update/todo/"+editFormData.id,{
            method:"PUT",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(formData)
        }).then((res)=>res.json()).then((response)=>{
            setSuccessMessage(response.message)
                clearFormData(); // clear the form field
                getData() // reload the table
        })
}

// delete data
function deleteData(id) {
    fetch("http://localhost:8000/api/delete/todo/"+id,{
      method: 'DELETE',
    }).then((res)=>res.json()).then(
        (response)=>{
            setSuccessMessage(response.message);
            getData();
        }
    )
}

// get data method
  
function getData() {
                fetch("http://localhost:8000/api//show/todos").then(
                    (res)=>res.json()
                ).then((response)=>{
                    var tmpData  = "";
                    console.log(response);
                    response.forEach((user)=>{
                        tmpData+="<tr>"
                        tmpData+="<td>"+user.id+"</td>";
                        tmpData+="<td>"+user.firstName+"</td>";
                        tmpData+="<td>"+user.lastName+"</td>";
                        tmpData+="<td><button class='btn btn-primary' onclick='editDataCall(`"+user.id+"`)'>Edit</button></td>";
                        tmpData+="<td><button class='btn btn-danger' onclick='deleteData(`"+user.id+"`)'>Delete</button></td>";

                        tmpData+="</tr>";
                    })
                    document.getElementById("tbData").innerHTML = tmpData;
                })     
        }

        getData();