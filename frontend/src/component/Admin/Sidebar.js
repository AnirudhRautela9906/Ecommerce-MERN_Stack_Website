import React from "react";
import "./Sidebar.css";
import { Link } from "react-router-dom";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import { TreeView, TreeItem } from "@mui/lab";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ListAltIcon from "@mui/icons-material/ListAlt";
import PostAddIcon from "@mui/icons-material/PostAdd";
import AddIcon from "@mui/icons-material/Add";
import CategoryIcon from '@mui/icons-material/Category';
import ImportExportIcon from "@mui/icons-material/ImportExport";
const Sidebar = () => {
  return (
    <div className="sidebar">
      
      <Link to={"/admin/dashboard"}>
        <p>
          <DashboardIcon /> Dashboard
        </p>
      </Link>
      
        
      <TreeView
        defaultCollapseIcon={<ExpandMoreIcon />}
        defaultExpandIcon={<ImportExportIcon />}
      >
        <Link to="/admin/users">
            <p>
                <PeopleIcon/>
                Users
            </p>
        </Link>
        <Link to="/admin/orders">
            <p>
                <ListAltIcon/>
                Orders
            </p>
        </Link>
        <Link to="/admin/category">
            <p>
                <CategoryIcon/>
                Category
            </p>
        </Link>
        <TreeItem nodeId="4" label="Products">
          <Link to="/admin/products">
            <TreeItem nodeId="5" label="All Products" icon={<PostAddIcon />} sx={{width:"auto"}}></TreeItem>
          </Link>
          <Link to="/admin/product">
            <TreeItem nodeId="6" label="Create Product" icon={<AddIcon />}></TreeItem>
          </Link>
        </TreeItem>
       
        
       
        
      </TreeView>
        
    </div>
  );
};

export default Sidebar;
