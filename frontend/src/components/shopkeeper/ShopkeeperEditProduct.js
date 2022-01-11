import {bindActionCreators} from "redux";
import {
    initiateAddProduct,
    initiateEditProduct,
    cancelEditProduct,
    updateProductName,
    updateProductDescription,
    updateBrand,
    updateUnitPrice,
    updateUnitsInStock,
    updateSize,
    updateColor,
    updateProductAvailable,
    updateDiscontinued,
    updatePicture,
    updateDateReceived,
    updateUnitsReceived,
    updateDiscountAvailable
} from "../../modules/shopkeeper";
import {Button, Form, Modal, Badge, ListGroup, FormControl} from "react-bootstrap";
import {connect} from "react-redux";
import {useEffect, useState} from "react";


const initialSalePriceForm = {
    effectiveDate: '',
    price: ''
}

const initialSalesForm = {
    salesPrice: '',
    saleStartDate: '',
    saleEndDate: '',
    discount: '',
    saleDescription: ''
}

const initialMinAdPriceForm = {
    effectiveDate: '',
    price: ''
}

function ShopkeeperEditProduct({
                                   show,
                                   product,
                                   productName,
                                   categories,
                                   productDescription,
                                   brand,
                                   unitPrice,
                                   unitsInStock,
                                   size,
                                   color,
                                   productAvailable,
                                   discontinued,
                                   discountAvailable,
                                   picture,
                                   dateReceived,
                                   unitsReceived,
                                   initiateEditProduct,
                                   cancelEditProduct,
                                   updateProductName,
                                   updateProductDescription,
                                   updateBrand,
                                   updateUnitPrice,
                                   updateUnitsInStock,
                                   updateSize,
                                   updateColor,
                                   updateProductAvailable,
                                   updateDiscontinued,
                                   updateDiscountAvailable,
                                   updatePicture,
                                   updateDateReceived,
                                   updateUnitsReceived,
                                   salePrice,
                                   setSalePrice,
                                   newSales,
                                   setNewSales,
                                   minAdPrice,
                                   setMinAdPrice
                               }) {


    const newDate = new Date().toLocaleDateString()

    const [productCategory, setProductCategory] = useState([])
    const [categorySelect, setCategorySelect] = useState({id: '', categoryName: ''})
    const [scheduledPricesArray, setScheduledPricesArray] = useState([])
    const [scheduledSalesArray, setScheduledSalesArray] = useState([])
    const [minimumAdPriceArray, setMinimumAdPriceArray] = useState([])


    console.log(product)
    useEffect(() => {
        if (show) {
            setProductCategory(product.categories)
            setScheduledSalesArray(product.sales)
            setScheduledPricesArray(product.scheduledPrices)
            setMinimumAdPriceArray(product.minimumAdvertisedPrice)
        }
    }, [show])

    function handleAdd() {
        if (categorySelect.categoryName === '') {
            // console.log(`logging empty string`)
        } else {
            setProductCategory([...productCategory, categorySelect])
        }
    }


    function onChange(e) {
        // console.log(`logging e.target = ${e.target}`)
        const {value, selectedIndex} = e.target
        // console.log(`logging selectedIndex`)
        const {id} = e.target.options[selectedIndex]
        setCategorySelect({id: Number(id), categoryName: value})
    }

    function onScheduledPricesChange(e) {
        // console.log("onScheduledPricesChange clicked" + e)
        // console.log(e)
        const {name, value} = e.target
        setSalePrice({
            ...salePrice,
            [name]: value
        })
    }

    function onSalesPricesChange(e) {
        const {name, value} = e.target
        setNewSales({
            ...newSales,
            [name]: value
        })
    }


    function onMAPChange(e) {
        const {name, value} = e.target
        console.log(value)
        setMinAdPrice({
            ...minAdPrice,
            [name]: value
        })

        // useEffect(() => {
        //     if (show) {
        //         setProductCategory(product.categories)
        //         setScheduledSalesArray(product.sales)
        //         setScheduledPricesArray(product.scheduledPrices)
        //     }
        // }, [show])

        function handleAdd() {
            if (categorySelect.categoryName === '') {
                // console.log(`logging empty string`)
            } else {
                setProductCategory([...productCategory, categorySelect])
            }

        }

        function handleRemove() {
            setProductCategory(productCategory.filter(id => categorySelect.id !== id.id))
        }

        function handleRemoveMAP() {
            setMinimumAdPriceArray(minimumAdPriceArray.filter(minAdvertisedPrice => {
                const newDate = new Date(minAdvertisedPrice.effectiveDate)
                const newDate2 = new Date(minAdPrice.effectiveDate)

                return newDate.getTime() !== newDate2.getTime()
            }))
        }

        function handleRemoveScheduledPrice() {
            setScheduledPricesArray(scheduledPricesArray.filter(scheduledPrice => {
                const newDate = new Date(scheduledPrice.effectiveDate)
                const newDate2 = new Date(salePrice.effectiveDate)

                return newDate.getTime() !== newDate2.getTime()
            }))
        }

        function handleRemoveSalesPrice() {
            setScheduledSalesArray(scheduledSalesArray.filter(scheduledSales => {
                const startDate = new Date(scheduledSales.saleStartDate)
                const endDate = new Date(scheduledSales.saleEndDate)
                const startDate2 = new Date(newSales.saleStartDate)
                const endDate2 = new Date(newSales.saleEndDate)
                return (startDate.getTime() !== startDate2.getTime() && endDate.getTime() !== endDate2.getTime())
            }))
        }

        function handleAddMAP() {
            const exists = minimumAdPriceArray?.some((minAdvertisedPrice) => {
                const newDate = new Date(minAdvertisedPrice.effectiveDate)
                const newDate2 = new Date(minAdPrice.effectiveDate)
                return newDate.getTime() === newDate2.getTime()
            })
            console.log("minimum AP " + exists)
            if (exists) {
                setMinimumAdPriceArray(minimumAdPriceArray?.map(minAdvertisedPrice => {
                    const newDate = new Date(minAdvertisedPrice.effectiveDate)
                    const newDate2 = new Date(minAdPrice.effectiveDate)
                    if (newDate.getTime() === newDate2.getTime()) {
                        console.log(minAdPrice)
                        return minAdPrice
                    }
                }))
            } else {
                console.log("inside else")
                console.log(minAdPrice)
                console.log(minimumAdPriceArray)
                setMinimumAdPriceArray([...minimumAdPriceArray, minAdPrice])
            }
        }

        function handleAddScheduledPrice() {
            const exists = scheduledPricesArray?.some((scheduledPrice) => {
                const newDate = new Date(scheduledPrice.effectiveDate)
                const newDate2 = new Date(salePrice.effectiveDate)
                return newDate.getTime() === newDate2.getTime()
            })
            // console.log("scheduled price " + exists)
            if (exists) {
                setScheduledPricesArray(scheduledPricesArray?.map(scheduledPrice => {
                    const newDate = new Date(scheduledPrice.effectiveDate)
                    const newDate2 = new Date(salePrice.effectiveDate)
                    if (newDate.getTime() === newDate2.getTime()) {
                        // console.log(salePrice)
                        return salePrice
                    }
                }))
            } else {
                setScheduledPricesArray([...scheduledPricesArray, salePrice])
            }
        }

        function handleAddSalesPrice() {
            const exists = scheduledSalesArray?.some((scheduledSales) => {
                const startDate = new Date(scheduledSales.saleStartDate)
                const endDate = new Date(scheduledSales.saleEndDate)
                const startDate2 = new Date(newSales.saleStartDate)
                const endDate2 = new Date(newSales.saleEndDate)
                return startDate.getTime() === startDate2.getTime() && endDate.getTime() === endDate2.getTime()

            })
            // console.log("sales price " + exists)
            if (exists) {
                setScheduledSalesArray(scheduledSalesArray?.map(scheduledSales => {
                    const startDate = new Date(scheduledSales.saleStartDate)
                    const endDate = new Date(scheduledSales.saleEndDate)
                    const startDate2 = new Date(newSales.saleStartDate)
                    const endDate2 = new Date(newSales.saleEndDate)
                    if (startDate.getTime() === startDate2.getTime() && endDate.getTime() === endDate2.getTime()) {
                        // console.log(newSales)
                        return newSales
                    }
                }))
            } else {
                setScheduledSalesArray([...scheduledSalesArray, newSales])
            }
        }

        function handleSubmit(event) {
            event.preventDefault()

            initiateEditProduct({
                ...product,
                productName,
                categories: productCategory,
                productDescription,
                brand,
                unitPrice,
                unitsInStock,
                size,
                color,
                productAvailable,
                discontinued,
                discountAvailable,
                picture,
                dateReceived,
                unitsReceived,
                scheduledPrices: scheduledPricesArray,
                sales: scheduledSalesArray,
                minimumAdvertisedPrice: minimumAdPriceArray
            })
            setSalePrice(initialSalePriceForm)
            setNewSales(initialSalesForm)

            setMinAdPrice(initialMinAdPriceForm)

        }

        return <Modal show={show} onHide={cancelEditProduct}>
            <Modal.Header closeButton>
                <Modal.Title>Edit Product</Modal.Title>
            </Modal.Header>
            <Form onSubmit={handleSubmit} className={"m-2"}>
                <Form.Label>Product Name</Form.Label>
                <Form.Control type='productName' value={productName}
                              onChange={event => updateProductName(event.target.value)}/>
                <Form.Label>Categories</Form.Label>
                <div className='mb-3'>{productCategory.map(category => <Badge>{category.categoryName}</Badge>)}</div>
                <Form.Control type='categories' as='select'
                              onChange={onChange}>
                    <option selected disabled hidden>Select Category</option>
                    {categories.map(category => <option id={category.id}
                                                        value={category.categoryName}>{category.categoryName}</option>)}
                </Form.Control>
                <div><Button size='sm' onClick={() => handleAdd()}>Add</Button><Button
                    size='sm' onClick={() => handleRemove()}>Remove</Button>
                </div>
                <Form.Label>Product Description</Form.Label>
                <Form.Control type='productDescription' value={productDescription}
                              onChange={event => updateProductDescription(event.target.value)}/>
                <Form.Label>Brand</Form.Label>
                <Form.Control type='brand' value={brand} onChange={event => updateBrand(event.target.value)}/>
                <Form.Label>Unit Price</Form.Label>
                <Form.Control type='number' step='.01' value={unitPrice}
                              onChange={event => updateUnitPrice(event.target.value)}/>
                <Form.Label>Units in Stock</Form.Label>
                <Form.Control type='number' value={unitsInStock}
                              onChange={event => updateUnitsInStock(event.target.value)}/>
                <Form.Label>Size</Form.Label>
                <Form.Control type='size' value={size} onChange={event => updateSize(event.target.value)}/>
                <Form.Label>Color</Form.Label>
                <Form.Control type='text' as='select' selected value={color}
                              onChange={event => updateColor(event.target.value)}>
                    <option value="white">White</option>
                    <option value="grey">Grey</option>
                    <option value="blue">Blue</option>
                    <option value="green">Green</option>
                    <option value="yellow">Yellow</option>
                    <option value="orange">Orange</option>
                    <option value="red">Red</option>
                    <option value="purple">Purple</option>
                    <option value="gold">Gold</option>
                    <option value="silver">Silver</option>
                </Form.Control>
                <Form.Label>Product Available</Form.Label>
                <Form.Control type='date' value={productAvailable}
                              onChange={event => updateProductAvailable(event.target.value)}/>
                <Form.Label>Discontinued</Form.Label>
                <Form.Control type='discontinued' as='select' value={discontinued}
                              onChange={event => updateDiscontinued(event.target.value)}>
                    <option value=''>Undefined</option>
                    <option value={true}>True</option>
                    <option value={false}>False</option>
                </Form.Control>
                <Form.Label>Discount Available</Form.Label>
                <Form.Control type='discountAvailable' as='select' value={discountAvailable}
                              onChange={event => updateDiscountAvailable(event.target.value)}>
                    <option value={true}>True</option>
                    <option value={false}>False</option>
                </Form.Control>

                <Form.Label>Picture</Form.Label>
                <Form.Control type='img' value={picture} onChange={event => updatePicture(event.target.value)}/>
                <Form.Label>Date Received</Form.Label>
                <Form.Control type='date' value={dateReceived}
                              onChange={event => updateDateReceived(event.target.value)}/>
                <Form.Label>Units Received</Form.Label>
                <Form.Control type='int' value={unitsReceived}
                              onChange={event => updateUnitsReceived(event.target.value)}/>


                <hr/>
                <Form.Label>Minimum Advertised Price</Form.Label>
                <div className='mb-3'>{minimumAdPriceArray?.map(minAdvertisedPrice =>
                    <Badge>price={minAdvertisedPrice.price}<br/>
                        effective date={minAdvertisedPrice.effectiveDate}</Badge>)}</div>
                <Form.Label>Effective minimum advertised price date</Form.Label>
                <Form.Control type={"date"} name="effectiveDate" value={minAdPrice.effectiveDate}
                              onChange={onMAPChange}/>
                <Form.Label>Price</Form.Label>
                <Form.Control type={'int'} name="price" value={minAdPrice.price}
                              onChange={onMAPChange}/>
                <div><Button size='sm' onClick={() => handleAddMAP()}>Add</Button><Button
                    size='sm' onClick={() => handleRemoveMAP()}>Remove</Button>
                </div>


                <hr/>
                <Form.Label>Scheduled Prices</Form.Label>
                <div className='mb-3'>{scheduledPricesArray?.map(scheduledPrice =>
                    <Badge>price={scheduledPrice.price}<br/>
                        effective date={scheduledPrice.effectiveDate}</Badge>)}</div>

                <Form.Label>Effective scheduled price date</Form.Label>
                <Form.Control type={"date"} name="effectiveDate" value={salePrice.effectiveDate}
                              onChange={onScheduledPricesChange}/>
                <Form.Label>Effective scheduled Price</Form.Label>
                <Form.Control type={'int'} name="price" value={salePrice.price}
                              onChange={onScheduledPricesChange}/>
                <div><Button size='sm' onClick={() => handleAddScheduledPrice()}>Add</Button><Button
                    size='sm' onClick={() => handleRemoveScheduledPrice()}>Remove</Button>
                </div>


                <hr/>
                <Form.Label>Scheduled Sales</Form.Label>
                <div className='mb-3'>{scheduledSalesArray?.map(scheduledSale =>
                    <Badge>
                        sale start date={scheduledSale.saleStartDate}
                        <br/>
                        sale end date={scheduledSale.saleEndDate}<br/>
                        discount={scheduledSale.discount}<br/>
                        description of discount={scheduledSale.saleDescription}
                    </Badge>
                )}</div>

                <Form.Label>Effective scheduled price start date</Form.Label>
                <Form.Control type={"date"} name="saleStartDate" value={newSales.saleStartDate}
                              onChange={onSalesPricesChange}/>
                <Form.Label>Effective scheduled price end date</Form.Label>
                <Form.Control type={"date"} name="saleEndDate" value={newSales.saleEndDate}
                              onChange={onSalesPricesChange}/>

                <Form.Label>Scheduled sales discount</Form.Label>
                <Form.Control type={'float'} name="discount" value={newSales.discount}
                              onChange={onSalesPricesChange}/>
                <Form.Label>Scheduled sales description</Form.Label>
                <Form.Control type={'text'} name="saleDescription" value={newSales.saleDescription}
                              onChange={onSalesPricesChange}/>

                <div><Button size='sm' onClick={() => handleAddSalesPrice()}>Add</Button><Button
                    size='sm' onClick={() => handleRemoveSalesPrice()}>Remove</Button>
                </div>


                <Button type='submit'>{product ? 'Apply' : 'Create'}</Button>
            </Form>
        </Modal>
    }
}

    function mapStateToProps(state) {
        return {
            show: state.shopkeeperReducer.showEditProduct,
            product: state.shopkeeperReducer.productToEdit,
            productName: state.shopkeeperReducer.productName,
            productDescription: state.shopkeeperReducer.productDescription,
            brand: state.shopkeeperReducer.brand,
            unitPrice: state.shopkeeperReducer.unitPrice,
            unitsInStock: state.shopkeeperReducer.unitsInStock,
            categories: state.shopkeeperReducer.categories,
            size: state.shopkeeperReducer.size,
            color: state.shopkeeperReducer.color,
            productAvailable: state.shopkeeperReducer.productAvailable,
            discontinued: state.shopkeeperReducer.discontinued,
            discountAvailable: state.shopkeeperReducer.discountAvailable,
            picture: state.shopkeeperReducer.picture,
            dateReceived: state.shopkeeperReducer.dateReceived,
            unitsReceived: state.shopkeeperReducer.unitsReceived,
            price: state.shopkeeperReducer.price,
            effectiveDate: state.shopkeeperReducer.effectiveDate,
            saleStartDate: state.shopkeeperReducer.saleStartDate,
            saleEndDate: state.shopkeeperReducer.saleEndDate,
            discount: state.shopkeeperReducer.discount,
            saleDescription: state.shopkeeperReducer.saleDescription
        }
    }


    function mapDispatchToProps(dispatch) {
        return bindActionCreators({
            initiateAddProduct,
            initiateEditProduct,
            cancelEditProduct,
            updateProductName,
            updateProductDescription,
            updateBrand,
            updateUnitPrice,
            updateUnitsInStock,
            updateSize,
            updateColor,
            updateProductAvailable,
            updateDiscontinued,
            updateDiscountAvailable,
            updatePicture,
            updateDateReceived,
            updateUnitsReceived
        }, dispatch)

    }

export default connect(mapStateToProps, mapDispatchToProps)(ShopkeeperEditProduct)