import React from 'react';

const FriendsList = props => {
    return(
        <>
            {
                props.friends.map((friend, i) => {
                    return(<div key={i} className='friends'>
                        <h3>{friend.name}</h3>
                    </div>)
                })
            }
        </>
    );
}

export default FriendsList;