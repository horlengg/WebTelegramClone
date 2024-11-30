export enum chatroomType {
    INDIVIDUAL = "INDIVIDUAL",
    GROUP = "GROUP",
    CHANNEL = "CHANNEL"
}
export type FileType = {
    fileUrl : string
    fileType : string
    fileSize : number
    id : number
}

export interface UserType {
    fullName : string
    username : string
    profileUrl : string
    id : number,
    joinDate : string
}

export type MessageType = {
    senderBy : UserType,
    messageText : string
    files : FileType[],
    caption : string
    sentDate : string
    chatroomId : number,
    id : number
}

export type UserHistoryType = {
    lastMessage : MessageType | null
    roomType : string,
    chatroomId : number,
    groupName : string,
    userId? : number,
    userName? : string
    fullName? : string
    profileUrl? : string,
    activityDate? : string,
    unseenActivityCount : number,
    groupLogo? : string
    owner? : UserType,
    createdDate : string,
    members? : UserType[]
    
}
export type ChatRoomType = {
    id : number
    roomType : string
    members : UserType[],
    groupName : string
    unseenActivityCount : number,
    groupLogo? : string
    owner : UserType
    createdDate : string
}