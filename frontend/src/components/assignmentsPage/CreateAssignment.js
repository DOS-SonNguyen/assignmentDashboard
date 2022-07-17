import React, {useState} from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

const CreateAssignment = ({modal,toggle,save}) => {
    const [subjectName, setSubjectName] = useState('');
    const [subjectDueDate, setSubjectDueDate] = useState('');
    const [subjectStatus, setSubjectStatus] = useState('');
    const [subjectProgress, setSubjectProgress] = useState('');
    const [subjectDescription, setSubjectDescription] = useState('');

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;

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

    const handleSave = (e) => {
        e.preventDefault();
        let assignmentObj = {}
        assignmentObj['Name'] = subjectName
        assignmentObj['DueDate'] = subjectDueDate
        assignmentObj['Status'] = subjectStatus
        assignmentObj['Progress'] = subjectProgress
        assignmentObj['Description'] = subjectDescription
        save(assignmentObj)
    }



    return (
    <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Create Assignment</ModalHeader>
        <ModalBody>
        </ModalBody>
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
        <ModalFooter>
          <Button color="primary" onClick={handleSave}>Create</Button>{' '}
          <Button color="secondary" onClick={toggle}>Cancel</Button>
        </ModalFooter>
      </Modal>
    );
}

export default CreateAssignment
