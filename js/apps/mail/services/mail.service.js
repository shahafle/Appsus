import { utilService } from '../../../services/util.service.js';
import { storageService } from '../../../services/storage.service.js';

export const EmailService = {
    query,
    toggleEmailAttributes,
    getEmailById,
    getUnreadCount,
    sendEmail,
    getLoggedInUser,
    sortEmails,

}

const STORAGE_KEY = 'mailDB'

_createEmails()

const loggedInUser = {
    address: 'user@Trinity.com',
    fullName: 'Trinity'
}

function query(filterBy) {
    const emails = _loadFromStorage()
    const filteredEmails = _getFilteredEmails(emails, filterBy)
    return Promise.resolve(filteredEmails)

}

function getLoggedInUser() {
    return Promise.resolve(loggedInUser)
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
        if (!email.isTrashed && !email.isRead && email.to === loggedInUser.address) unreadCount++
    })
    return Promise.resolve(unreadCount)
}

function sendEmail(newEmail) {
    const emails = _loadFromStorage()
    const email = _createEmail(newEmail)
    emails.push(email)
    _saveEmailsToStorage(emails)
    return Promise.resolve()
}


function _getFilteredEmails(emails, filterBy) {

    let { type, searchLine } = filterBy

    searchLine = searchLine.toLowerCase()
    return emails.filter(email => {
        switch (type) {
            case 'inbox':
                return (!email.isTrashed && email.to === loggedInUser.address && (isSearchLineMatch(email, searchLine)))

            case 'starred':
                return (!email.isTrashed && email.to === loggedInUser.address && email.isStarred && (isSearchLineMatch(email, searchLine)))

            case 'sent':
                return (!email.isTrashed && email.to !== loggedInUser.address && (isSearchLineMatch(email, searchLine)))

            case 'trash':

                return (email.isTrashed && (isSearchLineMatch(email, searchLine)))

            case 'draft':
                return (!email.isTrashed && email.isDraft && (isSearchLineMatch(email, searchLine)))
            // default:
            //     return true
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

function sortEmails(sortBy, emails) {

    if (sortBy === 'from') emails.sort((e1, e2) => e1.from.userName.localeCompare(e2.from.userName));
    if (sortBy === 'subject') emails.sort((e1, e2) => e1.subject.localeCompare(e2.subject));
    if (sortBy === 'date') emails.sort((e1, e2) => e1.sendAt - e2.sendAt)

    return Promise.resolve(emails)
}



function toggleEmailAttributes(emailId, attribute) {
    const emails = _loadFromStorage()
    const emailIdx = emails.findIndex(email => emailId === email.id)
    const email = emails[emailIdx]
    switch (attribute) {
        case 'star':
            email.isStarred = !email.isStarred
            break;
        case 'read':
            email.isRead = !email.isRead
            break;
        case 'restore':
            email.isTrashed = !email.isTrashed
            break;
        case 'trash':
            email.isTrashed = !email.isTrashed
            break;
        case 'delete':
            if (email.isTrashed) emails.splice(emailIdx, 1)
            break;
    }
    _saveEmailsToStorage(emails)
    return Promise.resolve(email)
}

function _createEmail({ to, subject, body }) {
    const email = {
        id: utilService.makeId(),
        from: { address: loggedInUser.address, userName: loggedInUser.fullName },
        to,
        subject,
        body,
        isRead: false,
        isStarred: false,
        isTrashed: false,
        isDraft: false,
        labels: [],
        sentAt: Date.now(),
        removedAt: null
    }
    return email
}

function _createEmails() {
    var emails = _loadFromStorage()
    if (!emails || !emails.length) {
        emails = [
            {
                id: utilService.makeId(),
                from: { address: 'momoCo@momo.com', userName: 'Momo Cohen' },
                to: 'user@Trinity.com',
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
                from: { address: 'momoAy@momo.com', userName: 'Momo Ayal' },
                to: 'user@Trinity.com',
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
                from: { address: 'momShao@momo.com', userName: 'Momo Shapira' },
                to: 'user@Trinity.com',
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
                from: { address: 'momoYe@momo.com', userName: 'Momo Yehezkel' },
                to: 'user@Trinity.com',
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
                from: { address: 'momoDa@momo.com', userName: 'Momo Dai' },
                to: 'user@Trinity.com',
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
                from: { address: 'momoKa@momo.com', userName: 'Momo Kaplan' },
                to: 'user@Trinity.com',
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
                from: { address: 'semi@fireman.com', userName: 'Trinity' },
                to: 'semi@fireman.com',
                subject: 'Miss you!',
                body: ' understand the personal data we collect and to give you greater control over your personal data. This is part of our ongoing commitment to be transparent about how we use your data and keep it safe. The new updates will take effect on December 23, 2021, and no further action is required by yo',
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
                from: { address: 'carla@walla.com', userName: 'Trinity' },
                to: 'carla@walla.com',
                subject: 'i truly miss you baby!',
                body: 'Would love to catch up sometimes',
                isRead: false,
                isStarred: false,
                isTrashed: false,
                isDraft: false,
                labels: [],
                sentAt: 1551448930594,
                removedAt: null
            },
            {
                id: utilService.makeId(),
                from: { address: 'Shimon@gmail.com', userName: 'Trinity' },
                to: 'Shimon@gmail.com',
                subject: 'Gotta Catch Them All!',
                body: 'Would love to catch up sometimes',
                isRead: false,
                isStarred: false,
                isTrashed: false,
                isDraft: false,
                labels: [],
                sentAt: 1551426930594,
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