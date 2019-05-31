import React from 'react';

const CookiePolicy = props => {

  return (
    <div className={'cookie'}>
      <span>This website may use cookies. By continuing to use this site, you agree to the use of these cookies.</span>
      <button onClick={props.onCookieOk}>OK</button>
    </div>
  )
}

export default CookiePolicy;