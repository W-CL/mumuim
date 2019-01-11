
/**
 * 创建一个房间
 * id  int 接受者id
 * uid  int 发送人的id
 * roomType  int  房间类型，1两人之间的聊天，2群聊
 * roomName string  房间名 nickname 接收者的昵称
 * createTime string  创建时间
 * @param db
 */
function newTalkingRoom(db) {
      db.executeSql({
          name: "mylocaldb",
          sql: 'CREATE TABLE IF NOT EXISTS talkingRoom(id INTEGER,uid INTEGER,roomType INTEGER,createTime INTEGER, roomName varchar(255),photo varchar(255))'
      }, function(ret, err) {
          if (ret.status) {
              console.log("ret:"+JSON.stringify(ret))
          } else {
              console.log("createerr"+JSON.stringify(err))
          }
      });


}

/**
 * 添加一条信息
 * @param db
 * @param data
 */
function insertTalkingRoom(db,data) {
    newTalkingRoom(db)
    db.executeSql({
        name: 'mylocaldb',
        sql: 'INSERT INTO talkingRoom(id,uid,roomType,createTime,roomName,photo)  VALUES ( '+data.id+ ' ,'+data.uid+ ' ,'+data.roomType+', '+ data.createTime +', "'+data.roomName+'" , "'+data.photo+'")'
    }, function(ret, err){
        if( ret.status ){
            console.log('添加成功');
        }else{
            console.log("inserterr" + JSON.stringify( err ) );
        }
    });
}

/**
 * 根据id 查询一条信息
 * @param db
 * @param id
 */
function findTalkingRoomByid(db,id) {
    db.selectSql({
        name: 'mylocaldb',
        sql: 'SELECT * FROM talkingRoom where id='+id
    }, function(ret, err){
        if( ret.status ){
           return ret.data
        }else {
            console.log("selecterr" + JSON.stringify( err ) );
        }
    });
}


/**
 * 根据uid 修改信息
 * @param db
 * @param data
 */

function updateTalkingRoomByid(db,data) {
    var where = '';
    if(data.nickname){
        where += ' roomName="'+data.roomName+'"'
    }
    where += ' where id='+data.id
        db.executeSql({
        name: 'mylocaldb',
        sql: 'UPDATE  talkingRoom SET  '+where
    }, function(ret, err){
        if( ret.status ){
            console.log('修改成功');
        }else{
            console.log("inserterr" + JSON.stringify( err ) );
        }
    });

}

/**
 * 获取所有的信息
 * @param db
 */
function getAllTalkingRoom(db) {
    newTalkingRoom(db)
    db.selectSql({
        name: 'mylocaldb',
        sql: 'SELECT * FROM talkingRoom'
    }, function(ret, err){
        if( ret.status ){
            console.log("selectall" + JSON.stringify( ret.data ) );
            return ret.data
        }else {
            console.log("selecterr" + JSON.stringify( err ) );
        }
    });
}

