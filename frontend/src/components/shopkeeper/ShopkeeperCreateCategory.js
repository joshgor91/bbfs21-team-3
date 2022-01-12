import {useEffect, useState} from "react";
import {Button, Form, Modal} from "react-bootstrap";
import {initiateCreateCategory, initiateEditCategory} from "../../modules/shopkeeper";
import {useDispatch} from "react-redux";
import {connect} from "react-redux";


function ShopkeeperCreateCategory({showCreateCategory, setShowCreateCategory, categories, categoryId, isEditing, setIsEditing, dispatch}) {
    const [categoryName, setCategoryName] = useState('');

    useEffect(() => {
        // console.log(`useEffect in createCat`)
        if (isEditing) {
            setCategoryName(categories.filter(category => category.id === categoryId)[0].categoryName)
        }
    }, [isEditing])

    function handleClose() {
        setShowCreateCategory(false)
        setIsEditing(false)
    }

    function handleSubmit(e) {
        e.preventDefault()
        // console.log(`logging categoryName = ${categoryName}`)
        if (isEditing) {
            const updatedCategory = {
                id: categoryId,
                categoryName: categoryName
            }
            dispatch(initiateEditCategory(updatedCategory))
            setCategoryName('')
        } else {
            const newCategory = {
                categoryName: categoryName
            }
            dispatch(initiateCreateCategory(newCategory))
            setCategoryName('')
        }
        setShowCreateCategory(false)
        setIsEditing(false)
    }


    return (
        <Modal show={showCreateCategory || isEditing} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Create New Category</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Label>Category Name</Form.Label>
                    <Form.Control required type='text' placeholder='Category Name' value={categoryName} onChange={(e) => setCategoryName(e.target.value)}/>
                    <Button variant='primary' type='submit' className={'m-2 text-white'}>{isEditing ? 'Apply' : 'Create'}</Button>
                </Form>
            </Modal.Body>
        </Modal>

    )

}

const mapStateToProps = (state) => {
    return {
        categories: state.shopkeeperReducer.categories
    }
}

export default connect(mapStateToProps)(ShopkeeperCreateCategory)