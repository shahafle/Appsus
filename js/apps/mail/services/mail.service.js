import { utilService } from '../../../services/util.service.js';
import { storageService } from '../../../services/storage.service.js';

export const MailService = {
    query,

}

const STORAGE_KEY = 'mailDB'


_createMails()


const loggedInUser = {
    email: 'user@appsus.com',
    fullName: 'Mahatma Appsus'
}


function query() {
    const emails = _loadFromStorage()
    console.log('emails at Load quary:', emails);

    return Promise.resolve(emails)
}



function _createMails() {
    var emails = _loadFromStorage()
    if (!emails || !emails.length) {
        emails = [
            {
                id: utilService.makeId(),
                userName: 'Momo Cohen',
                from: 'momo@momo.com',
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
                from: 'momo@momo.com',
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
                from: 'momo@momo.com',
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
                from: 'momo@momo.com',
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
                from: 'momo@momo.com',
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