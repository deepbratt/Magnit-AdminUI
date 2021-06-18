import React from "react";
import DatePicker from "react-date-picker";

const DateContext = ({ setDate, date }) => {
  const onChange = (date) => {
    let formattedDate = `${
      date.getMonth() + 1
    }/${date.getDate()}/${date.getFullYear()}`;
    setDate(formattedDate);
  };

  let changed = new Date(date);
  return (
    <div style={{marginLeft: "30px"}}>
      <DatePicker
        minDate={new Date()}
        format="MM-dd-y"
        onChange={onChange}
        value={changed}
        
      />
    </div>
  );
};

export default DateContext;
