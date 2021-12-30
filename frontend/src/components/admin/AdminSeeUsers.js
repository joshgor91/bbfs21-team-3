import {Table} from "react-bootstrap";

function AdminSeeUsers () {
 var tHead = ["ID", "First Name", "Last Name", "Role", "Email", "Auth Level", "Password"]

    return (

        <Table responsive>
            <thead>
            <tr>
                {tHead.map((tHead, index) => (
                    <th key={index}>{tHead}</th>
                ))}
            </tr>
            </thead>
            <tbody>
            <tr>
                <td>1</td>
                {Array.from({ length: 6 }).map((_, index) => (
                    <td key={index}>Table cell {index}</td>
                ))}
            </tr>
            <tr>
                <td>2</td>
                {Array.from({ length: 6 }).map((_, index) => (
                    <td key={index}>Table cell {index}</td>
                ))}
            </tr>
            <tr>
                <td>3</td>
                {Array.from({ length: 6 }).map((_, index) => (
                    <td key={index}>Table cell {index}</td>
                ))}
            </tr>
            </tbody>
        </Table>

    );
}

export default AdminSeeUsers