import React, { useEffect,Fragment } from 'react'
import {useSelector,useDispatch} from "react-redux"
import Sidebar from "./Sidebar.js"
import "./Dashboard.css"
import {Typography} from "@mui/material"
import {Link} from 'react-router-dom'
import { Doughnut,Line} from "react-chartjs-2"
import MetaData from "../layout/MetaData"
import Loader from "../layout/Loader/Loader.js"

import {CategoryScale,Chart as ChartJS, LinearScale,LineElement,PointElement,Legend,ArcElement,Tooltip} from "chart.js"
import { getAdminProducts } from '../../actions/productAction.js'
import { getAllOrders } from '../../actions/orderAction.js'
import { getAllUsers } from '../../actions/userAction.js'


const Dashboard = () => {
  
  const dispatch = useDispatch()
  const {products}= useSelector(state => state.products)
  const {  users } = useSelector((state) => state.allUsers); 

  const {  orders,loading } = useSelector((state) => state.allOrders);

  let outOfStock = 0

  products && products.forEach(item => {

    if(item.stock === "0"){
      outOfStock +=1
    }
  });

  let totalAmount = 0
  orders && orders.forEach(item => {
      totalAmount +=item.totalPrice
  });




  ChartJS.register([
  CategoryScale,LinearScale,PointElement,LineElement,Legend,ArcElement,Tooltip
  ])
  const lineState = {
    labels: ["Initial Amount","Amount Earned"],
    datasets: [
      {
        label: "TOTAL AMOUNT",
        backgroundColor: ["tomato"],
        hoverBackgroundColor:["rgb(197,72,49"] ,
        data:[0,totalAmount],
        pointRadius:10,
        pointHoverRadius:10
      }
    ]
  }
  const doughnutState = {
    labels: ["Out of Stock","InStock"],
    datasets: [
      {
        backgroundColor: ["red","rgb(6 197 59)"],
        hoverBackgroundColor:["#4B5000","#35014F"] ,
        data:[outOfStock, products.length - outOfStock],
      }
    ]
  }
  const options = {
    plugins: {
      legend:true
    }
  }
  useEffect(() => {
    dispatch(getAdminProducts())
    dispatch(getAllOrders());
    dispatch(getAllUsers());
  }, [dispatch])


  return (
    
    <div className="dashboard">
      <MetaData title={`ADMIN - DASHBOARD`} />
      <Sidebar/>
      <Fragment>
        {
          loading ? <Loader/> :
          <div className="dashboardContainer">
        <Typography component="h1">Dashboard</Typography>
        <div className="dashboardSummary">
          <div>
            <p>
              Total Amount <br /> Rs {totalAmount}
            </p>
          </div>
          <div className='dashboardSummaryBox2'>
            <Link to="/admin/products">
            <p>Product</p>
            <p>{products && products.length}</p>
            </Link>
            <Link to="/admin/orders">
            <p>Orders</p>
            <p>{orders && orders.length}</p>
            </Link>
            <Link to="/admin/users">
            <p>Users</p>
            <p>{users && users.length}</p>
            </Link>
          </div>
        </div>

        <div className="lineChart">
          <Line data={lineState} options={options} />
        </div>
        <div className="doughnutChart">
          <Doughnut data={doughnutState} />
        </div>
      </div>
        }
      </Fragment>
    </div>
  )

}

export default Dashboard