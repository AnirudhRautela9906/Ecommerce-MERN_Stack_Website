import React, { Fragment, useEffect, useState } from "react";
import "./Address.css";
import {  useDispatch, useSelector } from "react-redux";
import MetaData from "../layout/MetaData";
import PinDropIcon from "@mui/icons-material/PinDrop";
import HomeIcon from "@mui/icons-material/Home";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import PublicIcon from "@mui/icons-material/Public";
import MapIcon from '@mui/icons-material/Map';
import { Country, State } from "country-state-city";
import {useNavigate} from "react-router-dom"
import { addAddress } from "../../actions/userAction";
import { NEW_ADDRESS_RESET } from "../../constants/userConstants";


const AddAddress = () => {
  const dispatch = useDispatch();
  const { isAddAddress,user } = useSelector((state) => state.user);
  const navigate = useNavigate()

  const [line,setLine] = useState("")
  const [city,setCity] = useState("")
  const [landmark,setLandmark] = useState("")
  const [state,setState] = useState("")
  const [country,setCountry] = useState("")
  const [pincode,setPincode] = useState("")


  const addressSubmit = (e) => {
    e.preventDefault()
    const myForm = new FormData();
    myForm.set("line", line);
    myForm.set("city", city);
    myForm.set("landmark", landmark);
    myForm.set("state", state);
    myForm.set("country", country);
    myForm.set("pincode", pincode);

    dispatch(addAddress(myForm))
    // dispatch(loadUser())
    
   
  };
  useEffect(() => {
    if(isAddAddress === true) {
      dispatch({type:NEW_ADDRESS_RESET})
      navigate("/my-account")}
  }, [isAddAddress,navigate,dispatch])
  

  return (
    <Fragment>
      <MetaData title={`ECOMMERCE - Address Details`} />


      <div className="shippingContainer">
        <div className="shippingBox">
          <h2 className="shippingHeading">Address Details</h2>

          <form
            className="shippingForm"
            encType="multipart/form-data"
            onSubmit={addressSubmit}
          >
            <div>
              <HomeIcon />
              <input
                type="text"
                placeholder="Address"
                required
                id="line"
                value={line}
                onChange={(e)=> setLine(e.target.value)}
              />
            </div>
            <div>
              <LocationCityIcon />
              <input
                type="text"
                placeholder="Landmark"
                required
                id="landmark"
                value={landmark}
                onChange={(e)=> setLandmark(e.target.value)}
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
            value="Add Address"
            className="shippingBtn"
            disabled= {user.address.length > 2 ? true : false}
            />
          </form>
        </div>
      </div>
    </Fragment>
  );
};


export default AddAddress