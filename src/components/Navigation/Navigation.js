import React from 'react';
const Navigation = ({onRouteChange, isSignedIn}) => {
   if(isSignedIn){
    return(
        <nav style={{display: 'flex', justifyContent: 'flex-end'}}>
            <p onClick={()=>onRouteChange('signout')}
            className='pa3 link underline black pointer dim'>
                Sign Out
            </p>
        </nav>
    
    );}else{
        return(
            <nav style={{display: 'flex', justifyContent: 'flex-end'}}>
            <p onClick={()=>onRouteChange('signin')}
            className='pa3 link underline black pointer dim'>
                Sign In
            </p>
            <p onClick={()=>onRouteChange('register')}
            className='pa3 link underline black pointer dim'>
                Register
            </p>
            </nav>
            
        )
    }
}
export default Navigation