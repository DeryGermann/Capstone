import React from 'react';

const FriendsList = props => {
    return(
        <>
            {
                props.friends.map((friend, i) => {
                    return(<div key={i} className='friends'>
                        <h3>{friend}</h3>
                    </div>)
                })
            }
        </>
    );
}

export default FriendsList;