import React from 'react';

const FriendsList = props => {
    return(
        <div id='friends-list'>
            <h4>Friends List</h4>
            {
                props.friends.map((friend, i) => {
                    return(<div key={i} className='friends'>
                        <h4>{friend.name}</h4>
                    </div>)
                })
            }
        </div>
    );
}

export default FriendsList;