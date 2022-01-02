import { utilService } from '../../../services/util.service.js';
import { storageService } from '../../../services/storage.service.js';

export const EmailService = {
    query,
    toggleEmailAttributes,
    getEmailById,
    getUnreadCount,
    saveDraft,
    getLoggedInUser,
    sortEmails,
    sendEmail

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
        if (!email.isTrashed && !email.isRead && email.to.address === loggedInUser.address) unreadCount++

    })
    return Promise.resolve(unreadCount)
}

function saveDraft(newDraft) {
    const emails = _loadFromStorage()
    if (!newDraft.id) {
        newDraft = _createDraft(newDraft)
        emails.unshift(newDraft)

    } else {
        const oldDraftIdx = emails.findIndex(email => newDraft.id === email.id)
        emails[oldDraftIdx] = newDraft
    }

    _saveEmailsToStorage(emails)
    return Promise.resolve(newDraft)
}


function sendEmail(draftId) {
    const emails = _loadFromStorage()
    const draftIdx = emails.findIndex(email => draftId === email.id)
    emails[draftIdx].isDraft = false
    _saveEmailsToStorage(emails)
}

function _getFilteredEmails(emails, filterBy) {

    let { type, searchLine } = filterBy
    if (type) {

        return emails.filter(email => {
            switch (type) {
                case 'inbox':
                    return (!email.isTrashed && !email.isDraft && email.to.address === loggedInUser.address && (isSearchLineMatch(email, searchLine)))

                case 'starred':
                    return (!email.isTrashed && !email.isDraft && email.to.address === loggedInUser.address && email.isStarred && (isSearchLineMatch(email, searchLine)))
                case 'read':
                    return (!email.isTrashed && !email.isDraft && email.to.address === loggedInUser.address && email.isRead && (isSearchLineMatch(email, searchLine)))

                case 'unread':
                    return (!email.isTrashed && !email.isDraft && email.to.address === loggedInUser.address && !email.isRead && (isSearchLineMatch(email, searchLine)))

                case 'sent':
                    return (!email.isTrashed && !email.isDraft && email.to.address !== loggedInUser.address && (isSearchLineMatch(email, searchLine)))

                case 'trash':
                    return (email.isTrashed && (isSearchLineMatch(email, searchLine)))

                case 'draft':
                    return (!email.isTrashed && email.isDraft && (isSearchLineMatch(email, searchLine)))

                default:
                    return true
            }
        })
    } else {
        return emails.filter(email => isSearchLineMatch(email, searchLine))
    }
}


function isSearchLineMatch(email, searchLine) {
    return (email.from.address.toLowerCase().includes(searchLine) ||
        email.from.userName.toLowerCase().includes(searchLine) ||
        email.to.address.toLowerCase().includes(searchLine) ||
        email.subject.toLowerCase().includes(searchLine) ||
        email.body.toLowerCase().includes(searchLine)
    )
}

