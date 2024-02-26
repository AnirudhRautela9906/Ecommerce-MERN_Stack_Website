import React, { Fragment, useState } from "react";
import "./Shipping.css";
import { useSelector, useDispatch } from "react-redux";
import MetaData from "../layout/MetaData";
import { saveShippingInfo } from "../../actions/cartAction";
import PinDropIcon from "@mui/icons-material/PinDrop";
import HomeIcon from "@mui/icons-material/Home";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import PublicIcon from "@mui/icons-material/Public";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import MapIcon from '@mui/icons-material/Map';
import { Country, State } from "country-state-city";
import CheckoutSteps from '../Cart/CheckoutSteps.js'
import {useNavigate} from "react-router-dom"
import { ErrorAlert } from "../layout/MuiAlert";


const Shipping = () => {
  const dispatch = useDispatch();
  const { shippingInfo } = useSelector((state) => state.cart);
  const navigate = useNavigate()
  const [errorOpen, setErrorOpen] = React.useState(false);
  const [title, setTitle] = useState("");

  const [address,setAddress] = useState(shippingInfo?.address ? shippingInfo?.address : "")
  const [city,setCity] = useState(shippingInfo?.city ? shippingInfo?.city : "")
  const [state,setState] = useState(shippingInfo?.state ? shippingInfo?.state : "")
  const [country,setCountry] = useState(shippingInfo?.country ? shippingInfo?.country : "")
  const [pincode,setPincode] = useState(shippingInfo?.pincode ? shippingInfo?.pincode : "")
  const [phoneNo,setPhoneNo] = useState(shippingInfo?.phoneNo ? shippingInfo?.phoneNo : "")

  const shippingSubmit = (e) => {
    e.preventDefault()
    if(phoneNo.length !== 10 ){
      setErrorOpen(true)
      setTitle("Phone Number should be of 10 digits")
    }
    else{
      dispatch(saveShippingInfo({address,city,state,country,pincode,phoneNo}))
      navigate("/order/confirm")
    }
   
  };

  return (
    <Fragment>
      <MetaData title={`ECOMMERCE - Shipping Details`} />

<div className="shippingExternal">
      <CheckoutSteps activeStep={0} />
      <div className="shippingContainer">
        <div className="shippingBox">
          <h2 className="shippingHeading">Shipping Details</h2>

          <form
            className="shippingForm"
            encType="multipart/form-data"
            onSubmit={shippingSubmit}
          >
            <div>
              <HomeIcon />
              <input
                type="text"
                placeholder="Address"
                required
                id="address"
                value={address}
                onChange={(e)=> setAddress(e.target.value)}
              />
            </div>
            <div>
              <LocationCityIcon />
              <input
                type="text"
                placeholder="City"
                required
                id="city"
                value={city}
                onChange={(e)=> setCity(e.target.value)}
              />
            </div>
            <div>
              <PinDropIcon />
              <input
                type="number"
                placeholder="Pin Code"
                required
                id="pinCode"
                value={pincode}
                onChange={(e)=> setPincode(e.target.value)}
              />
            </div>
            <div>
              <LocalPhoneIcon />
              <input
                type="number"
                placeholder="Phone Number"
                required
                id="phoneNo"
                value={phoneNo}
                onChange={(e)=> setPhoneNo(e.target.value)}
                size="10"
              />
            </div>
            <div>
              <PublicIcon />
              <select 
               required
               id="country"
               value={country}
               onChange={(e)=> setCountry(e.target.value)}
              >
                <option value="">Country</option>
                {
                  Country && Country.getAllCountries().map((item)=>(
                    <option key={item.isoCode} value={item.isoCode}>{item.name}</option>
                  ))
                }
              </select>
            </div>
            {
              country && (
                <div>
              <MapIcon />
                  <select 
                  id="state"
                  required
                  value={state}
                  onChange={(e)=> setState(e.target.value)}
                  >
                    <option value="">State</option>
                    {
                    State && State.getStatesOfCountry(country).map((item)=>(
                    <option key={item.isoCode} value={item.isoCode}>{item.name}</option>
                    ))
                    }
                  </select>
                </div>
              )
            }
            <input 
            type="submit" 
            value="Continue"
            className="shippingBtn"
            // disabled= {state ? false : true}
            />
          </form>
        </div>
      </div>

      </div>
      <ErrorAlert open={errorOpen} title={title} setOpen={setErrorOpen} />
    </Fragment>
  );
};

export default Shipping;
