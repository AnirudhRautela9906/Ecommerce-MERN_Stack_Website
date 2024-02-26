import React, { useState } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

const PassToggle = () => {
  const [visible, setVisibility] = useState(true);

  const InputType = visible ? "password" : "text";

  const Icon = visible ? ( <VisibilityOffIcon onClick={() => setVisibility((visible) => !visible)} /> )
   :  (  <VisibilityIcon onClick={() => setVisibility((visible) => !visible)} /> );

  return [InputType, Icon];
};

export default PassToggle;
