import {useEffect, useState} from "react";
import {Accordion, Button, Form, Modal, Row, Stack, Table} from "react-bootstrap";
import {connect, useDispatch} from "react-redux";
import {initiateAddCoupon, initiateDeleteCoupon, initiateEditCoupon, initiateGetAllCoupons} from "../../modules/coupon";
import moment from "moment";

const iniFormValues = {
    couponCode: "",
    discount: 0,
    startDate: "",
    endDate: "",
    useLimit: 0,
    description: ""
}

function ShopKeeperCouponForm({coupons}) {
    const tHead = ["CouponCode", "Discount","Start Date", "End Date", "Use Limit", "Description"]
    const [couponForm, setCouponForm] = useState(iniFormValues)
    const [editing, setEditing] = useState(false)
    const [creating, setCreating] = useState(false)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(initiateGetAllCoupons())
    },[])

    function onChange(e) {
        const {name, value} = e.target
        setCouponForm({
            ...couponForm,
            [name]:value
        })
    }

    function hideModal() {
        setCreating(false)
        setEditing(false)
        setCouponForm(iniFormValues)
    }

    function handleEditing(coupon) {
        setEditing(true)
        setCouponForm({
            ...coupon,
            startDate: moment(coupon.startDate).format("YYYY-MM-DD"),
            endDate: moment(coupon.endDate).format("YYYY-MM-DD")
        })
    }

    function handleDelete(coupon) {
        dispatch(initiateDeleteCoupon(coupon))
    }

    function handleSubmit(e) {
        e.preventDefault()
        if(editing) {
            dispatch(initiateEditCoupon(couponForm))
        } else {
            dispatch(initiateAddCoupon(couponForm))
        }
        setEditing(false)
        setCreating(false)
        setCouponForm(iniFormValues)
    }


    return (
        <>
                <div>
                    <Button variant="secondary" className={'my-2 mx-3 text-white'} onClick={() => setCreating(true)}>Create Coupon</Button>
                </div>
            <Modal show={editing || creating} onHide={hideModal}>
                <Modal.Header closeButton>
                    {editing ? "Edit Coupon" : "Create Coupon"}
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Label>Coupon Code</Form.Label>
                        <Form.Control disabled={editing} type="text" name="couponCode" value={couponForm.couponCode} onChange={onChange}/>
                        <Form.Label>Discount</Form.Label>
                        <Form.Control type="number" name="discount" value={couponForm.discount} onChange={onChange}/>
                        <Form.Label>Start Date</Form.Label>
                        <Form.Control type="date" name="startDate" value={couponForm.startDate} onChange={onChange}/>
                        <Form.Label>End Date</Form.Label>
                        <Form.Control type="date" name="endDate" value={couponForm.endDate} onChange={onChange}/>
                        <Form.Label>Limit</Form.Label>
                        <Form.Control type="number" name="useLimit" value={couponForm.useLimit} onChange={onChange}/>
                        <Form.Label>Description</Form.Label>
                        <Form.Control type="text" name="description" value={couponForm.description} onChange={onChange}/>
                        <Button className={'m-1 text-white'} variant='primary' type='submit'>{editing ? "Apply" : "Create"}</Button>
                    </Form>
                </Modal.Body>
            </Modal>
        <Table striped bordered responsive hidden={false}>
            <thead>
            <tr>
                {tHead.map((tHead, index) => (
                    <th key={index}>{tHead}</th>
                ))}
            </tr>
            </thead>
            <tbody>
            {coupons.map((coupon, index) => (
                <tr key={index}>
                    <td >{coupon.couponCode}</td>
                    <td >{coupon.discount}</td>
                    <td >{moment(coupon.startDate).format("MMMM Do YYYY")}</td>
                    <td >{moment(coupon.endDate).format("MMMM Do YYYY")}</td>
                    <td >{coupon.useLimit}</td>
                    <td >{coupon.description}</td>
                    <td>
                        <Stack>
                            <Button variant="info" onClick={() => handleEditing(coupon)}>Edit</Button>
                        </Stack>
                    </td>
                    <td>
                        <Stack>
                            <Button variant="danger" onClick={() => handleDelete(coupon)}>Delete</Button>
                        </Stack>
                    </td>
                </tr>
            ))}
            </tbody>
        </Table>
        </>
    )

}

const mapStateToProps = (state) => {
    return {
        coupons: state.couponReducer.coupons,
        couponErrorMessage: state.couponReducer.errorMessage
    }
}

export default connect(mapStateToProps)(ShopKeeperCouponForm)