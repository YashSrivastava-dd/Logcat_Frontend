import React, { useState } from 'react'
import cards1 from "../../../assets/icons/card.png"
import cards2 from "../../../assets/icons/card2.png"
import cards3 from "../../../assets/icons/card.png"
import AwesomeSlider from 'react-awesome-slider';
import withAutoplay from 'react-awesome-slider/dist/autoplay';
import 'react-awesome-slider/dist/styles.css';
import PaymentAddCard from './PaymentAddCard';

const AutoplaySlider = withAutoplay(AwesomeSlider);
function PaymentDetailsMyCard() {
    const [addCard, setAddCard] = useState(false)
    const handleAddCard = () => {
        setAddCard(true)
    }
    return (
        <>
        {addCard===false?
            <div style={{ width: '750px', height: '350px', padding: '10px', boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px', borderRadius: '10px', padding: '1rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <h1 style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>My Cards</h1>
                    <button onClick={handleAddCard}>Add Card</button>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
                    <div style={{ width: '430px', height: '300px' }}>
                        <AutoplaySlider
                            bullets={false}
                            play={true}
                            cancelOnInteraction={true} // should stop playing on user interaction
                            interval={2000}
                        >
                            <div style={{ backgroundColor: 'white' }}>
                                <img src={cards1} alt="card" />
                            </div>
                            <div style={{ backgroundColor: 'white' }}>
                                <img src={cards2} alt="card" />
                            </div>
                            <div style={{ backgroundColor: 'white' }}>
                                <img src={cards3} alt="card" />
                            </div>
                        </AutoplaySlider>
                    </div>
                </div>
            </div>
            :
            <PaymentAddCard/>
        }
        </>
    )
}
export default PaymentDetailsMyCard