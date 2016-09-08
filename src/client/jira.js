export function saveIssueMeetingData(startDate, hangoutLink) {
    return new Promise((resolve, reject) => AP.require(['request'], function(request) {
        const data = {
            fields: {
                "com.spartez.jira-meeting__meeting-date-field": startDate,
                "com.spartez.jira-meeting__meeting-hangout-link": "<a href='"+hangoutLink+"'>Go to hangout</a>"
            }
        };
        request({
            url: '/rest/api/2/issue/'+getIssueId(),
            type: "PUT",
            contentType: "application/json",
            data: JSON.stringify(data),

            success: function(response) {
                response = JSON.parse(response);
                return resolve(response);
            },
            error: function(response) {
                console.log("Error loading API (" + uri + ")");
                console.log(arguments);
            }
        });
    }));
}

export function getIssue() {
    return new Promise((resolve, reject) => AP.require(['request'], function(request) {
        request({
            url: '/rest/api/2/issue/'+getIssueId(),
            contentType: "application/json",
            type: "GET",

            success: function(response) {
                response = JSON.parse(response);
                return resolve(response);
            },
            error: function(response) {
                console.log("Error loading API (" + uri + ")");
                console.log(arguments);
            }
        });
    }));
}

export function getIssueWatchers() {
    return new Promise((resolve, reject) => AP.require(['request'], function(request) {
        request({
            url: '/rest/api/2/issue/'+getIssueId()+'/watchers',
            contentType: "application/json",
            type: "GET",

            success: function(response) {
                response = JSON.parse(response);
                return resolve(response);
            },
            error: function(response) {
                console.log("Error loading API (" + uri + ")");
                console.log(arguments);
            }
        });
    }));
}

function getIssueId() {
    return getUrlParameterByName("issueKey");
}

function getJiraServerHostname() {
    return getUrlParameterByName("xdm_e");
}

function getJiraBaseUrl() {
    return getUrlParameterByName("xdm_e") + getUrlParameterByName("cp");
}

function getUrlParameterByName(name) {
    var regexp = RegExp('[?&]' + name + '=([^&]*)');
    var iframeUrlMatch = regexp.exec(window.location.search);
    return iframeUrlMatch && decodeURIComponent(iframeUrlMatch[1].replace(/\+/g, ' '));
}
