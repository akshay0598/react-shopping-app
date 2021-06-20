import React, { Component } from 'react'
import formatCurrency from '../util';
import Fade from 'react-reveal/Fade';
export default class Cart extends Component {
    constructor(props){
        super(props);
        this.state = 
        {
            name:"",
            address:"",
            email:"",
            showCheckout:false,
        }
    }
    handleInput = e => {
        this.setState({
            [e.target.name] : e.target.value
        });
        console.log(this.state.name,this.state.address);
    }
    createOrder = e => {
        e.preventDefault();
        const order = {
            name:this.state.name,
            address:this.state.address,
            email:this.state.email,
            cartItems:this.props.cartItems
        };
        this.props.createOrder(order);
    }
    render() {
        const {cartItems} = this.props; 
        return (
            
            <div>
                {cartItems.length === 0 ? <div className="cart cart-header">Cart is Empty</div> : 
                <div className="cart cart-header">You have {cartItems.length} products in the cart.</div>}

                <div>
                    <div className="cart">
                        <Fade left cascade>
                        <ul className="cart-items">
                            {cartItems.map(item => (
                                <li key={item._id}>
                                    <div>
                                        <img src={item.image} alt={item.title}/>

                                    </div>
                                    <div>
                                        <div>{item.title}</div>
                                        <div className="right">
                                            {formatCurrency(item.price) } x {item.count +" "}
                                        <button className = "button" onClick={() => this.props.removeFromCart(item)}>Remove</button>
                                    </div>
                                    </div>

                                </li>
                            ))}
                        </ul>
                        </Fade>
                    </div>
                    {cartItems.length !==0 ? 
                    <div className="cart"> 
                    <div className="total">
                        Total:{"  "}
                        { formatCurrency(cartItems.reduce((a,c) => a + (c.price*c.count),0))}
                    </div>
                    <button onClick = {() => {this.setState({showCheckout:true})}} className="button primary">Proceed</button>
                    </div> :""}
                </div>
                {this.state.showCheckout ? (
                    <Fade right cascade>
                    <div className="cart">

                        <form onSubmit = {this.createOrder}>
                         <ul className="form-container">
                             <li>
                                 <label id="email">Email</label>
                                 <input type="email" required onChange = {this.handleInput} name="email" id="email"/>
                             </li>
                             <li>
                                 <label id="name">Name</label>
                                 <input type="text" required onChange = {this.handleInput} name="name" id="name"/>
                             </li>
                             <li>
                                 <label id="address">Address</label>
                                 <input type="text" required onChange = {this.handleInput} name="address" id="address"/>
                             </li>

                             <li>
                                 <button type="submit" className="button primary">Checout</button>
                                 </li>

                         </ul>
                        </form>
                        </div>

               </Fade>   ):""}
            </div>
        
        )
    }
}
