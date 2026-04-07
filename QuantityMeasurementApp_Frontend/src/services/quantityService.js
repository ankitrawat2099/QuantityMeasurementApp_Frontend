import axios from "axios";


const API_URL = import.meta.env.VITE_BASE_URL;
export const calculateQuantity = async (data) => {


  if (data.operation == "Convert") {

    const payload = {
      quantityDTO: {
        value: parseFloat(data.value1),
        unit: data.unit1,
        measurementType: data.type
      },
      targetUnit: data.unit2
    };

    const res = await axios.post(`${API_URL}/v1/quantities/${data.operation.toLowerCase()}`, payload, {

      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    });

    return res;
  }

  const payload = {
    thisQuantityDTO: {
      value: parseFloat(data.value1),
      unit: data.unit1,
      measurementType: data.type
    },
    thatQuantityDTO: {
      value: parseFloat(data.value2),
      unit: data.unit2,
      measurementType: data.type
    }
  };
  const res = await axios.post(`${API_URL}/v1/quantities/${data.operation.toLowerCase()}`, payload, {

    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`
    }
  });


  return res.data;
};

export const getHistory = async () => {
  const res = await axios.get(`${API_URL}/v1/quantities/history/all`, {

    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`
    }
  });

  return res.data.data || [];
};