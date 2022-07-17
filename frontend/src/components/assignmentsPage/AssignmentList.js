/*Create a React App to display the following content
The Assignment page should: 
- Have an input bar to enter a new assignment
- Have a list of assignments
- Have a button to delete an assignment
- Have a button to clear all assignments
- Have a button to save all assignments


When assignments are displayed they should have:
-Assignment name
-Assignment description
-Assignment due date
-Assignment status (done or not done)
-Assignment progress (0-100)
-Assignment Description

The user should be able to comment on each assignment.
*/
import React, {useEffect, useState} from 'react';
import CreateAssignment from './CreateAssignment';
import Card from './Card';



const AssignmentList = () => {
  const [modal, setModal] = React.useState(false);
  const[assignmentList, setAssignmentList] = useState([]);

  useEffect(() => {
    let arr = localStorage.getItem('assignmentList');
    if(arr){
      let obj = JSON.parse(arr);
      setAssignmentList(obj);
    }
  }, []);

  const deleteAssignment = (index) => {
    let tempList = assignmentList
    tempList.splice(index, 1)
    localStorage.setItem("assignmentList", JSON.stringify(tempList))
    setAssignmentList(tempList)
    window.location.reload()
}

const updateListArray = (obj, index) => {
    let tempList = assignmentList
    tempList[index] = obj
    localStorage.setItem("assignmentList", JSON.stringify(tempList))
    setAssignmentList(tempList)
    window.location.reload()
}

  const toggle = () => {setModal(!modal);
  }
  const saveAssignment = (assignmentObj) => {
    let tempList = assignmentList;
    tempList.push(assignmentObj);
    localStorage.setItem('assignmentList', JSON.stringify(tempList));
    setAssignmentList(tempList);
    setModal(false)
  
  }

    
    return (
    <>
    <div className="header text-center">
      <input type="text" placeholder="Input subject" ></input>
      <button className = "btn btn-primary mt-2" onClick = {() => setModal(true)} >+</button>
    </div>

    <div className="subject-container">
      {assignmentList && assignmentList.map((obj, index) => <Card assignmentObj= {obj} index = {index} deleteAssignment={deleteAssignment} updateListArray = {updateListArray}/>)}
    </div>
    <CreateAssignment toggle = {toggle} modal={modal} save = {saveAssignment}/>
    </>
  
    );
   }
export default AssignmentList;