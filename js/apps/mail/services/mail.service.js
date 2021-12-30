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

function query(filterBy) {
    console.log('filterBy at Quary:', filterBy);

    const emails = _loadFromStorage()
    const filteredEmails = _getFilteredEmails(emails, filterBy)
    return Promise.resolve(filteredEmails)

}

function getEmailById(emailId) {
    const emails = _loadFromStorage()
    var email = emails.find(email => {
        return emailId === email.id
    })
    return Promise.resolve(email)
}

function getUnreadCount() {
    const emails = _loadFromStorage()
    let unreadCount = 0
    emails.forEach(email => {
        if (!email.isTrashed && !email.isRead) unreadCount++
    })
    return unreadCount
}

function _getFilteredEmails(emails, filterBy) {
    console.log('filterBy:', filterBy);


    let { type, searchLine } = filterBy
    searchLine = searchLine.toLowerCase()
    return emails.filter(email => {
        switch (type) {
            case 'inbox':
                return (!email.isTrashed && email.to === loggedInUser.email && (isSearchLineMatch(email, searchLine)))
                
            case 'starred':
                return (!email.isTrashed && email.to === loggedInUser.email && email.isStarred && (isSearchLineMatch(email, searchLine)))
                
            case 'sent':
                return (!email.isTrashed && email.to !== loggedInUser.email && (isSearchLineMatch(email, searchLine)))
                
            case 'trash':
                return (email.isTrashed && (isSearchLineMatch(email, searchLine)))
                
            case 'draft':
                return (!email.isTrashed && email.isDraft && (isSearchLineMatch(email, searchLine)))
                
        }
    })

}

function isSearchLineMatch(email, searchLine) {
    return (email.from.address.toLowerCase().includes(searchLine) ||
        email.from.userName.toLowerCase().includes(searchLine) ||
        email.to.toLowerCase().includes(searchLine) ||
        email.subject.toLowerCase().includes(searchLine) ||
        email.body.toLowerCase().includes(searchLine)
    )
}


function toggleEmailAttributes(emailId, attribute) {
    const emails = _loadFromStorage()
    const emailIdx = emails.findIndex(email => emailId === email.id)
    const email = emails[emailIdx]
    console.log('attribute:', attribute);
    switch (attribute) {
        case 'star':
            email.isStarred = !email.isStarred
            break;
        case 'read':
            email.isRead = !email.isRead
            break;
        case 'trash':
            if (email.isTrashed) {

                emails.splice(emailIdx, 1)
            } else {
                email.isTrashed = !email.isTrashed
            }
            break;
    }
    _saveEmailsToStorage(emails)
    return Promise.resolve(email)
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
                isDraft: false,
                labels: [],
                sentAt: 1551133930594,
                removedAt: null
            },
            {
                id: utilService.makeId(),
                from: { address: 'momo@momo.com', userName: 'Momo Ayal' },
                to: 'user@appsus.com',
                subject: 'Miss you!',
                body: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit possimus quaerat eveniet accusamus ipsa ut exercitationem molestiae repellendus doloribus ipsum repellat vero error incidunt libero, atque explicabo praesentium eius corporis autem. Nobis, beatae aut dignissimos maxime vitae ipsam corporis labore eius culpa. Illum obcaecati, nam quis alias ad officiis blanditiis.',
                isRead: false,
                isStarred: false,
                isTrashed: false,
                isDraft: false,
                labels: [],
                sentAt: 1551133930594,
                removedAt: null
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
                isDraft: false,
                labels: [],
                sentAt: 1551137580594,
                removedAt: null
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
                isDraft: false,
                labels: [],
                sentAt: 1552533930594,
                removedAt: null
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
                isDraft: false,
                labels: [],
                sentAt: 1551132530594,
                removedAt: null
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
                isDraft: false,
                labels: [],
                sentAt: 1551423930594,
                removedAt: null
            },
            {
                id: utilService.makeId(),
                from: { address: 'momo@momo.com', userName: 'SENT' },
                to: 'user@apspsus.com',
                subject: 'Miss you!',
                body: 'Would love to catch up sometimes',
                isRead: false,
                isStarred: false,
                isTrashed: false,
                isDraft: false,
                labels: [],
                sentAt: 1551423930594,
                removedAt: null
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