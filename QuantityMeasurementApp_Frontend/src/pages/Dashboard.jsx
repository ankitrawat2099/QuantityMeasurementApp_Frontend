import useQuantity from "../hooks/useQuantity";
import { getAllowedOperations } from "../models/operations";
import '../index.css';
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const q = useQuantity();
  const navigate = useNavigate();

  const operations = getAllowedOperations(q.type);
  const handleLogout = () => {
    // remove token
    localStorage.removeItem("token");

    // redirect to login
    navigate("/");
  };


  return (
    <div>

      {/* NAVBAR */}
      <div className="navbar">
        <h2>Quantity Measurement</h2>

        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>

      <div className="container">

        {/* TYPE */}
        <div className="row">
          {Object.keys(q.units ? { Length: 1, Weight: 1, Volume: 1, Temperature: 1 } : {}).map(t => (
            <button
              key={t}
              className={q.type === t ? "active-btn" : "outline-btn"}
              onClick={() => q.setType(t)}
            >
              {t}
            </button>
          ))}
        </div>

        {/* OPERATIONS */}
        <div className="row">
          {operations.map(op => (
            <button
              key={op}
              className={q.operation === op ? "active-btn" : "outline-btn"}
              onClick={() => q.setOperation(op)}
            >
              {op}
            </button>
          ))}
        </div>

        {/* INPUTS */}
        <div className="input-row">
          <input value={q.value1} onChange={(e) => q.setValue1(e.target.value)} placeholder="First Value" />

          <select onChange={(e) => q.setUnit1(e.target.value)}>
            {q.units.map(u => <option key={u}>{u}</option>)}
          </select>

          {q.operation !== "Convert" && (
            <input value={q.value2} onChange={(e) => q.setValue2(e.target.value)} placeholder="Second Value" />
          )}

          <select onChange={(e) => q.setUnit2(e.target.value)}>
            {q.units.map(u => <option key={u}>{u}</option>)}
          </select>
        </div>


        {/* CALCULATE BUTTON */}
        <button className="calculate-btn" onClick={q.calculate}>
          Calculate
        </button>


        {/* RESULT BOX */}
        {q.result && (
          <div className="result-box">
            <h3>Result</h3>
            <p>{q.result}</p>
          </div>
        )}

        <button className="history-toggle" onClick={q.toggleHistory}>
          {q.showHistory ? "Hide History" : "Show History"}
        </button>

        {q.showHistory && (
          <table className="history-table">
            <thead>
              <tr>
                <th>Value1</th>
                <th>Unit1</th>
                <th>Operation</th>
                <th>Value2</th>
                <th>Unit2</th>
                <th>Result</th>
                <th>Type</th>
                <th>CreatedAt</th>
              </tr>
            </thead>
            <tbody>
              {q.history.map((h, i) => (
                <tr key={i}>
                  <td>{h.firstValue}</td>
                  <td>{h.firstUnit}</td>
                  <td>{h.operation}</td>
                  <td>{h.secondValue}</td>
                  <td>{h.secondUnit}</td>
                  <td>{h.operation !== "COMPARE" ? h.result + " " + h.firstUnit : h.result == 0 ? "Not Equal" : "Equal"}</td>
                  <td>{h.measurementType}</td>
                  <td>{h.createdAt}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}