import React from 'react'

const CookiePolicy = props => {

  return (
    <div className={'cookie'}>
      <div>
        <span>This website uses cookies. By continuing to use this site, you agree to these cookies being used.</span>
        <button onClick={props.onCookieOk}>OK</button>
      </div>
    </div>
  )
}

export default CookiePolicy