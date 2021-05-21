let db = {
    users: [
        {
            userId: "3454dff234234t55345453",
            email: "user@gmail.com",
            handle: "user",
            createdAt: "2021-05-19T02:59:17.968Z",
            imageUrl: "image/345234s32423",
            bio: "Hello, my name is user, nice to meet you",
            website: "http://user.com",
            location: "London, UK",
        },
    ],
    screams: [
        {
            userHandle: "user",
            body: "this is the scream body",
            createdAt: "2021-05-19T02:59:17.968Z",
            likeCount: 5,
            commentCount: 10,
        },
    ],
    comments: [
        {
            userHandle: "user",
            screamId: "3454dff234234t55345453",
            body: "this is the comment body",
            createdAt: "2021-05-19T02:59:17.968Z",
        },
    ],
};

const userDetails = {
    // Redux data
    credentials: {
        userId: "3454dff234234t55345453",
        email: "user@email.com",
        handle: "user",
        createdAt: "2019-03-15T10:59:52.798Z",
        imageUrl: "image/345234s32423",
        bio: "Hello, my name is user, nice to meet you",
        website: "https://user.com",
        location: "London, UK",
    },
    likes: [
        {
            userHandle: "user",
            screamId: "hh7O5oWfWucVzGbHH2pa",
        },
        {
            userHandle: "user",
            screamId: "3454dff234234t55345453234",
        },
    ],
    notifications: [
        {
            recipient: "user",
            sender: "sender name",
            read: "true | false",
            screamId: "3454dff234234t55345453234",
            type: "like | comment",
            createdAt: "2019-03-15T10:59:52.798Z",
        },
    ],
};
