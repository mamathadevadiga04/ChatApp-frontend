
export const samplechats=[{
    avatar:["https://www.w3schools.com/howto/img_avatar2.png"],
    name:"jhon",
    _id:"1",
    groupChat:false,
    members:["1","2"]
},
{
    avatar:["https://www.w3schools.com/howto/img_avatar2.png"],
    name:"jhon BOI",
    _id:"2",
    groupChat:false,
    members:["1","2"]
}

];

export const sampleUsers=[
    {
         avatar:["https://www.w3schools.com/howto/img_avatar2.png"],
    name:"jhon BOI",
    _id:"1",
    },
    {
        avatar:["https://www.w3schools.com/howto/img_avatar2.png"],
    name:"jhon BOI",
    _id:"2",  
    }
]

export const sampleNotifications=[
    {
        sender:{
avatar:["https://www.w3schools.com/howto/img_avatar2.png"],
    name:"jhon BOI",
        },
         
    _id:"1hy",
    },
    {
        sender:{
avatar:["https://www.w3schools.com/howto/img_avatar2.png"],
    name:"jhon ",
        },
         
    _id:"2",
    },  
    
]
export const sampleMessage=[
    {
attachments:[
    {
        public_id:"asd",
        url:"https://www.w3schools.com/howto/img_avatar2.png",
    },

],
content:"oh hi there",
_id:"bhuhegbde",
sender:{
    _id:"jjjjuj",
    name:"charmin",
},
chat:"chatId",

createdAt:'2025-06-05T00:00:00.000Z',
},
 {
attachments:[
    {
        public_id:"asd6",
        url:"https://www.w3schools.com/howto/img_avatar2.png",
    },

],
content:"hello how r u?",
_id:"bhuhegbdeuu",
sender:{
    _id:"1gg",
    name:"charmin2",
},
chat:"chatId",
createdAt:'2025-06-09T00:00:00.000Z',
}
];

export const dashboardData={
    users:[
        {
name:"Jhon Doe",
avatar:"https://www.w3schools.com/howto/img_avatar2.png",
_id:"1",
username:"jhon_doe",
friends:20,
groups:5,
    },
    {
       name:"Jhon Doe",
avatar:"https://www.w3schools.com/howto/img_avatar2.png",
_id:"2",
username:"jhon_doe",
friends:20,
groups:25, 
    },

],

chats:[{
    name:"jhon Doe",
    avatar:["https://www.w3schools.com/howto/img_avatar2.png"],
    _id:"1",
    groupChat:false,
    members:[{_id:"1",avatar:"https://www.w3schools.com/howto/img_avatar2.png"},
        {_id:"2",avatar:"https://www.w3schools.com/howto/img_avatar2.png"},],

    totalMembers:2,
    totalMessages:20,
    creator:{
        name:"jhonb",
        avatar:["https://www.w3schools.com/howto/img_avatar2.png"],
    }
},
{
    name:"jhon Doe",
    avatar:["https://www.w3schools.com/howto/img_avatar2.png"],
    _id:"2",
    groupChat:true,
    totalMembers:2,
    totalMessages:20,
    members:[{_id:"1",avatar:"https://www.w3schools.com/howto/img_avatar2.png"},
        {_id:"2",avatar:"https://www.w3schools.com/howto/img_avatar2.png"},],

    creator:{
        name:"jhonb",
        avatar:"https://www.w3schools.com/howto/img_avatar2.png"
    }
}
],
messages:[
    {
     attachments:[ {
        public_id:"asd",
        url:"https://www.w3schools.com/howto/img_avatar2.png",
    },],
content:"oh hi there",
_id:"bhuhegbe",
sender:{
    avatar:"https://www.w3schools.com/howto/img_avatar2.png",
    name:"charmin",
},
chat:"chatId",
groupChat:true,
createdAt:'2025-06-09T00:00:00.000Z',
    },
   {
     attachments:[ {
        public_id:"asd",
        url:"https://www.w3schools.com/howto/img_avatar2.png",
    },],
content:"oh hi there",
_id:"bhuhegbde",
sender:{
    avatar:"https://www.w3schools.com/howto/img_avatar2.png",
    name:"charmin",
},
chat:"chatId",
groupChat:false,
createdAt:'2025-06-09T00:00:00.000Z',
    },
]

}

