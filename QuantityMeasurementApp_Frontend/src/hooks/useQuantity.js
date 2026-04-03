import { useEffect, useState } from "react";
import { UNIT_MAP } from "../models/units";
import { getAllowedOperations } from "../models/operations";
import { calculateQuantity, getHistory } from "../services/quantityService";

export default function useQuantity() {
  const [type, setType] = useState("Length");
  const [operation, setOperation] = useState("Add");

  const [units, setUnits] = useState(UNIT_MAP["Length"]);

  const [value1, setValue1] = useState("");
  const [value2, setValue2] = useState("");

  const [unit1, setUnit1] = useState("Feet");
  const [unit2, setUnit2] = useState("Feet");

  const [result, setResult] = useState("");
  const [history, setHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false);

  


const calculate = async () => {

    
  try {
    const res = await calculateQuantity({
      value1,
      value2,
      unit1,
      unit2,
      operation,
      type,
    });
let finalResult='';
    if(operation=="Convert"){
    finalResult=res.data.value+" "+res.data.unit;
    }
    else if(operation=="Compare"){
        if(res.result==0){
            finalResult="Not Equal";
        }
        else{
        finalResult="Both are Equal";}
    }
    else{
        finalResult=res.value+" "+res.unit;
    }
     

    setResult(finalResult);
    try {
      const data = await getHistory();
      setHistory(data);
    } catch {
      console.log("History refresh failed");
    }


  } catch (err) {
    
    console.log(err.response?.data);
  } 

};

    

  //  Auto change units when type changes
  useEffect(() => {
    const newUnits = UNIT_MAP[type];
    setUnits(newUnits);
    setUnit1(newUnits[0]);
    setUnit2(newUnits[0]);

    // Reset operation if invalid
    const allowed = getAllowedOperations(type);
    if (!allowed.includes(operation)) {
      setOperation(allowed[0]);
    }
  }, [type]);

 

 const toggleHistory = async () => {
  if (showHistory) {
    setShowHistory(false);
    return;
  }

  //fetch latest history
  try {
    const data = await getHistory();
    setHistory(data);
  } catch {
    alert("Failed to load history");
    return;
  }

  setShowHistory(true);
};
  return {
    type,
    setType,
    operation,
    setOperation,
    units,
    value1,
    value2,
    setValue1,
    setValue2,
    unit1,
    unit2,
    setUnit1,
    setUnit2,
    result,
    calculate,
    history,
    showHistory,
    toggleHistory,
  };
}