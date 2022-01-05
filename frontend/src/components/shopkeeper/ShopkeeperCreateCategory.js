import {useState} from "react";
import {Button, Form, Modal} from "react-bootstrap";
import {initiateCreateCategory} from "../../modules/shopkeeper";
import {useDispatch} from "react-redux";


function ShopkeeperCreateCategory({showCreateCategory, setShowCreateCategory}) {
    const [categoryName, setCategoryName] = useState();
    const dispatch = useDispatch();

    function handleClose() {
        setShowCreateCategory(false)
    }

    function handleSubmit(e) {
        e.preventDefault()
        setShowCreateCategory(false)
        const newCategory = {
            categoryName: categoryName
        }
        dispatch(initiateCreateCategory(newCategory))
        setCategoryName('')
    }


    return (
        <Modal show={showCreateCategory} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Create New Category</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Label>Category Name</Form.Label>
                    <Form.Control type='text' placeholder='Category Name' value={categoryName} onChange={(e) => setCategoryName(e.target.value)}/>
                    <Button variant='primary' type='submit'>Create</Button>
                </Form>
            </Modal.Body>
        </Modal>

    )

}

export default ShopkeeperCreateCategory