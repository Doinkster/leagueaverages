import React from 'react'

const CookiePolicy = props => {

  return (
    <div className={'cookie'}>
      <span>This website may use cookies. By continuing to use this site, you agree to these cookies being used.</span>
      <button onClick={props.onCookieOk}>OK</button>
    </div>
  )
}

export default CookiePolicy