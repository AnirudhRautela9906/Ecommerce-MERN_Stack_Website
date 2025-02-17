import React, { Fragment } from 'react'
import './CheckoutSteps.css'
import { Typography,StepLabel,Step, Stepper } from '@mui/material';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import LibraryAddCheckIcon from '@mui/icons-material/LibraryAddCheck';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';


const CheckoutSteps = ({activeStep}) => {
    const steps = [
        {
            label: <Typography>Shipping Details</Typography>,
            icon: <LocalShippingIcon/>
        },
        {
            label: <Typography>Confirm Order</Typography>,
            icon: <LibraryAddCheckIcon/>
        },
        {
            label: <Typography>Payment</Typography>,
            icon: <AccountBalanceIcon/>
        }
    ]

    const stepStyles = {
        boxSizing: "border-box",
     
    }
  return (
    <Fragment>
        <Stepper alternativeLabel activeStep={activeStep} style={stepStyles}  className='stepStyle'>
            {steps.map((item,index)=>(
                <Step key={index} active={activeStep === index ? true : false} completed={activeStep >= index ? true : false} >
                    <StepLabel icon={item.icon} style={{color: activeStep >= index ? "#FFD814" : "rgba(0,0,0, .66)"}} >{item.label}</StepLabel>
                </Step>
            ))}
        </Stepper>
    </Fragment>
  )
}

export default CheckoutSteps