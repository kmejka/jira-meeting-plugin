export function saveIssueMeetingData(startDate, hangoutLink) {
    return new Promise((resolve, reject) => AP.require(['request'], request => {
        const data = {
            fields: {
                'com.spartez.jira-meeting__meeting-date-field': startDate,
                'com.spartez.jira-meeting__meeting-hangout-link': `<a href='${hangoutLink}' target='_blank'>Go to hangout</a>`
            }
        };
        request({
            url: '/rest/api/2/issue/' + getIssueId(),
            type: 'PUT',
            contentType: 'application/json',
            data: JSON.stringify(data),

            success: function(response) {
                return resolve(response);
            },
            error: function (response) {
                console.error(`Error loading API (${url})`, response);
                reject(response);
            }
        });
    }));
}

export function getIssue() {
    return new Promise((resolve, reject) => AP.require(['request'], function (request) {
        request({
            url: '/rest/api/2/issue/' + getIssueId(),
            contentType: 'application/json',
            type: 'GET',

            success: function (response) {
                response = JSON.parse(response);
                return resolve(response);
            },
            error: function (response) {
                console.error(`Error loading API (${url})`, response);
                reject(response);
            }
        });
    }));
}

export function getIssueWatchers() {
    return new Promise((resolve, reject) => AP.require(['request'], function (request) {
        const url = '/rest/api/2/issue/' + getIssueId() + '/watchers';
        request({
            url,
            contentType: 'application/json',
            type: 'GET',
            success: function (response) {
                response = JSON.parse(response);
                return resolve(response);
            },
            error: function (response) {
                console.error(`Error loading API (${url})`, response);
                reject(response);
            }
        });
    }));
}

function getIssueId() {
    return getUrlParameterByName('issueKey');
}

function getJiraServerHostname() {
    return getUrlParameterByName('xdm_e');
}

function getJiraBaseUrl() {
    return getUrlParameterByName('xdm_e') + getUrlParameterByName('cp');
}

function getUrlParameterByName(name) {
    const regexp = RegExp(`[?&]${name}=([^&]*)`);
    const urlMatch = regexp.exec(window.location.search);
    return urlMatch && decodeURIComponent(urlMatch[1].replace(/\+/g, ' '));
}
