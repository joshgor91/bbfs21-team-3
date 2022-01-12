import {Button, Stack, Table} from "react-bootstrap";
import {connect} from "react-redux";

function ShopkeeperSeeCategories({categories, hide, setCategoryId, setIsEditing}) {
    const tHead = ["ID", "Category Name", "Edit"]

    function handleEdit(id) {
        // console.log(`handleEdit log with id = ${id}`)
        setIsEditing(true)
        setCategoryId(id)
    }

    return (

        <Table striped bordered responsive hidden={hide}>
            <thead>
            <tr>
                {tHead.map((tHead, index) => (
                    <th key={index}>{tHead}</th>
                ))}
            </tr>
            </thead>
            <tbody>
            {categories.map((category, index) => (
                <tr key={index}>
                    {/*{console.log(category)}*/}
                    <td >{category.id}</td>
                    <td >{category.categoryName}</td>
                    <td>
                        <Stack>
                            <Button className={'m-1 text-white'} onClick={() => handleEdit(category.id)}>Edit</Button>
                        </Stack>
                    </td>
                </tr>
            ))}
            </tbody>
        </Table>
    );
}

function mapStateToProps(state){
    return {
        categories: state.shopkeeperReducer.categories
    }
}

export default connect(mapStateToProps)(ShopkeeperSeeCategories)