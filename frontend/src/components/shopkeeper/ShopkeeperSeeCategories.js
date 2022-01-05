import {Button, Stack, Table} from "react-bootstrap";
import {gettingUsers, initiateDeleteUser, initiateEditUser} from "../../modules/admin";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";

function ShopkeeperSeeCategories({ categories, hide, setHide}) {
    const tHead = ["ID", "Category Name", "Edit/Delete"]

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
                    {console.log(category)}
                    <td >{category.id}</td>
                    <td >{category.categoryName}</td>
                    <td>
                        <Stack>
                            <Button >edit</Button>
                            <Button >Delete</Button>
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