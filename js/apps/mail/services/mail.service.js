import { utilService } from '../../../services/util.service.js';
import { storageService } from '../../../services/storage.service.js';

export const EmailService = {
    query,
    toggleEmailAttributes,
    getEmailById,
    getUnreadCount,
    

}

const STORAGE_KEY = 'mailDB'

_createEmails()

const loggedInUser = {
    email: 'user@appsus.com',
    fullName: 'Mahatma Appsus'
}

function query() {
    const emails = _loadFromStorage()
    return Promise.resolve(emails)
}

function getEmailById(emailId) {
    const emails = _loadFromStorage()
    var email = emails.find(email => {
        return emailId === email.id
    })
    return Promise.resolve(email)
}

function getUnreadCount(){
    const emails = _loadFromStorage()
    let unreadCount = 0
    emails.map(email =>{
    //    (email.isTrashed || !email.isRead )? unreadCount ++ :unreadCount--
       if(!email.isTrashed&&!email.isRead) unreadCount++
        console.log('unreadCount:', unreadCount);
        return unreadCount   
    })

}


function toggleEmailAttributes(emailId, attribute) {
    const emails = _loadFromStorage()
    const emailIdx = emails.findIndex(email => emailId === email.id)

    return getEmailById(emailId).then(email => {

        console.log('attribute:', attribute);
        switch (attribute) {
            case 'star':
                email.isStarred = !email.isStarred
                break;
            case 'read':
                email.isRead = !email.isRead
                break;
            case 'trash':
                // if(isDeleteItem){
            
                //     break;
                // }
                email.isTrashed = !email.isTrashed
                break;
        }
     
        
        emails[emailIdx] = email
        _saveEmailsToStorage(emails)
        return email
    })
}


function _createEmails() {
    var emails = _loadFromStorage()
    if (!emails || !emails.length) {
        emails = [
            {
                id: utilService.makeId(),
                from: { address: 'momo@momo.com', userName: 'Momo Cohen' },
                to: 'user@appsus.com',
                subject: 'Miss you!',
                body: 'Would love to catch up sometimes',
                isRead: false,
                isStarred: false,
                isTrashed: false,
                labels: [],
                sentAt: 1551133930594,
            },
            {   
                id: utilService.makeId(),
                from: { address: 'momo@momo.com', userName: 'Momo Cohen' },
                to: 'user@appsus.com',
                subject: 'Miss you!',
                body: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit possimus quaerat eveniet accusamus ipsa ut exercitationem molestiae repellendus doloribus ipsum repellat vero error incidunt libero, atque explicabo praesentium eius corporis autem. Nobis, beatae aut dignissimos maxime vitae ipsam corporis labore eius culpa. Illum obcaecati, nam quis alias ad officiis blanditiis.',
                isRead: false,
                isStarred: false,
                isTrashed: false,
                labels: [],
                sentAt: 1551133930594,
            },
            {
                id: utilService.makeId(),
                from: { address: 'momo@momo.com', userName: 'Momo Shapira' },
                to: 'user@appsus.com',
                subject: 'Miss you!',
                body: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. ipsum repellat vero error incidunt libero, atque explicabo praesentium eius corporis autem. Nobis, beatae aut dignissimos maxime vitae ipsam corporis labore eius culpa. Illum obcaecati, nam quis alias ad officiis blanditiis.',
                isRead: false,
                isStarred: false,
                isTrashed: false,
                labels: [],
                sentAt: 1551137580594,
            },
            {
                id: utilService.makeId(),
                from: { address: 'momo@momo.com', userName: 'Momo Yehezkel' },
                to: 'user@appsus.com',
                subject: 'Miss you!',
                body: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit possimus quaerat eveniet accusamus ipsa ut exercitationem molestiae repellendus doloribus ipsum repellat vero error incidunt libero, atque explicabo praesentium eius corporis autem. Nobis, beatae aut dignissimos maxime vitae ipsam corporis labore eius.',
                isRead: false,
                isStarred: false,
                isTrashed: false,
                labels: [],
                sentAt: 1552533930594,
            },
            {
                id: utilService.makeId(),
                from: { address: 'momo@momo.com', userName: 'Momo Dai' },
                to: 'user@appsus.com',
                subject: 'Miss you!',
                body: 'Would love to catch up sometimes',
                isRead: false,
                isStarred: false,
                isTrashed: false,
                labels: [],
                sentAt: 1551132530594,
            },
            {
                id: utilService.makeId(),
                from: { address: 'momo@momo.com', userName: 'Momo Kaplan' },
                to: 'user@appsus.com',
                subject: 'Miss you!',
                body: 'Would love to catch up sometimes',
                isRead: false,
                isStarred: false,
                isTrashed: false,
                labels: [],
                sentAt: 1551423930594,
            }


        ]
    }
    _saveEmailsToStorage(emails)
}





function _saveEmailsToStorage(emails) {
    storageService.saveToStorage(STORAGE_KEY, emails)
}

function _loadFromStorage() {
    return storageService.loadFromStorage(STORAGE_KEY)
}