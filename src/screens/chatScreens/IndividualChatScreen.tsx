import React from 'react';

interface IndividualChatScreenProps {
    userId: string;
}

const IndividualChatScreen: React.FC<IndividualChatScreenProps> = ({ userId }) => {
    // Your component logic goes here

    return (
        <div>
            <h1>Individual Chat Screen</h1>
            <p>User ID: {userId}</p>
            {/* Add your chat UI components here */}
        </div>
    );
};

export default IndividualChatScreen;
