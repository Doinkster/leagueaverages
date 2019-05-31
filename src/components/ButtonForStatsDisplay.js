import React from 'react';

const DisplayButton = (props) => {
  let buttonColor;
  if(props.color) {
    buttonColor = '#537ad6';
  } else {
    buttonColor = 'grey';
  }

  return (
      <button onClick={props.onClick} className={props.button} style={{backgroundColor: buttonColor}} />
  )
}



export default DisplayButton;