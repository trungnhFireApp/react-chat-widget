export type Conversation = {
    id: string;
    hmac: string;
    timestamp: number;
};

type Shop = {
    shop_id: string;
    msUUID: string;
};

export interface Message {
    _id: string;
    created_at: Date;
    is_seen: boolean;
    message: string;
    sender: string;
    sender_id: string;
    status: string;
    conversation_id?: string;
    message_links?: Array<any>[];
}

export interface SocketMessagePayload {
    message: string;
    sender: string;
    sender_id: string;
}

export interface MessagesState {
    messages: Message[];
    unreadMessages: Message[];
    unreadCount: number;
}

export interface BehaviorState {
    loadConversation: boolean;
    loadMessage: boolean;
}

export interface ConversationState {
    conversation?: Conversation;
}

export interface ShopState {
    shop?: Shop;
}

export interface GlobalState {
    messages: MessagesState;
    behavior: BehaviorState;
    conversation: ConversationState;
    shop: ShopState;
}

//Type in Widger component
export interface WidgetMessage {
    type: string;
    text: string;
    sender: string;
    timestamp: Date;
    showAvatar: boolean;
    customId: string;
    unread: boolean;
}
