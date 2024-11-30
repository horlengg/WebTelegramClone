import { chatroomType, ChatRoomType, FileType, MessageType, UserHistoryType, UserType } from "@/types"
import { HttpResponse } from "@/types/http"
import http from "axios"

class AppService {
    currentUserId:number;
    userList :UserType[]  = []
    fileList :FileType[]  = []
    constructor(currentUserId:number){
        this.currentUserId = currentUserId
    }
    // file
    async getFiles(){
        if(this.fileList.length) return this.fileList
        try {
            const response = await http.get<HttpResponse<FileType[]>>("/db/files.json")
            if(response.status === 200){
                this.fileList = response.data.data
                return this.fileList
            }
        }catch (e) {
            console.log({e});
            return []
        }
    }
    async getFile(fileId:number){
        const files = await this.getFiles()
        return files?.find(f => f.id === fileId)
    }
    // user
    async getUsers(){
        if(this.userList.length) return this.userList
        try {
            const response = await http.get<HttpResponse<UserType[]>>("/db/users.json")
            if(response.status === 200){
                this.userList = response.data.data
                return this.userList
            }
        }catch (e) {
            console.log({e});
            return []
        }
    }
    async getUser(userId:number){
        const users = await this.getUsers()
        return users?.find(u => u.id === userId)
    }
    async getChatrooms() {
        try {
            const response = await http.get<HttpResponse<Array<any>>>("/db/chatroom.json");
            
            if (response.status === 200 && response.data && Array.isArray(response.data.data)) {
                const currentChatRoomList = response.data.data.filter(e => e.members.includes(this.currentUserId) );
    
                // Use for...of to handle async operations correctly
                for (const chatRoom of currentChatRoomList) {
                    const owner = await this.getUser(chatRoom.owner)
                    // Use Promise.all to wait for all async operations
                    const memberPromises = chatRoom.members.map(async (memberId: number) => {
                        const member = await this.getUser(memberId);
                        if (!member) throw new Error(`chatroom id = ${memberId} not found`);
                        return member;
                    });
                    chatRoom.owner = owner;
                    chatRoom.members = await Promise.all(memberPromises);
                }
    
                return currentChatRoomList as ChatRoomType[];
            }
        } catch (e) {
            console.log({ e });
            return [];
        }
    }
    
    async getChatroom(chatroomId:number){
        const chatroomList = await this.getChatrooms()
        return chatroomList?.filter(chatroom => chatroom.id === chatroomId)
    }

    // message
    async getMessages(chatroomId:number){
        try {
            const response = await http.get<HttpResponse<Array<any>>>("/db/messages.json")
            if(response.status === 200){
                const data =  response.data.data.filter(msg => msg.chatroomId === chatroomId)
                for(const item of data) {
                    const senderBy = await this.getUser(item.sentById) 
                    if(!senderBy) throw new Error("senderBy is None!.")
                    const files:FileType[] = []
                    for(const fileId of item.filesId){
                        const file = await this.getFile(fileId)
                        if(!file) throw new Error(`file id = ${fileId} not found`)
                        files.push(file)
                    }
                    item.files = files
                    item.senderBy = senderBy
                }
                return data
            }
        }catch (e) {
            console.log({e});
            return []
        }
    }
    getLatestMessage(messages:MessageType[]){
        return messages.reduce((pre, curr) => {
            return pre.sentDate > curr.sentDate ? pre : curr;
          }, messages[0] || null);
    }
    async getUserHistories() {
        try {
            const listUserHistory: UserHistoryType[] = [];
            const chatrooms = await this.getChatrooms();
            
            // Use for...of loop to handle async operations properly
            if (chatrooms) {
                for (const chat of chatrooms) {
                    const messages = await this.getMessages(chat.id) ?? [];
                    const latesMessage = this.getLatestMessage(messages)
                    let user;
                    if(latesMessage && chat.roomType === chatroomType.GROUP){
                        user = chat.members.find(m => m.id === latesMessage.senderBy.id)
                    }else if( chat.roomType !== chatroomType.GROUP) {
                        user = chat.members.find(m => m.id !== this.currentUserId)
                    }
                    listUserHistory.push({
                        lastMessage: latesMessage,
                        roomType: chat.roomType,
                        chatroomId: chat.id,
                        groupName : chat.groupName,
                        fullName : user?.fullName,
                        userId : user?.id,
                        username : user?.username,
                        profileUrl : user?.profileUrl,
                        activityDate : latesMessage?.sentDate ?? user?.joinDate ?? chat.createdDate,
                        unseenActivityCount:chat.unseenActivityCount,
                        groupLogo : chat.groupLogo,
                        owner : chat.owner,
                        createdDate : chat.createdDate,
                        members : chat.members
                    });
                }
            }
            
            return listUserHistory;
        } catch (e) {
            console.log({ e });
            return [];
        }
    }
    
}

export default AppService