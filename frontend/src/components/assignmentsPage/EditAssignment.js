import React, { useState , useEffect} from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

const EditTaskPopup = ({modal, toggle, updateTask, assignmentObj}) => {
    const [subjectName, setSubjectName] = useState('');
    const [subjectDueDate, setSubjectDueDate] = useState('');
    const [subjectStatus, setSubjectStatus] = useState('');
    const [subjectProgress, setSubjectProgress] = useState('');
    const [subjectDescription, setSubjectDescription] = useState('');

    const handleChange = (e) => {
        const {name, value} = e.target;

        if (name === 'subjectName') {
            setSubjectName(value);
        } else if (name === 'subjectDueDate') {
            setSubjectDueDate(value);
        } else if (name === 'subjectStatus') {
            setSubjectStatus(value);
        } else if (name === 'subjectProgress') {
            setSubjectProgress(value);
        } else{
            setSubjectDescription(value);
        }
    }


    useEffect(() => {
        setSubjectName(assignmentObj.Name);
        setSubjectDueDate(assignmentObj.DueDate);
        setSubjectStatus(assignmentObj.Status);
        setSubjectProgress(assignmentObj.Progress);
        setSubjectDescription(assignmentObj.Description);
    }
    , [assignmentObj]);
    
    const handleUpdate = (e) => {
        e.preventDefault();
        let assignmentObj = {}
        assignmentObj['Name'] = subjectName
        assignmentObj['DueDate'] = subjectDueDate
        assignmentObj['Status'] = subjectStatus
        assignmentObj['Progress'] = subjectProgress
        assignmentObj['Description'] = subjectDescription
        updateTask(assignmentObj)
    }

    return (
        <Modal isOpen={modal} toggle={toggle}>
            <ModalHeader toggle={toggle}>Update Task</ModalHeader>
            <ModalBody>
            <form>
            <div className="form-group">
                <label>Subject Name</label>
                <input type= "text" className="form-control" value={subjectName} onChange={handleChange} name="subjectName"/>
            </div>

            <div className="form-group">
                <label>Due Date</label>
                <input type= "date" className="form-control" value={subjectDueDate} onChange={handleChange} name="subjectDueDate"/>
            </div>

            <div>
                <label>Status</label>
                <select className="form-control" value={subjectStatus} onChange={handleChange} name="subjectStatus">
                    <option>Done</option>
                    <option>Not Done</option>
                </select>
            </div>

            <div>
                <label>Progress</label>
                <select className="form-control" value={subjectProgress} onChange={handleChange} name="subjectProgress">
                    <option>0</option>
                    <option>10</option>
                    <option>20</option>
                    <option>30</option>
                    <option>40</option>
                    <option>50</option>
                    <option>60</option>
                    <option>70</option>
                    <option>80</option>
                    <option>90</option>
                    <option>100</option>
                </select>
            </div>

            <div className="form-group">
                <label>Assignment description</label>
            <textarea rows ="5" className="form-control" value={subjectDescription} onChange={handleChange} name="subjectDescription">
            </textarea>
            </div>
                    


        </form>
            </ModalBody>
            <ModalFooter>
            <Button color="primary" onClick={handleUpdate}>Update</Button>{' '}
            <Button color="secondary" onClick={toggle}>Cancel</Button>
            </ModalFooter>
      </Modal>
    );
};

export default EditTaskPopup