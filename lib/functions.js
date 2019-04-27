export function getDate(date) {
    return new Date(date).toLocaleString('en-US', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    });
}

export function sortComments(comments) {
    return comments.sort((a, b) => {
        const firstDate = new Date(a.createdAt).getTime();
        const secondDate = new Date(b.createdAt).getTime();

        if (firstDate > secondDate) return -1;
        if (firstDate < secondDate) return 1;
        return 0;
    })
}

export function tagsToString(arr) {
    if (arr.length === 0) return '';
    return arr.join(', ');
}

export function stringToTags(str) {
    if (str.trim().length === 0) return undefined;
    const arr = str.split(',');
    return arr.map(item => item.trim());
}