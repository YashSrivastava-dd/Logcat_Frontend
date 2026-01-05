import React, { useState } from 'react'
import Cards from 'react-credit-cards-2';
import 'react-credit-cards-2/dist/es/styles-compiled.css';
function PaymentAddCard() {
    const [state, setState] = useState({
        number: '',
        expiry: '',
        cvc: '',
        name: '',
        focus: '',
    });
    const handleInputChange = (evt) => {
        const { name, value } = evt.target;

        setState((prev) => ({ ...prev, [name]: value }));
    }
    const handleInputFocus = (evt) => {
        setState((prev) => ({ ...prev, focus: evt.target.name }));
    }
    return (
        <div style={{ width: '750px', height: '350px', padding: '10px', boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px', borderRadius: '10px', padding: '1rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <h1 style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>Add Card</h1>
                <button>My Cards</button>
            </div>
            <div style={{display:'flex',paddingTop:'3rem',gap:'1rem'}}>
                <Cards
                    number={state.number}
                    expiry={state.expiry}
                    cvc={state.cvc}
                    name={state.name}
                    focused={state.focus}
                />
                <form style={{display:'flex',gap:'0.7rem'}}>
                    <div style={{display:'flex',gap:'0.7rem',flexDirection:'row',flexWrap:'wrap'}}>
                        <lable>Card Number</lable>
                    <input
                        type="number"
                        name="number"
                        placeholder="Card Number"
                        value={state.number}
                        onChange={handleInputChange}
                        onFocus={handleInputFocus}
                        style={{padding:'8px',height:'50px'}}
                    />
                     <lable>Your Name</lable>
                    <input
                        type="text"
                        name="name"
                        placeholder="Your Name"
                        value={state.name}
                        onChange={handleInputChange}
                        onFocus={handleInputFocus}
                        style={{padding:'8px',height:'50px'}}

                    />
                    </div>
                    <div style={{display:'flex',gap:'0.7rem',flexDirection:'row',flexWrap:'wrap'}}>
                     <lable>Exp Date</lable>
                    <input
                        type="number"
                        name="expiry"
                        placeholder="Exp Date"
                        value={state.expiry}
                        onChange={handleInputChange}
                        style={{padding:'8px',height:'50px'}}
                        onFocus={handleInputFocus}
                    />
                     <lable>CVC</lable>
                    <input
                        type="number"
                        name="cvc"
                        placeholder="CVC"
                        value={state.cvc}
                        onChange={handleInputChange}
                        style={{padding:'8px',height:'50px'}}
                        onFocus={handleInputFocus}
                    />
                    </div>
                </form>
            </div>
        </div>
    )
}
export default PaymentAddCard