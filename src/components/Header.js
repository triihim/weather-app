import React from 'react';

const Header = (props) => {
    return(
        <nav className='navbar navbar-expand-lg navbar-dark bg-dark mb-3'>
            <div className='container'>
                <span className='navbar-brand mb-0 d-none d-sm-inline text-light'>Weather monitor</span>
                
                <div className='btn-toolbar'>
                    <div className='btn-group btn-group-sm'>
                        <button
                            disabled={ (props.fetchFailed) ? true : false }
                            onClick={() => props.toggleAddMode()} 
                            className='btn btn-primary'>
                            Add Observation
                        </button>  
                    </div>  
                </div>

            </div>
        </nav>
    )
};

export default Header;