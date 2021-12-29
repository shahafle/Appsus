import { utilService } from '../../../services/util.service.js';
import { storageService } from '../../../services/storage.service.js';

export const MailService = {
    query,
    toggleEmailStarred,

}

const STORAGE_KEY = 'mailDB'

_createMails()

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

function toggleEmailStarred(emailId) {

    const emails = _loadFromStorage()
    const emailIdx = emails.findIndex(email => emailId === email.id)

    return getEmailById(emailId).then(email => {
        email.isStared = !email.isStared
        emails[emailIdx] = email
        _saveEmailsToStorage(emails)
        return email
    })
}


function _createMails() {
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
                isStared: false,
                isTrashed: false,
                labels: [],
                sentAt: 1551133930594,
            },
            {
                id: utilService.makeId(),
                from: { address: 'momo@momo.com', userName: 'Momo Cohen' },
                to: 'user@appsus.com',
                subject: 'Miss you!',
                body: 'Would love to catch up sometimes',
                isRead: false,
                isStared: false,
                isTrashed: false,
                labels: [],
                sentAt: 1551133930594,
            },
            {
                id: utilService.makeId(),
                from: { address: 'momo@momo.com', userName: 'Momo Shapira' },
                to: 'user@appsus.com',
                subject: 'Miss you!',
                body: 'Would love to catch up sometimes',
                isRead: false,
                isStared: false,
                isTrashed: false,
                labels: [],
                sentAt: 1551133930594,
            },
            {
                id: utilService.makeId(),
                from: { address: 'momo@momo.com', userName: 'Momo Yehezkel' },
                to: 'user@appsus.com',
                subject: 'Miss you!',
                body: 'Would love to catch up sometimes',
                isRead: false,
                isStared: false,
                isTrashed: false,
                labels: [],
                sentAt: 1551133930594,
            },
            {
                id: utilService.makeId(),
                from: { address: 'momo@momo.com', userName: 'Momo Dai' },
                to: 'user@appsus.com',
                subject: 'Miss you!',
                body: 'Would love to catch up sometimes',
                isRead: false,
                isStared: false,
                isTrashed: false,
                labels: [],
                sentAt: 1551133930594,
            },
            {
                id: utilService.makeId(),
                from: { address: 'momo@momo.com', userName: 'Momo Kaplan' },
                to: 'user@appsus.com',
                subject: 'Miss you!',
                body: 'Would love to catch up sometimes',
                isRead: false,
                isStared: false,
                isTrashed: false,
                labels: [],
                sentAt: 1551133930594,
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