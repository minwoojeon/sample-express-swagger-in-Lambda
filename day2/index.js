const express = require("express");
const app = express();
const PORT = 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true}));

app.get("/", (req, res) => (
    res.send("hello world.")
));

// mock data : users
const mockUsersDocument = [
    { no:1, id:'admin', name:'최고 관리자' },
    { no:2, id:'hyop0902', name:'테스터1' },
    { no:3, id:'bob9201', name:'운영자1' },
];
// generate mock user
for(let idx = 0; idx < 50; idx++){
    mockUsersDocument.push(
        { no:(idx+1), id:'test_user' + (idx+1), 
            name:'테스트 사용자' + (idx+1) }
    );
}
// mock query 
const findById = (userId) => {
    const user = mockUsersDocument.filter(data => data.id == userId);
    if(user.length < 0) {
        return null;
    }
    return user[0];
}
const findAllByNameContains = (name = '', pageNo = 1, pageSize = 10) => {
    const startNo = (pageNo - 1) * pageSize;
    const endNo = pageNo * pageSize;
    let users = mockUsersDocument;
    if(name != '') {
        users = users.filter(data => data.name.indexOf(name) > -1);
    }
    return users.slice(startNo, endNo);
}

// users 모든 데이터 목록을 조회합니다.
app.get("/users-all", (req, res) => {
    res.json({ok: true, users: mockUsersDocument});
});

// users 목록을 조회합니다.
app.get("/users", (req, res) => {
    const { pageNo, pageSize, name } = req.query;
    const users = findAllByNameContains(name, pageNo, pageSize);
    res.json({ok: true, users: users});
});

// users 단건을 조회합니다.
app.get("/users/:id", (req, res) => {
    const userId = req.params.id;
    const user = findById(userId);
    res.json({ok: true, user: user});
});




// mock query 
const addUser = (id, name) => {
    let maxNo = mockUsersDocument[mockUsersDocument.length - 1]?.no;
    if(!maxNo) {
        maxNo = 0;
    }
    mockUsersDocument[mockUsersDocument.length] = 
        { no:(maxNo+1), id:id, name:name };
};

// users 단건을 등록합니다.
app.post("/users", (req, res) => {
    const { id, name } = req.body;
    addUser(id, name);

    const user = findById(id);
    res.json({ok: true, user: user});
});


// mock query 
const findByUserKey = (no) => (
    mockUsersDocument
        .findIndex((el, idx, array) => (el.no == no))
);
const updateUser = (id, name) => {
    const user = findById(id);
    user.id = id;
    user.name = name;

    const targetIdx = findByUserKey(user.no);
    mockUsersDocument[targetIdx] = user;
};

// users 단건을 수정합니다.
app.put("/users/:id", (req, res) => {
    const userId = req.params.id;
    const { name } = req.body;
    updateUser(userId, name);
    
    const user = findById(userId);
    res.json({ok: true, user: user});
});


// mock query 
const removeUserById = (id) => {
    const user = findById(id);
    const targetIdx = findByUserKey(user.no);
    mockUsersDocument.splice(targetIdx, 1);
};

// users 단건을 삭제합니다.
app.delete("/users/:id", (req, res) => {
    const userId = req.params.id;
    removeUserById(userId);
    res.json({ok: true});
});


app.listen(PORT, () => ( console.log("test app") ));