function sortEmails(sortBy, emails) {
    console.log('sortBy:', sortBy);


    if (sortBy === 'from') emails.sort((e1, e2) => e1.from.userName.localeCompare(e2.from.userName));
    if (sortBy === 'subject') emails.sort((e1, e2) => e1.subject.localeCompare(e2.subject));
    if (sortBy === 'date') emails.sort((e2, e1) => e1.sentAt - e2.sentAt)

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

function _createDraft({ address, subject, body }) {
    const to = getUserNameOnSend(address)
    const email = {
        id: utilService.makeId(),
        from: { address: loggedInUser.address, userName: loggedInUser.fullName },
        to,
        subject,
        body,
        isRead: false,
        isStarred: false,
        isTrashed: false,
        isDraft: true,
        labels: [],
        sentAt: Date.now(),
        removedAt: null
    }
    return email
}


function getUserNameOnSend(address) {
    const userName = address.split('@')
    const to = { address, userName: userName[0] }
    return to
}

function _createEmails() {
    var emails = _loadFromStorage()
    if (!emails || !emails.length) {
        emails = [

            {
                id: utilService.makeId(),
                from: { address: 'momoCo@momo.com', userName: 'Momo Cohen' },
                to: { address: 'user@Trinity.com', userName: 'Trinity' },
                subject: 'Get you lattest news at Sigma!',
                body: '📰 We at Sigma know what have all the information a bro needs to have!, join our news letter now! 📰',
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
                to: { address: 'user@Trinity.com', userName: 'Trinity' },
                subject: 'Facebook',
                body: 'Weve detected suspicious activity on your Facebook account and have temporarily locked it as a security precaution This just happened to me after I created an ad account.. Cannot figure out for the life of me how to rove  and regain access. They dont give me any options.. Clicking  on the email they sent me just brings me to the page stating that my account is locked, with a button, and no other options. Clicking that brings me to https://www.facebook.com/help/203305893040179 which is, as expected, no help. The brings me to a blank page with a heading. I dont know what to do?? Please help',
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
                from: { address: 'noreply@id.supercell.com', userName: 'Supercell' },
                to: { address: 'user@Trinity.com', userName: 'Trinity' },
                subject: 'Supercell',
                body: '879 026 - Use the verification code below to log in. Welcome back! Use the verification code below to log in. 879 026 You received this email because you reques',
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
                from: { address: 'inspiration@mp1.tripadvisor.com', userName: 'Tripadvisor' },
                to: { address: 'user@Trinity.com', userName: 'Trinity' },
                subject: 'Take a trip down 2021',
                body: `🌴🌴🌴 For questions or assistance, visit our Help Center.
                TripAdvisor LLC, 400 1st Ave., Needham, MA 02494, USA
                © 2021 TripAdvisor LLC. All rights reserved. Tripadvisor, the Tripadvisor logo, the owl logo, Travelers' Choice and the Travelers' Choice logo are trademarks of TripAdvisor LLC in the US and other countries.`,
                isRead: true,
                isStarred: false,
                isTrashed: false,
                isDraft: false,
                labels: [],
                sentAt: 1552533930594,
                removedAt: null
            },
            {
                id: utilService.makeId(),
                from: { address: 'no-reply@dropbox.com', userName: 'Dropbox' },
                to: { address: 'user@Trinity.com', userName: 'Trinity' },
                subject: '68 others made changes in your shared folders',
                body: `	Follow specific folders and get focused updates
                Follow folders to get more detailed insights, reported instantly or once per day. Choose a folder to `,
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
                from: { address: 'noreply@steampowered.com', userName: 'Steam' },
                to: { address: 'user@Trinity.com', userName: 'Trinity' },
                subject: `Tom Clancy's The Division™`,
                body: `After a deadly pandemic sweeps through New York, it's up to Agents to save what remains. 
                Complete missions, explore the Dark Zone, and fight back enemy factions alone or with 3 friends.
                 Experience a full endgame offering you new PvP and PvE modes.
                `,
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
                from: { address: 'support@wolt.com', userName: 'Wolt' },
                to: { address: 'user@Trinity.com', userName: 'Trinity' },
                subject: `Purchase receipt: Wok Republic | Florentine`,
                body: `Thank you for choosing Wolt! we hope to see you again Soon!`,
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
                from: { address: 'noreply@steampowered.com', userName: 'Steam' },
                to: { address: 'user@Trinity.com', userName: 'Trinity' },
                subject: `Tom Clancy's The Division™`,
                body: `After a deadly pandemic sweeps through New York, it's up to Agents to save what remains. 
                Complete missions, explore the Dark Zone, and fight back enemy factions alone or with 3 friends.
                 Experience a full endgame offering you new PvP and PvE modes.
                `,
                isRead: false,
                isStarred: true,
                isTrashed: false,
                isDraft: false,
                labels: [],
                sentAt: 1551423930594,
                removedAt: null
            },
            {
                id: utilService.makeId(),
                from: { address: 'purearts@support.com', userName: 'PureArt' },
                to: { address: 'user@Trinity.com', userName: 'Trinity' },
                subject: `ill Valentine Reporting For Duty TOMORROW`,
                body: `Check out our new Toys Collection
                `,
                isRead: true,
                isStarred: true,
                isTrashed: false,
                isDraft: false,
                labels: [],
                sentAt: 1551423930594,
                removedAt: null
            },
            {
                id: utilService.makeId(),
                from: { address: 'support@wolt.com', userName: 'Wolt' },
                to: { address: 'user@Trinity.com', userName: 'Trinity' },
                subject: `Purchase receipt: Wok Republic | Florentine`,
                body: `Thank you for choosing Wolt! we hope to see you again Soon!`,
                isRead: false,
                isStarred: true,
                isTrashed: false,
                isDraft: false,
                labels: [],
                sentAt: 1551423930594,
                removedAt: null
            },
            {
                id: utilService.makeId(),
                from: { address: 'support@wolt.com', userName: 'Wolt' },
                to: { address: 'user@Trinity.com', userName: 'Trinity' },
                subject: `Purchase receipt: Benz  | Florentine`,
                body: `Thank you for choosing Wolt! we hope to see you again Soon!`,
                isRead: false,
                isStarred: true,
                isTrashed: false,
                isDraft: false,
                labels: [],
                sentAt: 1551423930594,
                removedAt: null
            },
            {
                id: utilService.makeId(),
                from: { address: 'support@wolt.com', userName: 'Wolt' },
                to: { address: 'user@Trinity.com', userName: 'Trinity' },
                subject: `Purchase receipt: Benz  | Florentine`,
                body: `Thank you for choosing Wolt! we hope to see you again Soon!`,
                isRead: false,
                isStarred: true,
                isTrashed: true,
                isDraft: false,
                labels: [],
                sentAt: 1551423930594,
                removedAt: null
            },
            {
                id: utilService.makeId(),
                from: { address: 'support@wolt.com', userName: 'Wolt' },
                to: { address: 'user@Trinity.com', userName: 'Trinity' },
                subject: `Purchase receipt: Benz  | Florentine`,
                body: `Thank you for choosing Wolt! we hope to see you again Soon!`,
                isRead: false,
                isStarred: true,
                isTrashed: true,
                isDraft: false,
                labels: [],
                sentAt: 1551423930594,
                removedAt: null
            },
            {
                id: utilService.makeId(),
                from: { address: 'support@wolt.com', userName: 'Wolt' },
                to: { address: 'user@Trinity.com', userName: 'Trinity' },
                subject: `Purchase receipt: Benz  | Florentine`,
                body: `Thank you for choosing Wolt! we hope to see you again Soon!`,
                isRead: false,
                isStarred: true,
                isTrashed: false,
                isDraft: false,
                labels: [],
                sentAt: 1551423930594,
                removedAt: null
            },
            {
                id: utilService.makeId(),
                from: { address: 'support@wolt.com', userName: 'Wolt' },
                to: { address: 'user@Trinity.com', userName: 'Trinity' },
                subject: `Purchase receipt: Benz  | Florentine`,
                body: `Thank you for choosing Wolt! we hope to see you again Soon!`,
                isRead: false,
                isStarred: true,
                isTrashed: false,
                isDraft: false,
                labels: [],
                sentAt: 1551423930594,
                removedAt: null
            },
            {
                id: utilService.makeId(),
                from: { address: 'hello@splitwise.com', userName: 'Split' },
                to: { address: 'user@Trinity.com', userName: 'Trinity' },
                subject: `Time to split!`,
                body: `		
                Total balance	
                you owe ₪515.76
                    Matan Bazyler	
                you owe ₪927.42
                    Baziler 💩	
                owes you ₪443.66
                    Shimi 🐢	
                you owe ₪32.00
                See all friends »
                
                
                Largest expenses
                Nov.
                25
                חשמל ספטמבר אוקטובר
                you borrowed ₪364.00
                Nov.
                29
                ארולת טורטיןת
                you borrowed ₪57.50
                Nov.
                16
                סביח וליפסטיק
                you borrowed ₪40.00
                Nov.
                7
                סבון כביסה
                you lent ₪24.00.
                `,
                isRead: true,
                isStarred: true,
                isTrashed: false,
                isDraft: false,
                labels: [],
                sentAt: 1551423930594,
                removedAt: null
            },
            {
                id: utilService.makeId(),
                from: { address: 'noreply@steampowered.com', userName: 'Steam' },
                to: { address: 'user@Trinity.com', userName: 'Trinity' },
                subject: `Tom Clancy's The Division™`,
                body: `After a deadly pandemic sweeps through New York, it's up to Agents to save what remains. 
                Complete missions, explore the Dark Zone, and fight back enemy factions alone or with 3 friends.
                 Experience a full endgame offering you new PvP and PvE modes.
                `,
                isRead: true,
                isStarred: true,
                isTrashed: false,
                isDraft: false,
                labels: [],
                sentAt: 1551423930594,
                removedAt: null
            },
            {
                id: utilService.makeId(),
                from: { address: 'nfo@wolt.com', userName: 'Wolt' },
                to: { address: 'user@Trinity.com', userName: 'Trinity' },
                subject: `Purchase receipt: Taqueria`,
                body: `After a deadly pandemic sweeps through New York, it's up to Agents to save what remains. 
                Complete missions, explore the Dark Zone, and fight back enemy factions alone or with 3 friends.
                 Experience a full endgame offering you new PvP and PvE modes.
                `,
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
                from: { address: 'subscriptions@email.latimes.com', userName: 'Los Angeles Times' },
                to: { address: 'user@Trinity.com', userName: 'Trinity' },
                subject: ` Los Angeles Times `,
                body: `
                Subscribe today and get 6 months for just $1.
                Dot miss a beatiscover the best activities, restaurants
                and events in L.A., in-depth reporting and breaking news
                from a West Coast perspectiv
                `,
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
                from: { address: 'kwas@noreply.com', userName: 'KAWS' },
                to: { address: 'user@Trinity.com', userName: 'Trinity' },
                subject: `Amazing new toy collection for sale`,
                body: `   Check it out now!             `,
                isRead: true,
                isStarred: false,
                isTrashed: false,
                isDraft: false,
                labels: [],
                sentAt: 1551423930594,
                removedAt: null
            },
            {
                id: utilService.makeId(),
                from: { address: 'noreply@steampowered.com', userName: 'Steam' },
                to: { address: 'user@Trinity.com', userName: 'Trinity' },
                subject: `Tom Clancy's The Division™`,
                body: `After a deadly pandemic sweeps through New York, it's up to Agents to save what remains. 
                Complete missions, explore the Dark Zone, and fight back enemy factions alone or with 3 friends.
                 Experience a full endgame offering you new PvP and PvE modes.
                `,
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
                from: { address: 'user@Trinity.com', userName: 'Trinity' },
                to: { address: 'semi@fireman.com', userName: 'Semi' },
                subject: 'Purchase receipt: Alenbi Smashburger 15.12.2021',
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
                from: { address: 'user@Trinity.com', userName: 'Trinity' },
                to: { address: 'carla@walla.com', userName: 'Carla' },
                subject: 'i truly miss you baby!',
                body: 'Would love to catch up sometimes',
                isRead: false,
                isStarred: true,
                isTrashed: false,
                isDraft: false,
                labels: [],
                sentAt: 1551448930594,
                removedAt: null
            },
            {
                id: utilService.makeId(),
                from: { address: 'user@Trinity.com', userName: 'Trinity' },
                to: { address: 'Shimon@gmail.com', userName: 'Shimon' },
                subject: 'Gotta Catch Them All!',
                body: 'Would love to catch up sometimes',
                isRead: false,
                isStarred: false,
                isTrashed: false,
                isDraft: false,
                labels: [],
                sentAt: 1551426930594,
                removedAt: null
            },
            {
                id: utilService.makeId(),
                from: { address: 'user@Trinity.com', userName: 'Trinity' },
                to: { address: 'info@playsometoys.com', userName: 'Phillipe lee' },
                subject: 'iBoy from Kickstarter ready to ship. But only surface mail is availabl',
                body: ` am about to send out the toy. But I notice that there is only surface mail available between Hong Kong and Israel. I am not sure if the surface mail has tracking. Do you want to wait? Or should we just use surface mail, which probably takes quite a while and without tracking?
                Please let me know. Also please give me your address. And telephone number if possible. Thank you again for your support.
                Regards.`,
                isRead: false,
                isStarred: true,
                isTrashed: false,
                isDraft: false,
                labels: [],
                sentAt: 1551426930594,
                removedAt: null
            },
            {
                id: utilService.makeId(),
                from: { address: 'user@Trinity.com', userName: 'Trinity' },
                to: { address: 'purearts@ImDEAD.com', userName: 'arts' },
                subject: ' Order ID: #17839',
                body: `hey guys i just got the "kub" and its amazing, and i wanted to thank you for the ultra fast shipping!
                ill be sure to leave a review on our facebook page and recommend you guys
                
                but unfortunately i got the Kub box banged up(im adding a photo for you to see). i like to keep all boxes in Prime condition so this really bummed me out...
                also the Kub figure itself got some marks on it, and fasing on the left arm`,
                isRead: false,
                isStarred: false,
                isTrashed: false,
                isDraft: false,
                labels: [],
                sentAt: 1551426930594,
                removedAt: null
            },
            {
                id: utilService.makeId(),
                from: { address: 'user@Trinity.com', userName: 'Trinity' },
                to: { address: 'customer.service@i-parcel.com', userName: 'Problem' },
                subject: 'Gotta Catch Them All!',
                body: 'Im adding a picture and also if you guys want to do it manuly then heres the missing info...',
                isRead: false,
                isStarred: false,
                isTrashed: false,
                isDraft: false,
                labels: [],
                sentAt: 1551426930594,
                removedAt: null
            },
            {
                id: utilService.makeId(),
                from: { address: 'user@Trinity.com', userName: 'Trinity' },
                to: { address: 'Shimon@gmail.com', userName: 'Shimon' },
                subject: 'Gotta Catch Them All!',
                body: 'Would love to catch up sometimes',
                isRead: false,
                isStarred: false,
                isTrashed: false,
                isDraft: false,
                labels: [],
                sentAt: 1551426930594,
                removedAt: null
            },
            {
                id: utilService.makeId(),
                from: { address: 'user@Trinity.com', userName: 'Trinity' },
                to: { address: 'Shimon@gmail.com', userName: 'Shimon' },
                subject: 'Gotta Catch Them All!',
                body: 'Would love to catch up sometimes',
                isRead: false,
                isStarred: false,
                isTrashed: false,
                isDraft: false,
                labels: [],
                sentAt: 1551426930594,
                removedAt: null
            },
            {
                id: utilService.makeId(),
                from: { address: 'user@Trinity.com', userName: 'Trinity' },
                to: { address: 'Shimon@gmail.com', userName: 'Shimon' },
                subject: 'Gotta Catch Them All!',
                body: 'Would love to catch up sometimes',
                isRead: false,
                isStarred: false,
                isTrashed: false,
                isDraft: false,
                labels: [],
                sentAt: 1551426930594,
                removedAt: null
            },
            {
                id: utilService.makeId(),
                from: { address: 'user@Trinity.com', userName: 'Trinity' },
                to: { address: 'Shimon@gmail.com', userName: 'Shimon' },
                subject: 'Gotta Catch Them All!',
                body: 'Would love to catch up sometimes',
                isRead: false,
                isStarred: false,
                isTrashed: false,
                isDraft: false,
                labels: [],
                sentAt: 1551426930594,
                removedAt: null
            },
            {
                id: utilService.makeId(),
                from: { address: 'user@Trinity.com', userName: 'Trinity' },
                to: { address: 'Shimon@gmail.com', userName: 'Shimon' },
                subject: 'Gotta Catch Them All!',
                body: 'Would love to catch up sometimes',
                isRead: false,
                isStarred: false,
                isTrashed: false,
                isDraft: false,
                labels: [],
                sentAt: 1551426930594,
                removedAt: null
            },
            {
                id: utilService.makeId(),
                from: { address: 'user@Trinity.com', userName: 'Trinity' },
                to: { address: 'Shimon@gmail.com', userName: 'Shimon' },
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