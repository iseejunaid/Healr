import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList } from 'react-native';

interface Message {
    id: string;
    text: string;
}

const IndividualChatScreen: React.FC<{ route: any }> = ({ route }) => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [inputText, setInputText] = useState('');
    const { userName, profileImageSource, message } = route.params;

    const handleSend = () => {
        if (inputText.trim() !== '') {
            const newMessage: Message = {
                id: Math.random().toString(),
                text: inputText.trim(),
            };
            setMessages((prevMessages) => [...prevMessages, newMessage]);
            setInputText('');
        }
    };

    const renderMessage = ({ item }: { item: Message }) => (
        <View style={{ padding: 10 }}>
            <Text>{item.text}</Text>
        </View>
    );

    return (
        <View style={{ flex: 1 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', padding: 10 }}>
                <View style={{ width: 50, height: 50, borderRadius: 25, backgroundColor: 'gray', marginRight: 10 }} />
                <Text>{userName}</Text>
            </View>
            <Text>{message}</Text>
            <FlatList
                data={messages}
                renderItem={renderMessage}
                keyExtractor={(item) => item.id}
                contentContainerStyle={{ flexGrow: 1 }}
                inverted
            />
            <View style={{ flexDirection: 'row', alignItems: 'center', padding: 10 }}>
                <TextInput
                    style={{ flex: 1, marginRight: 10, borderWidth: 1, padding: 5 }}
                    placeholder="Type a message..."
                    value={inputText}
                    onChangeText={setInputText}
                />
                <TouchableOpacity onPress={handleSend} style={{ padding: 10, backgroundColor: 'blue', borderRadius: 5 }}>
                    <Text style={{ color: 'white' }}>Send</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default IndividualChatScreen;